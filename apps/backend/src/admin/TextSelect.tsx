'use client'

import { SelectInput, useField } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'

type Props = { options: string[] }

export const TextSelect: TextFieldClientComponent = (props) => {
  const { field, path, readOnly } = props
  const { options } = props as unknown as Props
  const { value, setValue } = useField<string>({ path })
  const values = value && !options.includes(value) ? [...options, value] : options

  return (
    <SelectInput
      description={field.admin?.description}
      isClearable={!field.required}
      label={field.label}
      name={field.name}
      onChange={(option) => !Array.isArray(option) && setValue(option ? String(option.value) : '')}
      options={values.map((option) => ({ label: option, value: option }))}
      path={path}
      readOnly={readOnly}
      required={field.required}
      value={value ?? ''}
    />
  )
}
