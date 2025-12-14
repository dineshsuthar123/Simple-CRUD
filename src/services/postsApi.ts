import type { Post } from '../types/post'

export async function fetchPostsFromApi(limit = 8): Promise<Post[]> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`,
  )

  if (!response.ok) {
    throw new Error('Unable to fetch posts right now')
  }

  const data = (await response.json()) as Post[]
  return data
}
