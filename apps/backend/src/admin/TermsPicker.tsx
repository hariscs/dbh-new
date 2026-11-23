'use client'

import { JSONField, SelectInput, useField, useFormFields } from '@payloadcms/ui'
import type { JSONFieldClientComponent } from 'payload'
import { useEffect, useState } from 'react'

import { TAXONOMIES } from './labels'

type TermDoc = { wpId: number; name: string; taxonomy: string; parent: number }
type TermIds = Record<string, number[]>

const TAXONOMIES_BY_POST_TYPE: Record<string, string[]> = {
  page: ['template', 'geo', 'topic', 'topic-2', 'intent', 'marketing-channel'],
  authors: ['business-unit', 'category', 'topic', 'intent'],
  facility: ['facility-type', 'geo'],
  newsroom: ['newsroom-category'],
  post: ['category'],
}

const decode = (text: string) =>
  text.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&amp;/g, '&')

const termChain = (term: TermDoc, byId: Map<number, TermDoc>) => {
  const names = [decode(term.name)]
  for (let parent = byId.get(term.parent); parent; parent = byId.get(parent.parent)) names.unshift(decode(parent.name))
  return names.join(' › ')
}

export const TermsPicker: JSONFieldClientComponent = (props) => {
  const { path, readOnly } = props
  const { value, setValue } = useField<TermIds>({ path })
  const postType = useFormFields(([fields]) => fields.postType?.value as string | undefined)
  const [terms, setTerms] = useState<TermDoc[]>([])
  const [rawJson, setRawJson] = useState(false)

  useEffect(() => {
    fetch(
      '/api/terms?depth=0&pagination=false&select[wpId]=true&select[name]=true&select[taxonomy]=true&select[parent]=true',
      { credentials: 'include' },
    )
      .then((response) => response.json())
      .then(({ docs }: { docs: TermDoc[] }) => setTerms(docs))
  }, [])

  const toggle = (
    <button className="btn btn--style-secondary btn--size-small" onClick={() => setRawJson(!rawJson)} type="button">
      {rawJson ? 'Use pickers' : 'Edit JSON'}
    </button>
  )
  if (rawJson) return <div>{toggle}<JSONField {...props} /></div>

  const termIds = value ?? {}
  const byId = new Map(terms.map((term) => [term.wpId, term]))
  const taxonomies = [...new Set([...(TAXONOMIES_BY_POST_TYPE[postType ?? ''] ?? []), ...Object.keys(termIds)])]

  const change = (taxonomy: string, ids: number[]) => {
    const { [taxonomy]: _, ...rest } = termIds
    setValue(ids.length ? { ...rest, [taxonomy]: ids } : rest)
  }

  return (
    <div>
      <h4>Categories &amp; tags</h4>
      {taxonomies.map((taxonomy) => {
        const selected = termIds[taxonomy] ?? []
        const options = terms
          .filter((term) => term.taxonomy === taxonomy)
          .map((term) => ({ label: termChain(term, byId), value: String(term.wpId) }))
          .sort((a, b) => a.label.localeCompare(b.label))
        const missing = terms.length
          ? selected.filter((id) => !byId.has(id)).map((id) => ({ label: `#${id} (missing)`, value: String(id) }))
          : []
        return (
          <SelectInput
            hasMany
            isClearable
            key={taxonomy}
            label={TAXONOMIES.find((option) => option.value === taxonomy)?.label ?? taxonomy}
            name={`${path}.${taxonomy}`}
            onChange={(picked) => change(taxonomy, (Array.isArray(picked) ? picked : []).map((option) => Number(option.value)))}
            options={[...options, ...missing]}
            path={`${path}.${taxonomy}`}
            readOnly={readOnly}
            value={selected.map(String)}
          />
        )
      })}
      {toggle}
    </div>
  )
}
