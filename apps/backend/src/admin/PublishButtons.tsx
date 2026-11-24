'use client'

import { FormSubmit, useDocumentInfo, useField, useForm } from '@payloadcms/ui'

const PUBLISH = 'publish'
const DRAFT = 'draft'

export const PublishButtons = () => {
  const { submit } = useForm()
  const { value: status, setValue } = useField<string>({ path: 'status' })
  const { id } = useDocumentInfo()
  const published = Boolean(id) && status === PUBLISH

  const save = (next: string) => {
    setValue(next)
    void submit({ overrides: { status: next } })
  }

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <FormSubmit buttonStyle="secondary" onClick={() => save(DRAFT)} size="medium" type="button">
        {published ? 'Switch to draft' : 'Save draft'}
      </FormSubmit>
      <FormSubmit onClick={() => save(PUBLISH)} size="medium" type="button">
        {published ? 'Update' : 'Publish'}
      </FormSubmit>
    </div>
  )
}
