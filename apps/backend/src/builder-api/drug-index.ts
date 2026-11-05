import type { Payload } from 'payload'

import { wptexturize } from '../import/wp-text'
import { hasTemplate } from './pages'

const LINK_ORIGIN = 'https://cms.districtbehavioralhealth.com'
const GLOSSARY_TEMPLATE = 'cro1'
const DEFAULT_LETTER = 'A'
const EMPTY_HTML = '<p class="index-glossary__empty">No pages found.</p>'

const titleCollator = new Intl.Collator('en', { sensitivity: 'base' })

const toLetter = (raw: string) => {
  const letter = raw.trim().replace(/^\/+|\/+$/g, '').slice(0, 1).toUpperCase()
  return /^[A-Z]$/.test(letter) ? letter : DEFAULT_LETTER
}

const escapeTitle = (title: string) =>
  wptexturize(title)
    .trim()
    .replace(/&(?!#?\w+;)/g, '&#038;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

export const findDrugIndex = async (payload: Payload, rawLetter: string) => {
  const letter = toLetter(rawLetter)
  const { docs } = await payload.find({
    collection: 'pages',
    where: { postType: { equals: 'page' }, status: { equals: 'publish' } },
    depth: 0,
    pagination: false,
    select: { title: true, path: true, templates: true },
  })

  const items = docs
    .filter((page) => hasTemplate(page.templates, GLOSSARY_TEMPLATE))
    .filter((page) => titleCollator.compare(page.title.slice(0, 1), letter) === 0)
    .sort((a, b) => titleCollator.compare(a.title, b.title))
    .map(
      (page) =>
        `<li class="index-glossary__item"><a class="index-glossary__link" href="${LINK_ORIGIN}${page.path}/">${escapeTitle(page.title)}</a></li>`,
    )

  return {
    success: true,
    data: { letter, html: items.length ? `<ul class="index-glossary__grid">${items.join('')}</ul>` : EMPTY_HTML },
  }
}
