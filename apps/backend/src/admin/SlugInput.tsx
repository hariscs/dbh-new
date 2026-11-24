'use client'

import { TextInput, useDocumentInfo, useField, useFormFields } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'
import { type ChangeEvent, useEffect, useState } from 'react'

const slugify = (title: string) =>
  title
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s-]+/g, '-')
    .replace(/^-|-$/g, '')

export const SlugInput: TextFieldClientComponent = ({ field, path, readOnly }) => {
  const { id } = useDocumentInfo()
  const { value, setValue } = useField<string>({ path })
  const title = useFormFields(([fields]) => fields.title?.value as string | undefined)
  const [edited, setEdited] = useState(Boolean(id))

  useEffect(() => {
    if (!edited) setValue(slugify(title ?? ''))
  }, [title, edited])

  return (
    <TextInput
      description={field.admin?.description}
      label={field.label}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        setEdited(true)
        setValue(event.target.value)
      }}
      path={path}
      readOnly={readOnly}
      required={field.required}
      value={value ?? ''}
    />
  )
}
