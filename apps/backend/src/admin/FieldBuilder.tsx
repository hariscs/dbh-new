'use client'

import {
  Button,
  Collapsible,
  DraggableSortable,
  DraggableSortableItem,
  JSONField,
  SelectInput,
  TextareaInput,
  TextInput,
  useField,
} from '@payloadcms/ui'
import type { JSONFieldClientComponent } from 'payload'
import { type ChangeEvent, type MouseEvent, useState } from 'react'

import { FIELD_TYPES, type FieldDefinition } from './labels'

const KEY_LENGTH = 13
const CHOICE_SEPARATOR = ' : '

const newKey = () => `field_${crypto.randomUUID().replace(/-/g, '').slice(0, KEY_LENGTH)}`
const toName = (label: string) =>
  label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '')

const choicesToText = (field: FieldDefinition) =>
  (field.choices ?? []).map((choice) => (choice.value === choice.label ? choice.value : `${choice.value}${CHOICE_SEPARATOR}${choice.label}`)).join('\n')

const textToChoices = (text: string) =>
  text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [value, label] = line.split(CHOICE_SEPARATOR).map((part) => part.trim())
      return { value, label: label || value }
    })

const stop = (event: MouseEvent) => event.stopPropagation()

const ChoicesInput = ({ field, path, readOnly, onChange }: {
  field: FieldDefinition
  path: string
  readOnly?: boolean
  onChange: (choices: FieldDefinition['choices']) => void
}) => {
  const [text, setText] = useState(() => choicesToText(field))
  return (
    <TextareaInput
      description={`One choice per line. Use "value${CHOICE_SEPARATOR}Label" when the stored value differs from what editors see`}
      label="Choices"
      onChange={(event) => {
        setText(event.target.value)
        onChange(textToChoices(event.target.value))
      }}
      path={path}
      readOnly={readOnly}
      rows={4}
      value={text}
    />
  )
}

export const FieldBuilder: JSONFieldClientComponent = (props) => {
  const { path, readOnly } = props
  const { value, setValue } = useField<FieldDefinition[]>({ path })
  const [rawJson, setRawJson] = useState(false)
  const [savedKeys] = useState(() => new Set((value ?? []).map((field) => field.key)))

  const jsonToggle = (
    <Button buttonStyle="secondary" margin={false} onClick={() => setRawJson(!rawJson)} size="small">
      {rawJson ? 'Use field editor' : 'Edit JSON'}
    </Button>
  )
  if (rawJson) return <div>{jsonToggle}<JSONField {...props} /></div>

  const fields = value ?? []
  const update = (key: string, patch: Partial<FieldDefinition>) =>
    setValue(fields.map((field) => (field.key === key ? { ...field, ...patch } : field)))
  const remove = (field: FieldDefinition) => {
    const warning = savedKeys.has(field.key) ? ' Values already saved on pages stay in the data but are no longer shown here.' : ''
    if (window.confirm(`Delete the field "${field.label}"?${warning}`)) setValue(fields.filter((other) => other.key !== field.key))
  }
  const add = () => setValue([...fields, { key: newKey(), name: '', label: 'New field', type: 'text' }])
  const reorder = (from: number, to: number) => {
    const next = [...fields]
    const [moved] = next.splice(from, 1)
    next.splice(to, 0, moved)
    setValue(next)
  }

  const typeOptions = (field: FieldDefinition) =>
    FIELD_TYPES.some((type) => type.value === field.type)
      ? FIELD_TYPES
      : [...FIELD_TYPES, { value: field.type ?? '', label: `${field.type} (imported from ACF)` }]

  const renderField = (field: FieldDefinition) => {
    const key = `${path}.${field.key}`
    const saved = savedKeys.has(field.key)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          <TextInput
            label="Label"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              update(field.key, saved ? { label: event.target.value } : { label: event.target.value, name: toName(event.target.value) })
            }
            path={`${key}.label`}
            readOnly={readOnly}
            value={field.label}
          />
          <TextInput
            description={saved ? 'Locked: pages store values under this name' : 'Used in code and the API. Filled from the label'}
            label="Name"
            onChange={(event: ChangeEvent<HTMLInputElement>) => update(field.key, { name: toName(event.target.value) })}
            path={`${key}.name`}
            readOnly={readOnly || saved}
            value={field.name}
          />
          <SelectInput
            label="Type"
            name={`${key}.type`}
            onChange={(option) => !Array.isArray(option) && option && update(field.key, { type: String(option.value) })}
            options={typeOptions(field)}
            path={`${key}.type`}
            readOnly={readOnly}
            value={field.type ?? 'text'}
          />
        </div>
        {field.type === 'select' && (
          <>
            <ChoicesInput
              field={field}
              onChange={(choices) => update(field.key, { choices })}
              path={`${key}.choices`}
              readOnly={readOnly}
            />
            <label>
              <input
                checked={Boolean(field.multiple)}
                disabled={readOnly}
                onChange={(event) => update(field.key, { multiple: event.target.checked })}
                type="checkbox"
              />{' '}
              Allow several choices (saved comma separated)
            </label>
          </>
        )}
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          <TextInput
            label="Help text"
            onChange={(event: ChangeEvent<HTMLInputElement>) => update(field.key, { instructions: event.target.value })}
            path={`${key}.instructions`}
            readOnly={readOnly}
            value={field.instructions ?? ''}
          />
          <TextInput
            description="Filled in on new pages"
            label="Default value"
            onChange={(event: ChangeEvent<HTMLInputElement>) => update(field.key, { defaultValue: event.target.value })}
            path={`${key}.defaultValue`}
            readOnly={readOnly}
            value={field.defaultValue ?? ''}
          />
        </div>
        <label>
          <input
            checked={Boolean(field.required)}
            disabled={readOnly}
            onChange={(event) => update(field.key, { required: event.target.checked })}
            type="checkbox"
          />{' '}
          Required (pages can't be saved without it)
        </label>
      </div>
    )
  }

  return (
    <div className="field-type field-builder">
      <style>{'.field-builder .collapsible__actions { width: auto; margin-inline-end: 12px; }'}</style>
      <h4>Fields</h4>
      <p style={{ opacity: 0.6 }}>
        Drag to reorder. New fields show on pages right away; the website shows them once a developer adds them to a template
      </p>
      <DraggableSortable
        ids={fields.map((field) => field.key)}
        onDragEnd={({ moveFromIndex, moveToIndex }) => reorder(moveFromIndex, moveToIndex)}
      >
        {fields.map((field) => (
          <DraggableSortableItem disabled={readOnly} id={field.key} key={field.key}>
            {({ attributes, listeners, setNodeRef, transform, transition }) => (
              <div ref={setNodeRef} style={{ transform, transition, marginBottom: 8 }}>
                <Collapsible
                  actions={
                    !readOnly && (
                      <div onClick={stop}>
                        <Button buttonStyle="secondary" margin={false} onClick={() => remove(field)} size="small">
                          Delete
                        </Button>
                      </div>
                    )
                  }
                  dragHandleProps={{ id: field.key, attributes, listeners }}
                  header={
                    <span>
                      {field.label} <small style={{ opacity: 0.6 }}>{field.name || '(no name)'} · {field.type}{field.required ? ' · required' : ''}</small>
                    </span>
                  }
                  initCollapsed={savedKeys.has(field.key)}
                >
                  {renderField(field)}
                </Collapsible>
              </div>
            )}
          </DraggableSortableItem>
        ))}
      </DraggableSortable>
      <div style={{ display: 'flex', gap: 8, marginTop: 12, alignItems: 'center' }}>
        {!readOnly && (
          <Button margin={false} onClick={add} size="small">
            + Add field
          </Button>
        )}
        {jsonToggle}
      </div>
    </div>
  )
}
