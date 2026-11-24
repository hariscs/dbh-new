'use client'

import { FieldDescription, FieldLabel, useField } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'

const SECONDS = ':00'
const MINUTE_PRECISION = 16

const toWpDate = (value: string) => {
  const date = value.replace('T', ' ')
  return date.length === MINUTE_PRECISION ? `${date}${SECONDS}` : date
}

export const PostDateInput: TextFieldClientComponent = ({ field, path, readOnly }) => {
  const { value, setValue } = useField<string>({ path })

  return (
    <div className="field-type text">
      <FieldLabel label={field.label} path={path} />
      <div className="field-type__wrap">
        <input
          disabled={readOnly}
          onChange={(event) => setValue(toWpDate(event.target.value))}
          step={1}
          type="datetime-local"
          value={(value ?? '').replace(' ', 'T')}
        />
      </div>
      <FieldDescription description={field.admin?.description} path={path} />
    </div>
  )
}
