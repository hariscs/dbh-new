import { getPayload } from 'payload'

import config from '../payload.config'

const payload = await getPayload({ config })

const { docs: pages } = await payload.find({
  collection: 'pages',
  depth: 0,
  pagination: false,
  select: { id: true },
})

let created = 0
for (const page of pages) {
  const { totalDocs } = await payload.findVersions({
    collection: 'pages',
    where: { parent: { equals: page.id } },
    limit: 1,
    depth: 0,
  })
  if (totalDocs) continue
  await payload.update({ collection: 'pages', id: page.id, data: {}, context: { import: true } })
  created++
}

console.info(`baseline versions: ${created} created, ${pages.length - created} pages already had versions`)
process.exit(0)
