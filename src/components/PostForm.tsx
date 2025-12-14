import type { FormEvent } from 'react'
import { useState } from 'react'

interface PostFormProps {
  onSubmit: (title: string, body: string) => void
}

function PostForm({ onSubmit }: PostFormProps) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const trimmedTitle = title.trim()
    const trimmedBody = body.trim()

    if (!trimmedTitle || !trimmedBody) return

    onSubmit(trimmedTitle, trimmedBody)
    setTitle('')
    setBody('')
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="card__header">
        <div>
          <p className="eyebrow">Create</p>
          <h2>Add a post</h2>
        </div>
        <button type="submit" className="primary">Add</button>
      </div>
      <div className="form-grid">
        <label className="form-field">
          <span>Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Short title"
          />
        </label>
        <label className="form-field">
          <span>Body</span>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="What is this about?"
            rows={3}
          />
        </label>
      </div>
    </form>
  )
}

export default PostForm
