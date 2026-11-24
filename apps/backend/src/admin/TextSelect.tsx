'use client'

import { SelectInput, useDocumentInfo, useField, useFormInitializing } from '@payloadcms/ui'
import { useSearchParams } from 'next/navigation'
import type { TextFieldClientComponent } from 'payload'
import { useEffect } from 'react'

type Option = { label: string; value: string }
type Props = { options: Option[] }

export const TextSelect: TextFieldClientComponent = (props) => {
  const { field, path, readOnly } = props
  const { options } = props as unknown as Props
  const { value, setValue } = useField<string>({ path })
  const { id } = useDocumentInfo()
  const preset = useSearchParams().get(path)
  const initializing = useFormInitializing()

  useEffect(() => {
    if (!id && !initializing && preset && !value) setValue(preset)
  }, [initializing])

  const all = value && !options.some((option) => option.value === value) ? [...options, { label: value, value }] : options

  return (
    <SelectInput
      description={field.admin?.description}
      isClearable={!field.required}
      label={field.label}
      name={field.name}
      onChange={(option) => !Array.isArray(option) && setValue(option ? String(option.value) : '')}
      options={all}
      path={path}
      readOnly={readOnly}
      required={field.required}
      value={value ?? ''}
    />
  )
}
