'use client'

import { Button, JSONField, SelectInput, TextareaInput, TextInput, useField, useFormFields } from '@payloadcms/ui'
import type { JSONFieldClientComponent } from 'payload'
import { type ChangeEvent, useEffect, useState } from 'react'

type GroupField = { key: string; name: string; type?: string; label: string }
type Rule = { param: string; operator: string; value: string }
type Group = { id: number; title: string; fields: GroupField[]; location?: Rule[][] }
type Author = { wpId: number; title: string }
type MediaDoc = { filename: string; alt: string }
type Fields = Record<string, string>

const OTHER_TAB = 'Other'
const EMPTY_IMAGE = 'false'
const TEXT_TYPES = ['text', 'url', 'email', 'number', 'select', 'color_picker', 'date_picker', 'true_false']
const HTML_TYPES = ['textarea', 'wysiwyg']
const AUTHOR_FIELDS = ['authored_by', 'edited_by', 'medically_reviewed_by']
const MEDIA_PATH = '/wp-content/uploads/cms/'

const mediaUrl = (filename: string) => `${window.location.origin}${MEDIA_PATH}${encodeURIComponent(filename)}`

const appliesTo = (group: Group, postType: string) =>
  (group.location ?? []).some((rules) =>
    rules.some((rule) => rule.param === 'post_type' && (rule.operator === '==') === (rule.value === postType)),
  )

const isEmpty = (value: string | undefined) => !value || value === EMPTY_IMAGE

export const PageFieldsForm: JSONFieldClientComponent = (props) => {
  const { path, readOnly } = props
  const { value, setValue } = useField<Fields>({ path })
  const postType = useFormFields(([fields]) => fields.postType?.value as string | undefined)
  const fieldTaxonomies = useFormFields(([fields]) => fields.fieldTaxonomies?.value as string[] | undefined)
  const [groups, setGroups] = useState<Group[]>([])
  const [authors, setAuthors] = useState<Author[]>([])
  const [activeTab, setActiveTab] = useState('')
  const [search, setSearch] = useState('')
  const [showEmpty, setShowEmpty] = useState(false)
  const [rawJson, setRawJson] = useState(false)
  const [media, setMedia] = useState<MediaDoc[]>([])
  const [uploading, setUploading] = useState('')

  useEffect(() => {
    fetch(
      '/api/field-groups?depth=0&pagination=false&sort=position&select[title]=true&select[fields]=true&select[location]=true',
      { credentials: 'include' },
    )
      .then((response) => response.json())
      .then(({ docs }: { docs: Group[] }) => setGroups(docs))
    fetch(
      '/api/pages?depth=0&pagination=false&sort=title&where[postType][equals]=authors&select[wpId]=true&select[title]=true',
      { credentials: 'include' },
    )
      .then((response) => response.json())
      .then(({ docs }: { docs: Author[] }) => setAuthors(docs))
    fetch('/api/media?depth=0&pagination=false&sort=-createdAt&select[filename]=true&select[alt]=true', {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then(({ docs }: { docs: MediaDoc[] }) => setMedia(docs))
  }, [])

  const jsonToggle = (
    <Button buttonStyle="secondary" onClick={() => setRawJson(!rawJson)} size="small">
      {rawJson ? 'Use form' : 'Edit JSON'}
    </Button>
  )
  if (rawJson) return <div>{jsonToggle}<JSONField {...props} /></div>

  const fields = value ?? {}
  const derivedKeys = new Set((fieldTaxonomies ?? []).flatMap((taxonomy) => [taxonomy, `${taxonomy}___slugs`]))
  const pageGroups = groups.filter((group) => appliesTo(group, postType ?? ''))
  const groupedNames = new Set(pageGroups.flatMap((group) => group.fields.flatMap((field) => [field.name, `${field.name}___alt`])))
  const otherFields = Object.keys(fields)
    .filter((name) => !groupedNames.has(name))
    .sort()
    .map((name) => ({ key: name, name, label: name, type: derivedKeys.has(name) ? 'derived' : 'text' }))
  const tabs = [...pageGroups.map((group) => ({ title: group.title, fields: group.fields })), { title: OTHER_TAB, fields: otherFields }]
  const currentTab = tabs.find((tab) => tab.title === activeTab) ?? tabs[0]

  const term = search.trim().toLowerCase()
  const matches = (field: GroupField) =>
    (showEmpty || !isEmpty(fields[field.name])) &&
    (!term || field.name.toLowerCase().includes(term) || field.label.toLowerCase().includes(term))
  const visible = term
    ? tabs.flatMap((tab) => tab.fields.filter(matches).map((field) => ({ ...field, group: tab.title })))
    : (currentTab?.fields ?? []).filter(matches).map((field) => ({ ...field, group: currentTab?.title ?? '' }))

  const change = (name: string, next: string) => setValue({ ...fields, [name]: next })

  const upload = async (name: string, file: File) => {
    setUploading(name)
    const form = new FormData()
    form.append('file', file)
    form.append('_payload', JSON.stringify({ alt: fields[`${name}___alt`] || file.name }))
    const response = await fetch('/api/media', { method: 'POST', body: form, credentials: 'include' })
    setUploading('')
    if (!response.ok) return window.alert('Upload failed. Use a JPG, PNG, WebP, GIF or AVIF image')
    const { doc } = (await response.json()) as { doc: MediaDoc }
    setMedia([doc, ...media])
    change(name, mediaUrl(doc.filename))
  }

  const renderField = (field: GroupField & { group: string }) => {
    const fieldPath = `${path}.${field.name}`
    const label = term ? `${field.label} · ${field.group}` : field.label
    const current = fields[field.name]

    if (derivedKeys.has(field.name)) {
      return <TextInput description="Set from Terms" key={fieldPath} label={label} path={fieldPath} readOnly value={current ?? ''} />
    }
    if (AUTHOR_FIELDS.includes(field.name)) {
      return (
        <SelectInput
          isClearable
          key={fieldPath}
          label={label}
          name={fieldPath}
          onChange={(option) => !Array.isArray(option) && change(field.name, option ? String(option.value) : EMPTY_IMAGE)}
          options={authors.map((author) => ({ label: author.title, value: String(author.wpId) }))}
          path={fieldPath}
          readOnly={readOnly}
          value={isEmpty(current) ? '' : current}
        />
      )
    }
    if (field.type === 'image') {
      return (
        <div key={fieldPath}>
          <TextInput
            label={label}
            onChange={(event: ChangeEvent<HTMLInputElement>) => change(field.name, event.target.value || EMPTY_IMAGE)}
            path={fieldPath}
            placeholder="Image URL"
            readOnly={readOnly}
            value={isEmpty(current) ? '' : current}
          />
          {!isEmpty(current) && <img alt="" src={current} style={{ maxHeight: 120, marginBottom: 8 }} />}
          {!readOnly && (
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
              <label className="btn btn--style-secondary btn--size-small" style={{ margin: 0, cursor: 'pointer' }}>
                {uploading === field.name ? 'Uploading…' : 'Upload image'}
                <input
                  accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                  hidden
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const file = event.target.files?.[0]
                    if (file) upload(field.name, file)
                  }}
                  type="file"
                />
              </label>
              <div style={{ flex: 1 }}>
                <SelectInput
                  name={`${fieldPath}.library`}
                  onChange={(option) => !Array.isArray(option) && option && change(field.name, String(option.value))}
                  options={media.map((item) => ({ label: `${item.filename} (${item.alt})`, value: mediaUrl(item.filename) }))}
                  path={`${fieldPath}.library`}
                  placeholder="Or choose from Media"
                  value=""
                />
              </div>
            </div>
          )}
          <TextInput
            label={`${field.label} alt text`}
            onChange={(event: ChangeEvent<HTMLInputElement>) => change(`${field.name}___alt`, event.target.value)}
            path={`${fieldPath}___alt`}
            readOnly={readOnly}
            value={fields[`${field.name}___alt`] ?? ''}
          />
        </div>
      )
    }
    if (HTML_TYPES.includes(field.type ?? '')) {
      return (
        <TextareaInput
          description={field.type === 'wysiwyg' ? 'HTML' : undefined}
          key={fieldPath}
          label={label}
          onChange={(event) => change(field.name, event.target.value)}
          path={fieldPath}
          readOnly={readOnly}
          rows={Math.min(12, Math.max(3, (current ?? '').split('\n').length))}
          value={current ?? ''}
        />
      )
    }
    if (TEXT_TYPES.includes(field.type ?? '')) {
      return (
        <TextInput
          key={fieldPath}
          label={label}
          onChange={(event: ChangeEvent<HTMLInputElement>) => change(field.name, event.target.value)}
          path={fieldPath}
          readOnly={readOnly}
          value={current ?? ''}
        />
      )
    }
    return (
      <TextInput
        description={`${field.type} field: edit with Edit JSON`}
        key={fieldPath}
        label={label}
        path={fieldPath}
        readOnly
        value={current ?? ''}
      />
    )
  }

  return (
    <div className="field-type">
      <h4>Page fields</h4>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
        {tabs.map((tab) => (
          <Button
            buttonStyle={tab.title === currentTab?.title && !term ? 'primary' : 'secondary'}
            key={tab.title}
            margin={false}
            onClick={() => setActiveTab(tab.title)}
            size="small"
          >
            {tab.title}
          </Button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
        <input
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search all fields"
          style={{ flex: 1, padding: 8 }}
          type="search"
          value={search}
        />
        <label>
          <input checked={showEmpty} onChange={(event) => setShowEmpty(event.target.checked)} type="checkbox" /> Show empty
          fields
        </label>
      </div>
      {visible.length === 0 && <p>No fields to show. Tick "Show empty fields" to see all.</p>}
      {visible.map(renderField)}
      {jsonToggle}
    </div>
  )
}
