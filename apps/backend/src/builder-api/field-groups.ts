import type { Payload } from 'payload'

export const listFieldGroups = async (payload: Payload) => {
  const { docs } = await payload.find({
    collection: 'field-groups',
    sort: 'position',
    depth: 0,
    pagination: false,
    select: { key: true, title: true, fields: true },
  })
  return { groups: docs.map((group) => ({ key: group.key, title: group.title, fields: group.fields ?? [] })) }
}
