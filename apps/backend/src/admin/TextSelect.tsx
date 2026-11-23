'use client'

import { SelectInput, useField } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'

type Option = { label: string; value: string }
type Props = { options: Option[] }

export const TextSelect: TextFieldClientComponent = (props) => {
  const { field, path, readOnly } = props
  const { options } = props as unknown as Props
  const { value, setValue } = useField<string>({ path })
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
