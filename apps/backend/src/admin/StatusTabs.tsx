'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { POST_TYPES } from './labels'

const TABS = [
  { label: 'All', status: '' },
  { label: 'Published', status: 'publish' },
  { label: 'Drafts', status: 'draft' },
]

export const StatusTabs = () => {
  const searchParams = useSearchParams()
  const postType = searchParams.get('where[postType][equals]') ?? ''
  const status = searchParams.get('where[status][equals]') ?? ''
  const [counts, setCounts] = useState<Record<string, number>>({})

  const queryFor = (tabStatus: string) =>
    [postType && `where[postType][equals]=${postType}`, tabStatus && `where[status][equals]=${tabStatus}`]
      .filter(Boolean)
      .join('&')

  useEffect(() => {
    for (const tab of TABS) {
      fetch(`/api/pages?limit=1&depth=0&select[id]=true&${queryFor(tab.status)}`, { credentials: 'include' })
        .then((response) => response.json())
        .then(({ totalDocs }: { totalDocs: number }) => setCounts((previous) => ({ ...previous, [tab.status]: totalDocs })))
    }
  }, [postType])

  const type = POST_TYPES.find((option) => option.value === postType)

  return (
    <div style={{ margin: '16px 0', display: 'flex', gap: 16, alignItems: 'baseline' }}>
      <style>{'.list-create-new-doc__create-new-button { display: none; }'}</style>
      <a
        className="btn btn--style-primary btn--size-small"
        href={`/admin/collections/pages/create${postType ? `?postType=${postType}` : ''}`}
        style={{ margin: 0 }}
      >
        Add new {type?.label.toLowerCase() ?? 'page'}
      </a>
      {type && <strong>{type.plural}:</strong>}
      {TABS.map((tab) => (
        <a
          href={`/admin/collections/pages?${queryFor(tab.status)}`}
          key={tab.label}
          style={{ fontWeight: tab.status === status ? 700 : 400, textDecoration: tab.status === status ? 'none' : 'underline' }}
        >
          {tab.label} ({counts[tab.status] ?? '…'})
        </a>
      ))}
    </div>
  )
}
