import { POST_TYPES } from './labels'

export const PostTypeLinks = () => (
  <div style={{ marginBottom: 24 }}>
    <div style={{ opacity: 0.6, marginBottom: 8 }}>Content by type</div>
    {POST_TYPES.filter((type) => type.value !== 'post').map((type) => (
      <a
        className="nav__link"
        href={`/admin/collections/pages?where[postType][equals]=${type.value}`}
        key={type.value}
        style={{ display: 'block', padding: '4px 0' }}
      >
        {type.plural}
      </a>
    ))}
  </div>
)
