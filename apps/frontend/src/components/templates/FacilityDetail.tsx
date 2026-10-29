import React from 'react'
import { facilityTemplateHtml } from './facilityTemplate'

// Renders the static facility-detail layout with the dynamic fields filled from the
// builder API: facility name, location, and the three galleries (interiors, exteriors,
// location highlights). The galleries replace the original Elementor masonry — whose
// images are JS-painted data-thumbnails — with a self-contained grid that renders the
// API image URLs directly. Everything else is shared static content; interactivity
// (tabs, carousel) is handled by the global WidgetInteractions / Carousels components.

export type GalleryImage = {
  url: string
  alt?: string
  title?: string
  width?: number
  height?: number
  sizes?: { thumbnail?: string; medium?: string; large?: string; full?: string }
}

export type FacilityDetailProps = {
  facilityName?: string
  facilityLocation?: string
  interiorsGallery?: GalleryImage[]
  exteriorsGallery?: GalleryImage[]
  highlightsGallery?: GalleryImage[]
}

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

function galleryHtml(images: GalleryImage[]): string {
  if (!images.length) return ''
  const items = images
    .map((img) => {
      const full = img.url
      const display = img.sizes?.large || img.sizes?.medium || img.url
      const alt = escapeHtml(img.alt || img.title || 'Facility photo')
      const dims =
        img.width && img.height ? ` width="${img.width}" height="${img.height}"` : ''
      return (
        `<a class="facility-gallery-item" href="${escapeHtml(full)}" data-elementor-open-lightbox="yes" rel="noopener noreferrer">` +
        `<img src="${escapeHtml(display)}" alt="${alt}" loading="lazy" decoding="async"${dims} />` +
        `</a>`
      )
    })
    .join('')
  return `<div class="facility-gallery-grid">${items}</div>`
}

export default function FacilityDetail({
  facilityName = 'Our Facility',
  facilityLocation = '',
  interiorsGallery = [],
  exteriorsGallery = [],
  highlightsGallery = [],
}: FacilityDetailProps) {
  const html = facilityTemplateHtml
    .replaceAll('{{FACILITY_NAME}}', escapeHtml(facilityName))
    .replaceAll('{{FACILITY_LOCATION}}', escapeHtml(facilityLocation))
    .replace('{{GALLERY_0}}', galleryHtml(interiorsGallery))
    .replace('{{GALLERY_1}}', galleryHtml(exteriorsGallery))
    .replace('{{GALLERY_2}}', galleryHtml(highlightsGallery))

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
