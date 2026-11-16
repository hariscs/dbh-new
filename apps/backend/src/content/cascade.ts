import type { CollectionAfterChangeHook } from 'payload'

import { revalidateSite } from './revalidate'

export const moveChildren: CollectionAfterChangeHook = async ({ doc, previousDoc, req, context }) => {
  if (context.import || !previousDoc) return doc
  if (doc.path === previousDoc.path && doc.reachableByPath === previousDoc.reachableByPath) return doc

  const isTopLevel = !context.parentMoved
  const { docs: children } = await req.payload.find({
    collection: 'pages',
    where: { parentWpId: { equals: doc.wpId }, postType: { equals: 'page' } },
    depth: 0,
    pagination: false,
    select: { id: true },
    req,
  })
  for (const child of children) {
    await req.payload.update({
      collection: 'pages',
      id: child.id,
      data: {},
      depth: 0,
      req,
      context: { parentMoved: true },
    })
  }

  if (isTopLevel && children.length && !context.sheetImport) await revalidateSite(req)
  return doc
}
