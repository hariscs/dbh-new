import type { UIFieldServerComponent } from 'payload'

export const ChildPages: UIFieldServerComponent = async ({ data, payload }) => {
  if (!data?.wpId) return null
  const { docs } = await payload.find({
    collection: 'pages',
    where: { parentWpId: { equals: data.wpId } },
    select: { path: true, status: true },
    sort: 'path',
    depth: 0,
    pagination: false,
  })

  return (
    <div className="field-type">
      <h4>Child pages ({docs.length})</h4>
      {docs.length > 0 && (
        <details>
          <summary>Show</summary>
          <ul>
            {docs.map((page) => (
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
