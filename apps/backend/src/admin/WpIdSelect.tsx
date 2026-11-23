'use client'

import { SelectInput, useField, useFormFields } from '@payloadcms/ui'
import type { NumberFieldClientComponent } from 'payload'
import { useEffect, useState } from 'react'

type Props = { collection: 'pages' | 'terms' }
type Option = { label: string; value: string }
type PageDoc = { wpId: number; path: string; status: string; postType: string }
type TermDoc = { wpId: number; name: string; taxonomy: string; parent: number }

const decode = (text: string) =>
  text.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&amp;/g, '&')

const termChain = (term: TermDoc, byId: Map<number, TermDoc>) => {
  const names = [decode(term.name)]
  for (let parent = byId.get(term.parent); parent; parent = byId.get(parent.parent)) names.unshift(decode(parent.name))
  return names.join(' › ')
}

export const WpIdSelect: NumberFieldClientComponent = (props) => {
  const { field, path, readOnly } = props
  const { collection } = props as unknown as Props
  const { value, setValue } = useField<number>({ path })
  const ownWpId = useFormFields(([fields]) => fields.wpId?.value as number | undefined)
  const taxonomy = useFormFields(([fields]) => fields.taxonomy?.value as string | undefined)
  const [options, setOptions] = useState<Option[]>([])

  useEffect(() => {
    const select =
      collection === 'pages' ? 'select[wpId]=true&select[path]=true&select[status]=true&select[postType]=true'
        : 'select[wpId]=true&select[name]=true&select[taxonomy]=true&select[parent]=true'
    fetch(`/api/${collection}?depth=0&pagination=false&${select}`, { credentials: 'include' })
      .then((response) => response.json())
      .then(({ docs }: { docs: (PageDoc & TermDoc)[] }) => {
        if (collection === 'pages') {
          setOptions(
            docs
              .filter((doc) => doc.postType === 'page' && doc.wpId !== ownWpId)
              .map((doc) => ({ label: doc.status === 'publish' ? doc.path : `${doc.path} (draft)`, value: String(doc.wpId) }))
              .sort((a, b) => a.label.localeCompare(b.label)),
          )
          return
        }
        const byId = new Map(docs.map((doc) => [doc.wpId, doc]))
        setOptions(
          docs
            .filter((doc) => doc.taxonomy === taxonomy && doc.wpId !== ownWpId)
            .map((doc) => ({ label: termChain(doc, byId), value: String(doc.wpId) }))
            .sort((a, b) => a.label.localeCompare(b.label)),
        )
      })
  }, [collection, ownWpId, taxonomy])

  const current = value ? String(value) : ''
  const missing = current && options.length && !options.some((option) => option.value === current)
  return (
    <SelectInput
      description={field.admin?.description}
      isClearable
      label={field.label}
      name={field.name}
      onChange={(option) => !Array.isArray(option) && setValue(option ? Number(option.value) : 0)}
      options={missing ? [...options, { label: `#${current} (missing)`, value: current }] : options}
      path={path}
      placeholder="None (top level)"
      readOnly={readOnly}
      value={current}
    />
  )
}
