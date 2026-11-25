import type { Payload } from 'payload'

export const listRedirects = async (payload: Payload) => {
  const { docs } = await payload.find({
    collection: 'redirects',
    where: { enabled: { equals: true } },
    depth: 0,
    pagination: false,
    select: { from: true, to: true, status: true },
  })
  return docs.map(({ from, to, status }) => ({ from, to, status: Number(status) }))
}
