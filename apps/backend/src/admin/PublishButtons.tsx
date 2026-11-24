'use client'

import { FormSubmit, useAuth, useDocumentInfo, useField, useForm } from '@payloadcms/ui'

import type { User } from '../payload-types'

const PUBLISH = 'publish'
const DRAFT = 'draft'

export const PublishButtons = () => {
  const { submit } = useForm()
  const { value: status, setValue } = useField<string>({ path: 'status' })
  const { id } = useDocumentInfo()
  const published = Boolean(id) && status === PUBLISH
  const { user } = useAuth<User>()
  const canPublish = (user?.roles ?? []).some((role) => typeof role === 'object' && (role.fullAccess || role.canPublish))

  const save = (next: string) => {
    setValue(next)
    void submit({ overrides: { status: next } })
  }

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <FormSubmit buttonStyle="secondary" onClick={() => save(DRAFT)} size="medium" type="button">
        {published ? 'Switch to draft' : 'Save draft'}
      </FormSubmit>
      {(published || canPublish) && (
        <FormSubmit onClick={() => save(PUBLISH)} size="medium" type="button">
          {published ? 'Update' : 'Publish'}
        </FormSubmit>
      )}
    </div>
  )
}
