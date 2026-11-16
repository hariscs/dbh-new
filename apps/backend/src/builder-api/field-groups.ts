import type { Payload } from 'payload'

type GroupField = { key: string; name: string; type?: string; label: string }

export const listFieldGroups = async (payload: Payload) => {
  const { docs } = await payload.find({
    collection: 'field-groups',
    sort: 'position',
    depth: 0,
    pagination: false,
    select: { key: true, title: true, fields: true },
  })
  return {
    groups: docs.map((group) => ({
      key: group.key,
      title: group.title,
      fields: ((group.fields ?? []) as GroupField[]).map(({ key, name, type, label }) => ({ key, name, type, label })),
    })),
  }
}
