import type { Payload } from 'payload'

import { POST_TYPES } from './labels'

const CARD = { border: '1px solid var(--theme-elevation-150)', borderRadius: 4, padding: 16 }

export const Dashboard = async ({ payload }: { payload: Payload }) => {
  const count = async (where: Record<string, unknown>) =>
    (await payload.count({ collection: 'pages', where: where as never })).totalDocs
  const published = await count({ postType: { equals: 'page' }, status: { equals: 'publish' } })
  const drafts = await count({ postType: { equals: 'page' }, status: { equals: 'draft' } })
  const otherTypes = await Promise.all(
    POST_TYPES.filter((type) => !['page', 'post'].includes(type.value)).map(async (type) => ({
      ...type,
      total: await count({ postType: { equals: type.value } }),
    })),
  )
  const { docs: recent } = await payload.find({
    collection: 'pages',
    sort: '-updatedAt',
    limit: 6,
    depth: 0,
    select: { title: true, path: true, updatedAt: true },
  })
  const siteUrl = process.env.FRONTEND_URL

  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ marginBottom: 16 }}>Welcome to the DBH CMS</h2>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
        <a className="btn btn--style-primary btn--size-medium" href="/admin/collections/pages/create">Add page</a>
        <a className="btn btn--style-secondary btn--size-medium" href="/admin/collections/sheet-imports/create">Import from sheet</a>
        {siteUrl && <a className="btn btn--style-secondary btn--size-medium" href={siteUrl} rel="noreferrer" target="_blank">View site</a>}
      </div>
      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        <div style={CARD}>
          <h4>At a glance</h4>
          <p><a href="/admin/collections/pages?where[postType][equals]=page&where[status][equals]=publish">{published} published pages</a></p>
          <p><a href="/admin/collections/pages?where[postType][equals]=page&where[status][equals]=draft">{drafts} drafts</a></p>
          {otherTypes.map((type) => (
            <p key={type.value}>
              <a href={`/admin/collections/pages?where[postType][equals]=${type.value}`}>{type.total} {type.plural.toLowerCase()}</a>
            </p>
          ))}
        </div>
        <div style={CARD}>
          <h4>Recently edited</h4>
          {recent.map((page) => (
            <p key={page.id}>
              <a href={`/admin/collections/pages/${page.id}`}>{page.title}</a>
              <br />
              <small style={{ opacity: 0.6 }}>{page.path} · {new Date(page.updatedAt).toLocaleDateString()}</small>
            </p>
          ))}
        </div>
        <div style={CARD}>
          <h4>Coming from WordPress?</h4>
          <p>Pages, authors, facilities and other post types are all under <strong>All content</strong>. Use the links at the top of the menu to see one type.</p>
          <p>ACF fields are under <strong>Page fields</strong> on each page, grouped like ACF.</p>
          <p>Categories, topics and locations are under <strong>Categories &amp; Tags</strong>.</p>
          <p>WP All Import is <strong>Import from Sheet</strong>.</p>
        </div>
      </div>
    </div>
  )
}
