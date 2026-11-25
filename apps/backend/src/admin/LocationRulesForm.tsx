'use client'

import { useField } from '@payloadcms/ui'
import type { JSONFieldClientComponent } from 'payload'

import { POST_TYPES } from './labels'

type Rule = { param: string; operator: string; value: string }

const POST_TYPE_PARAM = 'post_type'
const EQUALS = '=='

export const LocationRulesForm: JSONFieldClientComponent = ({ path, readOnly }) => {
  const { value, setValue } = useField<Rule[][]>({ path })
  const location = value ?? []
  const simple = location.every((rules) => rules.length === 1 && rules[0].param === POST_TYPE_PARAM && rules[0].operator === EQUALS)
  const selected = new Set(location.map((rules) => rules[0]?.value))

  const toggle = (postType: string, checked: boolean) => {
    const next = POST_TYPES.map((type) => type.value).filter((type) => (type === postType ? checked : selected.has(type)))
    setValue(next.map((type) => [{ param: POST_TYPE_PARAM, operator: EQUALS, value: type }]))
  }

  return (
    <div className="field-type" style={{ marginBottom: 24 }}>
      <h4>Show on</h4>
      {simple ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          {POST_TYPES.map((type) => (
            <label key={type.value}>
              <input
                checked={selected.has(type.value)}
                disabled={readOnly}
                onChange={(event) => toggle(type.value, event.target.checked)}
                type="checkbox"
              />{' '}
              {type.plural}
            </label>
          ))}
        </div>
      ) : (
        <p style={{ opacity: 0.6 }}>This group uses ACF rules beyond post types (see "Applies to" above). Ask a developer to change them</p>
      )}
    </div>
  )
}
