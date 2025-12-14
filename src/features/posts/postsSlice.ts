import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { fetchPostsFromApi } from '../../services/postsApi'
import type { Post } from '../../types/post'

type PostsState = {
  items: Post[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  nextId: number
}

const initialState: PostsState = {
  items: [],
  status: 'idle',
  error: null,
  nextId: 1,
}

export const fetchPosts = createAsyncThunk<Post[]>(
  'posts/fetchPosts',
  async () => {
    const data = await fetchPostsFromApi(8)
    return data
  },
)

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (
      state,
      action: PayloadAction<{ title: string; body: string }>,
    ) => {
      const id = state.nextId
      state.items.unshift({
        id,
        title: action.payload.title,
        body: action.payload.body,
        userId: 1,
      })
      state.nextId += 1
    },
    updatePost: (
      state,
      action: PayloadAction<{ id: number; title: string; body: string }>,
    ) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, title: action.payload.title, body: action.payload.body }
          : item,
      )
    },
    deletePost: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
        const maxId = action.payload.reduce(
          (max, post) => Math.max(max, post.id),
          0,
        )
        state.nextId = maxId + 1
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Something went wrong'
      })
  },
})

export const { addPost, updatePost, deletePost } = postsSlice.actions

export default postsSlice.reducer
