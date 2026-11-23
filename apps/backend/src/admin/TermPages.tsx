import type { UIFieldServerComponent } from 'payload'

export const TermPages: UIFieldServerComponent = async ({ data, payload }) => {
  if (!data?.wpId || !data.taxonomy) return null
  const { docs } = await payload.find({
    collection: 'pages',
    select: { path: true, status: true, termIds: true },
    sort: 'path',
    depth: 0,
    pagination: false,
  })
  const pages = docs.filter((page) =>
    ((page.termIds as Record<string, number[]> | null)?.[data.taxonomy] ?? []).includes(data.wpId),
  )

  return (
    <div className="field-type">
      <h4>Used by {pages.length} pages</h4>
      {pages.length > 0 && (
        <details>
          <summary>Show</summary>
          <ul>
            {pages.map((page) => (
              <li key={page.id}>
                <a href={`/admin/collections/pages/${page.id}`}>{page.path}</a>
                {page.status !== 'publish' && ' (draft)'}
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  )
}
