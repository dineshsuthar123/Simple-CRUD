import { useEffect, useState } from 'react'
import PostForm from './components/PostForm'
import PostsTable, { type EditDraft } from './components/PostsTable'
import { useAppDispatch, useAppSelector } from './app/hooks'
import {
  addPost,
  deletePost,
  fetchPosts,
  updatePost,
} from './features/posts/postsSlice'
import type { Post } from './types/post'
import './App.css'

function App() {
  const dispatch = useAppDispatch()
  const { items, status, error } = useAppSelector((state) => state.posts)

  const [editingId, setEditingId] = useState<number | null>(null)
  const [editDraft, setEditDraft] = useState<EditDraft>({
    title: '',
    body: '',
  })

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts())
    }
  }, [dispatch, status])

  const handleAdd = (title: string, body: string) => {
    dispatch(addPost({ title, body }))
  }

  const handleEditStart = (post: Post) => {
    setEditingId(post.id)
    setEditDraft({ title: post.title, body: post.body })
  }

  const handleEditSave = () => {
    if (editingId === null) return
    const trimmedTitle = editDraft.title.trim()
    const trimmedBody = editDraft.body.trim()
    if (!trimmedTitle || !trimmedBody) return

    dispatch(
      updatePost({ id: editingId, title: trimmedTitle, body: trimmedBody }),
    )
    setEditingId(null)
    setEditDraft({ title: '', body: '' })
  }

  const handleEditCancel = () => {
    setEditingId(null)
    setEditDraft({ title: '', body: '' })
  }

  const handleDelete = (id: number) => {
    dispatch(deletePost(id))
    if (editingId === id) {
      handleEditCancel()
    }
  }

  const isLoading = status === 'loading'

  return (
    <div className="page">
      <header className="page__header">
        <div>
          <p className="eyebrow">JSONPlaceholder · Redux</p>
          <h1>CRUD dashboard</h1>
          <p className="muted">Create locally, fetch remotely, edit inline.</p>
        </div>
        {isLoading && <span className="pill">Loading…</span>}
        {status === 'failed' && error && (
          <span className="pill pill--error">{error}</span>
        )}
      </header>

      <main className="stack">
        <PostForm onSubmit={handleAdd} />

        <PostsTable
          posts={items}
          editingId={editingId}
          editDraft={editDraft}
          onEditStart={handleEditStart}
          onEditChange={(draft) => setEditDraft((prev) => ({ ...prev, ...draft }))}
          onEditSave={handleEditSave}
          onEditCancel={handleEditCancel}
          onDelete={handleDelete}
        />
      </main>
    </div>
  )
}

export default App
