'use client'

import { useField } from '@payloadcms/ui'
import type { JSONFieldClientComponent } from 'payload'

import { PERMISSION_ACTIONS, PERMISSION_COLLECTIONS } from './labels'

type Permissions = Record<string, string[]>

const CELL = { padding: '6px 12px', borderBottom: '1px solid var(--theme-elevation-150)' }

export const PermissionsGrid: JSONFieldClientComponent = ({ path, readOnly }) => {
  const { value, setValue } = useField<Permissions>({ path })
  const permissions = value ?? {}

  const toggle = (collection: string, action: string, checked: boolean) => {
    const current = permissions[collection] ?? []
    const next = checked ? [...current, action] : current.filter((item) => item !== action)
    setValue({ ...permissions, [collection]: next })
  }

  return (
    <div className="field-type" style={{ marginBottom: 24 }}>
      <h4>Permissions</h4>
      <p style={{ opacity: 0.6 }}>
        View decides whether a section shows in the menu. Page forms can still read media, categories, field
        definitions and roles without it
      </p>
      <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ ...CELL, textAlign: 'left' }}>Section</th>
            {PERMISSION_ACTIONS.map((action) => (
              <th key={action.value} style={CELL}>
                {action.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PERMISSION_COLLECTIONS.map((collection) => (
            <tr key={collection.value}>
              <td style={CELL}>{collection.label}</td>
              {PERMISSION_ACTIONS.map((action) => (
                <td key={action.value} style={{ ...CELL, textAlign: 'center' }}>
                  <input
                    checked={(permissions[collection.value] ?? []).includes(action.value)}
                    disabled={readOnly}
                    onChange={(event) => toggle(collection.value, action.value, event.target.checked)}
                    type="checkbox"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
