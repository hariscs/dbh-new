import type { UIFieldServerComponent } from 'payload'

type Rule = { param: string; operator: string; value: string }

const PARAM_LABELS: Record<string, string> = {
  post_type: 'Post type',
  post_category: 'Category',
  post_taxonomy: 'Term',
  taxonomy: 'Taxonomy',
  nav_menu_item: 'Menu item',
  options_page: 'Options page',
}

export const FieldGroupRules: UIFieldServerComponent = async ({ data, payload }) => {
  const location = (data?.location ?? []) as Rule[][]
  const ruleGroups = await Promise.all(
    location.map((rules) =>
      Promise.all(
        rules.map(async (rule) => {
          const text = `${PARAM_LABELS[rule.param] ?? rule.param} ${rule.operator === '==' ? 'is' : 'is not'} ${rule.value || '(any)'}`
          if (rule.param !== 'post_type' || rule.operator !== '==') return { text }
          const { totalDocs } = await payload.count({ collection: 'pages', where: { postType: { equals: rule.value } } })
          return { text, href: `/admin/collections/pages?where[postType][equals]=${rule.value}`, count: totalDocs }
        }),
      ),
    ),
  )

  return (
    <div className="field-type">
      <h4>Applies to</h4>
      {ruleGroups.length === 0 && <p>Not shown on any page yet. Tick post types under Show on, then save.</p>}
      <ul>
        {ruleGroups.map((rules, index) => (
          <li key={index}>
            {index > 0 && <strong>or </strong>}
            {rules.map((rule, ruleIndex) => (
              <span key={ruleIndex}>
                {ruleIndex > 0 && <strong> and </strong>}
                {rule.text}
                {rule.href && (
                  <>
                    {' '}
                    (<a href={rule.href}>{rule.count} pages</a>)
                  </>
                )}
              </span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  )
}
