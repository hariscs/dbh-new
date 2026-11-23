'use client'

import { SelectInput, TextareaInput, TextInput, useField } from '@payloadcms/ui'
import type { JSONFieldClientComponent } from 'payload'
import type { ChangeEvent } from 'react'

type Seo = { title?: string; description?: string; canonical?: string; robots?: string }

const ROBOTS_OPTIONS = ['index, follow', 'index', 'noindex', 'noindex, follow', 'noindex, nofollow']

export const SeoForm: JSONFieldClientComponent = ({ path, readOnly }) => {
  const { value, setValue } = useField<Seo>({ path })
  const seo = value ?? {}
  const change = (key: keyof Seo, next: string) => setValue({ ...seo, [key]: next })
  const robots = seo.robots ?? ''
  const robotsOptions = robots && !ROBOTS_OPTIONS.includes(robots) ? [...ROBOTS_OPTIONS, robots] : ROBOTS_OPTIONS

  return (
    <div className="field-type">
      <h4>SEO</h4>
      <TextInput
        label="Meta title"
        onChange={(event: ChangeEvent<HTMLInputElement>) => change('title', event.target.value)}
        path={`${path}.title`}
        readOnly={readOnly}
        value={seo.title ?? ''}
      />
      <TextareaInput
        label="Meta description"
        onChange={(event) => change('description', event.target.value)}
        path={`${path}.description`}
        readOnly={readOnly}
        rows={3}
        value={seo.description ?? ''}
      />
      <TextInput
        description="Follows the page path automatically unless set to a custom URL"
        label="Canonical URL"
        onChange={(event: ChangeEvent<HTMLInputElement>) => change('canonical', event.target.value)}
        path={`${path}.canonical`}
        readOnly={readOnly}
        value={seo.canonical ?? ''}
      />
      <SelectInput
        label="Robots"
        name={`${path}.robots`}
        onChange={(option) => !Array.isArray(option) && option && change('robots', String(option.value))}
        options={robotsOptions.map((option) => ({ label: option, value: option }))}
        path={`${path}.robots`}
        readOnly={readOnly}
        value={robots}
      />
    </div>
  )
}
