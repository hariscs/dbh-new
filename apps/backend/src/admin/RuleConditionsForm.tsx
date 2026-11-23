'use client'

import { Button, CheckboxInput, JSONField, SelectInput, TextInput, useField } from '@payloadcms/ui'
import type { JSONFieldClientComponent } from 'payload'
import { type ChangeEvent, useEffect, useState } from 'react'

type Conditions = Record<string, unknown>
type Option = { label: string; value: string }
type TermDoc = { slug: string; name: string; taxonomy: string }

const TOPIC_FILTERS: Option[] = [
  { value: 'any', label: 'Any topic' },
  { value: 'same', label: 'Same topic as this page' },
  { value: 'different', label: 'A different topic' },
  { value: 'specific', label: 'One specific topic' },
]
const GEO_FILTERS: Option[] = [
  { value: 'any', label: 'Any location' },
  { value: 'same', label: 'Same location as this page' },
  { value: 'children_of_same', label: 'Locations inside this one' },
  { value: 'sibling_cities', label: 'Other cities in the same county' },
  { value: 'other', label: 'Any other location' },
  { value: 'other_outside_same', label: 'Locations outside this one' },
]
const GEO_TYPES: Option[] = [
  { value: 'any', label: 'Any level' },
  { value: 'state', label: 'State' },
  { value: 'county', label: 'County' },
  { value: 'city', label: 'City' },
  { value: 'city_or_county', label: 'City or county' },
]
const INTENTS: Option[] = [
  { value: 'any', label: 'Any intent' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
]
const SORTS: Option[] = [
  { value: 'date', label: 'Newest first' },
  { value: 'intent_then_date', label: 'High intent first, then newest' },
  { value: 'topic_priority', label: 'Topic priority' },
  { value: 'population', label: 'Population (no data yet, same as newest first)' },
]

const decode = (text: string) =>
  text.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&amp;/g, '&')

const withCurrent = (options: Option[], current: string) =>
  current && !options.some((option) => option.value === current) ? [...options, { value: current, label: current }] : options

export const RuleConditionsForm: JSONFieldClientComponent = (props) => {
  const { path, readOnly } = props
  const { value, setValue } = useField<Conditions>({ path })
  const [terms, setTerms] = useState<TermDoc[]>([])
  const [rawJson, setRawJson] = useState(false)

  useEffect(() => {
    fetch(
      '/api/terms?depth=0&pagination=false&sort=name&where[taxonomy][in]=topic,template&select[slug]=true&select[name]=true&select[taxonomy]=true',
      { credentials: 'include' },
    )
      .then((response) => response.json())
      .then(({ docs }: { docs: TermDoc[] }) => setTerms(docs))
  }, [])

  const jsonToggle = (
    <Button buttonStyle="secondary" onClick={() => setRawJson(!rawJson)} size="small">
      {rawJson ? 'Use form' : 'Edit JSON'}
    </Button>
  )
  if (rawJson) return <div>{jsonToggle}<JSONField {...props} /></div>

  const cond = value ?? {}
  const set = (key: string, next: unknown) => setValue({ ...cond, [key]: next })
  const text = (key: string, fallback: string) => String(cond[key] ?? fallback) || fallback
  const list = (key: string) => [cond[key] ?? []].flat().map(String)
  const termOptions = (taxonomy: string) =>
    terms.filter((term) => term.taxonomy === taxonomy).map((term) => ({ value: term.slug, label: decode(term.name) }))

  const select = (key: string, label: string, options: Option[], fallback: string, description?: string) => (
    <SelectInput
      description={description}
      label={label}
      name={`${path}.${key}`}
      onChange={(option) => !Array.isArray(option) && option && set(key, String(option.value))}
      options={withCurrent(options, text(key, fallback))}
      path={`${path}.${key}`}
      readOnly={readOnly}
      value={text(key, fallback)}
    />
  )
  const multi = (key: string, label: string, options: Option[], description?: string) => (
    <SelectInput
      description={description}
      hasMany
      label={label}
      name={`${path}.${key}`}
      onChange={(picked) => set(key, (Array.isArray(picked) ? picked : []).map((option) => String(option.value)))}
      options={list(key).reduce(withCurrent, options)}
      path={`${path}.${key}`}
      readOnly={readOnly}
      value={list(key)}
    />
  )
  const number = (key: string, label: string, description?: string) => (
    <TextInput
      description={description}
      label={label}
      onChange={(event: ChangeEvent<HTMLInputElement>) => set(key, Number(event.target.value) || 0)}
      path={`${path}.${key}`}
      readOnly={readOnly}
      value={String(cond[key] ?? '')}
    />
  )
  const checkbox = (key: string, label: string, asNumber: boolean) => (
    <div style={{ marginBottom: 16 }}>
      <CheckboxInput
        checked={Boolean(Number(cond[key] ?? 0))}
        label={label}
        name={`${path}.${key}`}
        onToggle={(event: ChangeEvent<HTMLInputElement>) =>
          set(key, asNumber ? Number(event.target.checked) : event.target.checked)
        }
        readOnly={readOnly}
      />
    </div>
  )

  return (
    <div className="field-type">
      <h4>Which pages to link to</h4>
      {number('limit', 'Number of links', 'How many links this rule adds')}
      {multi('source_template', 'Link to pages using template', termOptions('template'), 'Includes child templates')}
      {select('topic_filter', 'Topic', TOPIC_FILTERS, 'any')}
      {text('topic_filter', 'any') === 'specific' && select('topic_slug', 'Specific topic', termOptions('topic'), '')}
      {multi('exclude_topic1_slugs', 'Never link to these topics', termOptions('topic'))}
      {select('geo_filter', 'Location', GEO_FILTERS, 'any')}
      {select('geo_type', 'Location level', GEO_TYPES, 'any')}
      {select('intent_filter', 'Intent', INTENTS, 'any')}
      {number('older_than_months', 'Only pages older than (months)', '0 = no age limit')}
      <h4>Order and limits</h4>
      {select('sort_by', 'Sort by', SORTS, 'date')}
      {checkbox('unique_topics', 'One link per topic', true)}
      {checkbox('unique_geo', 'One link per location', true)}
      {checkbox('only_if_blog_has_geo', 'Only run when the current page has a location', false)}
      {jsonToggle}
    </div>
  )
}
