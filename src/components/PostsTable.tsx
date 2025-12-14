import type { Post } from '../types/post'

export type EditDraft = {
  title: string
  body: string
}

interface PostsTableProps {
  posts: Post[]
  editingId: number | null
  editDraft: EditDraft
  onEditStart: (post: Post) => void
  onEditChange: (draft: Partial<EditDraft>) => void
  onEditSave: () => void
  onEditCancel: () => void
  onDelete: (id: number) => void
}

function PostsTable({
  posts,
  editingId,
  editDraft,
  onEditStart,
  onEditChange,
  onEditSave,
  onEditCancel,
  onDelete,
}: PostsTableProps) {
  const isEditing = (id: number) => editingId === id

  return (
    <div className="card">
      <div className="card__header">
        <div>
          <p className="eyebrow">Read / Update / Delete</p>
          <h2>Posts</h2>
        </div>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th style={{ width: '25%' }}>Title</th>
              <th style={{ width: '55%' }}>Body</th>
              <th style={{ width: '20%' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td data-label="Title">
                  {isEditing(post.id) ? (
                    <input
                      value={editDraft.title}
                      onChange={(e) => onEditChange({ title: e.target.value })}
                    />
                  ) : (
                    post.title
                  )}
                </td>
                <td data-label="Body">
                  {isEditing(post.id) ? (
                    <textarea
                      value={editDraft.body}
                      onChange={(e) => onEditChange({ body: e.target.value })}
                      rows={3}
                    />
                  ) : (
                    post.body
                  )}
                </td>
                <td className="table-actions" data-label="Actions">
                  {isEditing(post.id) ? (
                    <div className="action-group">
                      <button className="primary" onClick={onEditSave}>
                        Save
                      </button>
                      <button onClick={onEditCancel}>Cancel</button>
                    </div>
                  ) : (
                    <div className="action-group">
                      <button onClick={() => onEditStart(post)}>Edit</button>
                      <button className="danger" onClick={() => onDelete(post.id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PostsTable
