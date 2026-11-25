export const POST_TYPES = [
  { value: 'page', label: 'Page', plural: 'Pages' },
  { value: 'authors', label: 'Author', plural: 'Authors' },
  { value: 'facility', label: 'Facility', plural: 'Facilities' },
  { value: 'newsroom', label: 'Newsroom post', plural: 'Newsroom' },
  { value: 'difference', label: 'Difference', plural: 'Differences' },
  { value: 'testimonials', label: 'Testimonial', plural: 'Testimonials' },
  { value: 'external_post', label: 'External post', plural: 'External posts' },
  { value: 'post', label: 'Post', plural: 'Posts' },
]

export const STATUSES = [
  { value: 'publish', label: 'Published' },
  { value: 'draft', label: 'Draft' },
]

export const TAXONOMIES = [
  { value: 'geo', label: 'Location (geo)' },
  { value: 'template', label: 'Template' },
  { value: 'topic', label: 'Topic' },
  { value: 'topic-2', label: 'Topic 2' },
  { value: 'intent', label: 'Intent' },
  { value: 'marketing-channel', label: 'Marketing channel' },
  { value: 'category', label: 'Category' },
  { value: 'business-unit', label: 'Business unit' },
  { value: 'facility-type', label: 'Facility type' },
  { value: 'newsroom-category', label: 'Newsroom category' },
]

export const PERMISSION_COLLECTIONS = [
  { value: 'pages', label: 'All content' },
  { value: 'media', label: 'Media' },
  { value: 'terms', label: 'Categories & Tags' },
  { value: 'menus', label: 'Menus' },
  { value: 'global-variables', label: 'Site Variables' },
  { value: 'sheet-imports', label: 'Import from Sheet' },
  { value: 'field-groups', label: 'Custom Fields (ACF)' },
  { value: 'interlinking-rules', label: 'Interlinking Rules' },
  { value: 'redirects', label: 'Redirects' },
  { value: 'users', label: 'Users' },
  { value: 'roles', label: 'Roles' },
  { value: 'activity-log', label: 'Activity log (view only)' },
]

export const PERMISSION_ACTIONS = [
  { value: 'read', label: 'View' },
  { value: 'create', label: 'Create' },
  { value: 'update', label: 'Edit' },
  { value: 'delete', label: 'Delete' },
]

export type FieldDefinition = {
  key: string
  name: string
  label: string
  type?: string
  required?: boolean
  instructions?: string
  defaultValue?: string
  choices?: { value: string; label: string }[]
  multiple?: boolean
  minLength?: number
  maxLength?: number
  pattern?: string
  patternMessage?: string
}

export const FIELD_TYPES = [
  { value: 'text', label: 'Text' },
  { value: 'textarea', label: 'Text area' },
  { value: 'wysiwyg', label: 'Rich text (HTML)' },
  { value: 'email', label: 'Email' },
  { value: 'url', label: 'URL' },
  { value: 'number', label: 'Number' },
  { value: 'select', label: 'Select / multi-select' },
  { value: 'page_link', label: 'Page link' },
  { value: 'image', label: 'Image' },
  { value: 'true_false', label: 'True / false' },
]
