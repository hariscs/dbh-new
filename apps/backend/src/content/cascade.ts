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

export const rederiveTermPages: CollectionAfterChangeHook = async ({ doc, previousDoc, operation, req, context }) => {
  if (context.import || context.sheetImport || operation !== 'update') return doc
  if (doc.name === previousDoc.name && doc.slug === previousDoc.slug && doc.parent === previousDoc.parent) return doc

  const { docs: terms } = await req.payload.find({
    collection: 'terms',
    depth: 0,
    pagination: false,
    select: { wpId: true, parent: true },
    req,
  })
  const affected = new Set<number>([doc.wpId])
  for (let grew = true; grew; ) {
    grew = false
    for (const term of terms) {
      if (affected.has(term.wpId) || !affected.has(term.parent)) continue
      affected.add(term.wpId)
      grew = true
    }
  }

  const { docs: pages } = await req.payload.find({
    collection: 'pages',
    depth: 0,
    pagination: false,
    select: { termIds: true },
    req,
  })
  const usesAffected = (termIds: unknown) =>
    Object.values((termIds ?? {}) as Record<string, number[]>).some((ids) => ids.some((id) => affected.has(id)))
  const matches = pages.filter((page) => usesAffected(page.termIds))
  for (const page of matches) {
    await req.payload.update({
      collection: 'pages',
      id: page.id,
      data: {},
      depth: 0,
      req,
      context: { termChanged: true },
    })
  }

  req.payload.logger.info(`terms: ${doc.name} changed, re-derived ${matches.length} pages`)
  if (matches.length) await revalidateSite(req)
  return doc
}
