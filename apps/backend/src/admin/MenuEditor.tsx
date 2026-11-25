'use client'

import {
  Button,
  Collapsible,
  DraggableSortable,
  DraggableSortableItem,
  JSONField,
  SelectInput,
  TextareaInput,
  TextInput,
  useField,
  useFormFields,
} from '@payloadcms/ui'
import type { JSONFieldClientComponent } from 'payload'
import { type ChangeEvent, type MouseEvent, type ReactNode, useEffect, useState } from 'react'

type CardImage = { url: string; alt?: string; width?: number; height?: number; isPlaceholder?: boolean }
type FeaturedBlog = { id: number; title: string; href: string; excerpt: string; image: CardImage }
type Item = {
  id: number
  title: string
  url: string
  target: string
  parent: number
  depth: number
  classes: string[]
  children: Item[]
  featuredBlogs?: FeaturedBlog[]
  sectionHeading?: string
  cardStyle?: string
  showSidebar?: boolean
  cardImage?: CardImage | null
  cardExcerpt?: string
  startsColumn?: boolean
  columnHeading?: string
}
type PageDoc = { wpId: number; title: string; path: string; isFrontPage: boolean }
type MediaDoc = { filename: string; alt: string; width: number; height: number }

const MAX_DEPTH = 2
const HEADING_URL = '#'
const NEW_TAB = '_blank'
const MEDIA_PATH = '/wp-content/uploads/cms/'
const PLACEHOLDER_IMAGE = {
  url: 'https://cms.districtbehavioralhealth.com/wp-content/uploads/2026/01/featured-placeholder-bg.png',
  isPlaceholder: true,
}
const LEVEL_NAMES = ['Top menu tab', 'Section', 'Link']
const PRIMARY_LOCATION = 'primary'
const LINK_TYPES = [
  { value: 'heading', label: 'No link (heading)' },
  { value: 'page', label: 'Page' },
  { value: 'custom', label: 'Custom URL' },
]
const CARD_STYLES = [
  { value: 'image', label: 'Cards with image' },
  { value: 'columns', label: 'Columns' },
  { value: 'plain', label: 'Plain list' },
]
const DEPTH_DEFAULTS: Record<string, unknown>[] = [
  { featuredBlogs: [] },
  { sectionHeading: '', cardStyle: 'image', showSidebar: false },
  { cardImage: null, cardExcerpt: '', startsColumn: false, columnHeading: '' },
]

const hrefOf = (page: PageDoc) => (page.isFrontPage ? '/' : `${page.path}/`)
const mediaUrl = (filename: string) => `${window.location.origin}${MEDIA_PATH}${encodeURIComponent(filename)}`

const normalize = (items: Item[], flat: boolean, parent = 0, depth = 0): Item[] =>
  items.map((item) => ({
    ...item,
    parent,
    depth,
    children: normalize(item.children ?? [], flat, item.id, depth + 1),
    ...(flat ? {} : Object.fromEntries(Object.entries(DEPTH_DEFAULTS[depth] ?? {}).filter(([key]) => !(key in item)))),
  }))

const allItems = (items: Item[]): Item[] => items.flatMap((item) => [item, ...allItems(item.children)])
const height = (item: Item): number => (item.children.length ? 1 + Math.max(...item.children.map(height)) : 0)

const withSiblings = (items: Item[], parentId: number, change: (siblings: Item[]) => Item[]): Item[] =>
  parentId === 0
    ? change(items)
    : items.map((item) =>
        item.id === parentId
          ? { ...item, children: change(item.children) }
          : { ...item, children: withSiblings(item.children, parentId, change) },
      )

const updateItem = (items: Item[], id: number, patch: Partial<Item>): Item[] =>
  items.map((item) =>
    item.id === id ? { ...item, ...patch } : { ...item, children: updateItem(item.children, id, patch) },
  )

const removeItem = (items: Item[], id: number): Item[] =>
  items.filter((item) => item.id !== id).map((item) => ({ ...item, children: removeItem(item.children, id) }))

const stop = (event: MouseEvent) => event.stopPropagation()

const Row = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>{children}</div>
)

export const MenuEditor: JSONFieldClientComponent = (props) => {
  const { path, readOnly } = props
  const { value, setValue } = useField<Item[]>({ path })
  const location = useFormFields(([fields]) => fields.location?.value as string | undefined)
  const flat = location !== PRIMARY_LOCATION
  const maxDepth = flat ? 0 : MAX_DEPTH
  const levelName = (depth: number) => (flat ? 'Link' : LEVEL_NAMES[depth])
  const [pages, setPages] = useState<PageDoc[]>([])
  const [media, setMedia] = useState<MediaDoc[]>([])
  const [rawJson, setRawJson] = useState(false)

  useEffect(() => {
    fetch(
      '/api/pages?depth=0&pagination=false&sort=path&where[status][equals]=publish&select[wpId]=true&select[title]=true&select[path]=true&select[isFrontPage]=true',
      { credentials: 'include' },
    )
      .then((response) => response.json())
      .then(({ docs }: { docs: PageDoc[] }) => setPages(docs))
    fetch(
      '/api/media?depth=0&pagination=false&sort=-createdAt&select[filename]=true&select[alt]=true&select[width]=true&select[height]=true',
      { credentials: 'include' },
    )
      .then((response) => response.json())
      .then(({ docs }: { docs: MediaDoc[] }) => setMedia(docs))
  }, [])

  const jsonToggle = (
    <Button buttonStyle="secondary" onClick={() => setRawJson(!rawJson)} size="small">
      {rawJson ? 'Use menu editor' : 'Edit JSON'}
    </Button>
  )
  if (rawJson) return <div>{jsonToggle}<JSONField {...props} /></div>

  const tree = value ?? []
  const save = (next: Item[]) => setValue(normalize(next, flat))
  const pageByHref = new Map(pages.map((page) => [hrefOf(page), page]))
  const pageOptions = pages.map((page) => ({ label: `${page.title} — ${hrefOf(page)}`, value: hrefOf(page) }))

  const nextId = () => Math.max(0, ...allItems(tree).map((item) => item.id)) + 1
  const update = (id: number, patch: Partial<Item>) => save(updateItem(tree, id, patch))
  const add = (parentId: number) =>
    save(
      withSiblings(tree, parentId, (siblings) => [
        ...siblings,
        { id: nextId(), title: 'New item', url: HEADING_URL, target: '', parent: parentId, depth: 0, classes: [], children: [] },
      ]),
    )
  const remove = (item: Item) => {
    if (item.children.length && !window.confirm(`Delete "${item.title}" and its ${item.children.length} sub-items?`)) return
    save(removeItem(tree, item.id))
  }
  const reorder = (parentId: number, from: number, to: number) =>
    save(
      withSiblings(tree, parentId, (siblings) => {
        const next = [...siblings]
        const [moved] = next.splice(from, 1)
        next.splice(to, 0, moved)
        return next
      }),
    )
  const indent = (item: Item, siblings: Item[]) => {
    const index = siblings.findIndex((sibling) => sibling.id === item.id)
    const target = siblings[index - 1]
    if (!target) return
    if (item.depth + 1 + height(item) > MAX_DEPTH) return window.alert('Menus go 3 levels deep at most')
    save(
      withSiblings(removeItem(tree, item.id), item.parent, (current) =>
        current.map((sibling) => (sibling.id === target.id ? { ...sibling, children: [...sibling.children, item] } : sibling)),
      ),
    )
  }
  const outdent = (item: Item) => {
    const parent = allItems(tree).find((candidate) => candidate.id === item.parent)
    if (!parent) return
    save(
      withSiblings(removeItem(tree, item.id), parent.parent, (siblings) => {
        const index = siblings.findIndex((sibling) => sibling.id === parent.id)
        return [...siblings.slice(0, index + 1), item, ...siblings.slice(index + 1)]
      }),
    )
  }

  const linkType = (url: string) => (url === HEADING_URL ? 'heading' : pageByHref.has(url) ? 'page' : 'custom')

  const renderFields = (item: Item) => {
    const key = `${path}.${item.id}`
    const type = linkType(item.url)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Row>
          <TextInput
            label="Label"
            onChange={(event: ChangeEvent<HTMLInputElement>) => update(item.id, { title: event.target.value })}
            path={`${key}.title`}
            readOnly={readOnly}
            value={item.title}
          />
          <SelectInput
            label="Link to"
            name={`${key}.linkType`}
            onChange={(option) => {
              if (Array.isArray(option) || !option) return
              update(item.id, { url: option.value === 'heading' ? HEADING_URL : option.value === 'page' ? (pageOptions[0]?.value ?? '/') : 'https://' })
            }}
            options={LINK_TYPES}
            path={`${key}.linkType`}
            readOnly={readOnly}
            value={type}
          />
        </Row>
        {type === 'page' && (
          <SelectInput
            label="Page"
            name={`${key}.page`}
            onChange={(option) => !Array.isArray(option) && option && update(item.id, { url: String(option.value) })}
            options={pageOptions}
            path={`${key}.page`}
            readOnly={readOnly}
            value={item.url}
          />
        )}
        {type === 'custom' && (
          <TextInput
            label="URL"
            onChange={(event: ChangeEvent<HTMLInputElement>) => update(item.id, { url: event.target.value })}
            path={`${key}.url`}
            readOnly={readOnly}
            value={item.url}
          />
        )}
        {type !== 'heading' && (
          <label>
            <input
              checked={item.target === NEW_TAB}
              disabled={readOnly}
              onChange={(event) => update(item.id, { target: event.target.checked ? NEW_TAB : '' })}
              type="checkbox"
            />{' '}
            Open in a new tab
          </label>
        )}
        {!flat && item.depth === 0 && renderFeaturedBlogs(item)}
        {!flat && item.depth === 1 && (
          <Row>
            <TextInput
              label="Section heading"
              onChange={(event: ChangeEvent<HTMLInputElement>) => update(item.id, { sectionHeading: event.target.value })}
              path={`${key}.sectionHeading`}
              readOnly={readOnly}
              value={item.sectionHeading ?? ''}
            />
            <SelectInput
              label="Card style"
              name={`${key}.cardStyle`}
              onChange={(option) => !Array.isArray(option) && option && update(item.id, { cardStyle: String(option.value) })}
              options={CARD_STYLES}
              path={`${key}.cardStyle`}
              readOnly={readOnly}
              value={item.cardStyle ?? 'image'}
            />
            <label style={{ alignSelf: 'end' }}>
              <input
                checked={Boolean(item.showSidebar)}
                disabled={readOnly}
                onChange={(event) => update(item.id, { showSidebar: event.target.checked })}
                type="checkbox"
              />{' '}
              Show sidebar
            </label>
          </Row>
        )}
        {!flat && item.depth === 2 && renderCard(item)}
      </div>
    )
  }

  const renderFeaturedBlogs = (item: Item) => {
    const blogs = item.featuredBlogs ?? []
    return (
      <div>
        <strong>Featured blogs</strong>
        {blogs.map((blog) => (
          <div key={blog.id} style={{ display: 'flex', gap: 8, alignItems: 'center', margin: '4px 0' }}>
            <span style={{ flex: 1 }}>
              {blog.title} <small style={{ opacity: 0.6 }}>{blog.href}</small>
            </span>
            {!readOnly && (
              <Button
                buttonStyle="secondary"
                margin={false}
                onClick={() => update(item.id, { featuredBlogs: blogs.filter((other) => other.id !== blog.id) })}
                size="small"
              >
                Remove
              </Button>
            )}
          </div>
        ))}
        {!readOnly && (
          <SelectInput
            name={`${path}.${item.id}.addBlog`}
            onChange={(option) => {
              const page = !Array.isArray(option) && option ? pageByHref.get(String(option.value)) : undefined
              if (!page || blogs.some((blog) => blog.id === page.wpId)) return
              const blog = { id: page.wpId, title: page.title, href: hrefOf(page), excerpt: '', image: PLACEHOLDER_IMAGE }
              update(item.id, { featuredBlogs: [...blogs, blog] })
            }}
            options={pageOptions}
            path={`${path}.${item.id}.addBlog`}
            placeholder="Add a featured blog"
            value=""
          />
        )}
      </div>
    )
  }

  const renderCard = (item: Item) => {
    const key = `${path}.${item.id}`
    const image = item.cardImage
    return (
      <>
        <Row>
          <SelectInput
            label="Card image"
            name={`${key}.cardImage`}
            onChange={(option) => {
              if (Array.isArray(option)) return
              const chosen = media.find((doc) => mediaUrl(doc.filename) === option?.value)
              update(item.id, {
                cardImage: chosen
                  ? { url: mediaUrl(chosen.filename), alt: chosen.alt, width: chosen.width, height: chosen.height }
                  : null,
              })
            }}
            options={media.map((doc) => ({ label: `${doc.filename} (${doc.alt})`, value: mediaUrl(doc.filename) }))}
            path={`${key}.cardImage`}
            placeholder={image ? 'Replace with an image from Media' : 'Choose from Media'}
            readOnly={readOnly}
            value=""
          />
          {image && (
            <TextInput
              label="Image alt text"
              onChange={(event: ChangeEvent<HTMLInputElement>) => update(item.id, { cardImage: { ...image, alt: event.target.value } })}
              path={`${key}.cardImageAlt`}
              readOnly={readOnly}
              value={image.alt ?? ''}
            />
          )}
        </Row>
        {image && (
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <img alt="" src={image.url} style={{ maxHeight: 80 }} />
            {!readOnly && (
              <Button buttonStyle="secondary" margin={false} onClick={() => update(item.id, { cardImage: null })} size="small">
                Remove image
              </Button>
            )}
          </div>
        )}
        <TextareaInput
          label="Card text"
          onChange={(event) => update(item.id, { cardExcerpt: event.target.value })}
          path={`${key}.cardExcerpt`}
          readOnly={readOnly}
          rows={2}
          value={item.cardExcerpt ?? ''}
        />
        <Row>
          <label style={{ alignSelf: 'end' }}>
            <input
              checked={Boolean(item.startsColumn)}
              disabled={readOnly}
              onChange={(event) => update(item.id, { startsColumn: event.target.checked })}
              type="checkbox"
            />{' '}
            Starts a new column
          </label>
          <TextInput
            label="Column heading"
            onChange={(event: ChangeEvent<HTMLInputElement>) => update(item.id, { columnHeading: event.target.value })}
            path={`${key}.columnHeading`}
            readOnly={readOnly}
            value={item.columnHeading ?? ''}
          />
        </Row>
      </>
    )
  }

  const renderList = (items: Item[], parentId: number): ReactNode => (
    <DraggableSortable
      ids={items.map((item) => String(item.id))}
      onDragEnd={({ moveFromIndex, moveToIndex }) => reorder(parentId, moveFromIndex, moveToIndex)}
    >
      {items.map((item, index) => (
        <DraggableSortableItem disabled={readOnly} id={String(item.id)} key={item.id}>
          {({ attributes, listeners, setNodeRef, transform, transition }) => (
            <div ref={setNodeRef} style={{ transform, transition, marginBottom: 8 }}>
              <Collapsible
                actions={
                  !readOnly && (
                    <div onClick={stop} style={{ display: 'flex', gap: 4 }}>
                      {index > 0 && !flat && (
                        <Button buttonStyle="secondary" margin={false} onClick={() => indent(item, items)} size="small" tooltip="Move under the item above">
                          →
                        </Button>
                      )}
                      {item.depth > 0 && (
                        <Button buttonStyle="secondary" margin={false} onClick={() => outdent(item)} size="small" tooltip="Move up one level">
                          ←
                        </Button>
                      )}
                      <Button buttonStyle="secondary" margin={false} onClick={() => remove(item)} size="small">
                        Delete
                      </Button>
                    </div>
                  )
                }
                dragHandleProps={{ id: String(item.id), attributes, listeners }}
                header={
                  <span>
                    {item.title} <small style={{ opacity: 0.6 }}>{levelName(item.depth)} · {item.url}</small>
                  </span>
                }
                initCollapsed
              >
                {renderFields(item)}
                {item.depth < maxDepth && (
                  <div style={{ marginTop: 16, paddingLeft: 16, borderLeft: '2px solid var(--theme-elevation-150)' }}>
                    {renderList(item.children, item.id)}
                    {!readOnly && (
                      <Button buttonStyle="secondary" margin={false} onClick={() => add(item.id)} size="small">
                        + Add {LEVEL_NAMES[item.depth + 1]?.toLowerCase()}
                      </Button>
                    )}
                  </div>
                )}
              </Collapsible>
            </div>
          )}
        </DraggableSortableItem>
      ))}
    </DraggableSortable>
  )

  return (
    <div className="field-type menu-editor">
      <style>{'.menu-editor .collapsible__actions { width: auto; margin-inline-end: 12px; }'}</style>
      <h4>Menu items</h4>
      <p style={{ opacity: 0.6 }}>
        {flat
          ? 'Drag to reorder. Changes go live when you save'
          : 'Drag to reorder. → moves an item under the one above it, ← moves it up a level. Changes go live when you save'}
      </p>
      {renderList(tree, 0)}
      <div style={{ display: 'flex', gap: 8, marginTop: 12, alignItems: 'center' }}>
        {!readOnly && (
          <Button margin={false} onClick={() => add(0)} size="small">
            + Add {flat ? 'link' : 'top menu tab'}
          </Button>
        )}
        {jsonToggle}
      </div>
    </div>
  )
}
