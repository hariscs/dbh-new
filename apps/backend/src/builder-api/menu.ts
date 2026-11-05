import type { Payload } from 'payload'

export const findMenu = async (payload: Payload, rawLocation: string) => {
  const location = rawLocation.toLowerCase().replace(/[^a-z0-9_-]/g, '')
  const { docs } = await payload.find({ collection: 'menus', depth: 0, pagination: false })
  const menu = docs.find((doc) => doc.location === location)
  if (menu) return { status: 200, body: menu.tree }

  return {
    status: 404,
    body: {
      code: 'dbh_menu_not_found',
      message: `No menu assigned to location "${location}".`,
      data: { status: 404, available: docs.map((doc) => doc.location) },
    },
  }
}
