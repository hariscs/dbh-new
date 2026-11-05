const NO_TEXTURIZE_TAGS = ['pre', 'code', 'kbd', 'style', 'script', 'tt']

const texturizeText = (text: string) =>
  text
    .replace(/---/g, '—')
    .replace(/ -- /g, ' — ')
    .replace(/--/g, '–')
    .replace(/(^|\s)-(?=\s|$)/g, '$1–')
    .replace(/\.\.\./g, '…')
    .replace(/``/g, '“')
    .replace(/''/g, '”')
    .replace(/'(?=\d\d(?:’|')?s)/g, '’')
    .replace(/(^|[([{"\-\s]|&lt;)'/g, '$1‘')
    .replace(/(?<!\s)'(?!$|[.,:;!?"'(){}[\]\-\s]|&[lg]t;)/g, '’')
    .replace(/(^|[([{\-\s]|&lt;)"(?!\s)/g, '$1“')
    .replace(/"/g, '”')
    .replace(/'/g, '’')

// Port of WordPress wptexturize(): text outside tags and shortcodes only, skipping code-like elements.
export const wptexturize = (html: string) => {
  const openSkips: string[] = []
  return html
    .split(/(<[^>]*>|\[[^\]]*\])/)
    .map((part) => {
      if (part.startsWith('[')) return part
      const tag = /^<(\/)?([a-z0-9]+)/i.exec(part)
      if (tag) {
        const name = tag[2].toLowerCase()
        if (NO_TEXTURIZE_TAGS.includes(name)) {
          if (tag[1]) openSkips.pop()
          else if (!part.endsWith('/>')) openSkips.push(name)
        }
        return part
      }
      return openSkips.length ? part : texturizeText(part)
    })
    .join('')
}

const TITLE_ENTITIES: Record<string, string> = {
  '‘': '&#8216;',
  '’': '&#8217;',
  '“': '&#8220;',
  '”': '&#8221;',
  '–': '&#8211;',
  '—': '&#8212;',
  '…': '&#8230;',
}

export const renderTitle = (title: string) =>
  wptexturize(title)
    .trim()
    .replace(/[‘’“”–—…]/g, (char) => TITLE_ENTITIES[char])
    .replace(/&(?!#?\w+;)/g, '&#038;')

const ALL_BLOCKS =
  '(?:table|thead|tfoot|caption|col|colgroup|tbody|tr|td|th|div|dl|dd|dt|ul|ol|li|pre|form|map|area|blockquote|address|style|p|h[1-6]|hr|fieldset|legend|section|article|aside|hgroup|header|footer|nav|figure|figcaption|details|menu|summary)'

// Port of WordPress wpautop() with $br = true.
export const wpautop = (input: string) => {
  if (input.trim() === '') return ''

  const preTags: string[] = []
  let text = `${input}\n`
  if (text.includes('<pre')) {
    text = text.replace(/<pre[\s\S]*?<\/pre>/g, (block) => {
      preTags.push(block)
      return `<pre wp-pre-tag-${preTags.length - 1}></pre>`
    })
  }

  text = text
    .replace(/<br\s*\/?>\s*<br\s*\/?>/g, '\n\n')
    .replace(new RegExp(`(<${ALL_BLOCKS}[\\s/>])`, 'g'), '\n\n$1')
    .replace(new RegExp(`(</${ALL_BLOCKS}>)`, 'g'), '$1\n\n')
    .replace(/(<hr\s*?\/?>)/g, '$1\n\n')
    .replace(/\r\n|\r/g, '\n')
    .replace(/<[^>]*>/g, (tag) => tag.replace(/\n/g, ' <!-- wpnl --> '))

  if (text.includes('<figcaption')) {
    text = text.replace(/\s*(<figcaption[^>]*>)/g, '$1').replace(/<\/figcaption>\s*/g, '</figcaption>')
  }

  text = text
    .replace(/\n\n+/g, '\n\n')
    .split(/\n[ \t\n\r\f\v]*\n/)
    .filter((paragraph) => paragraph !== '')
    .map((paragraph) => `<p>${paragraph.replace(/^\n+|\n+$/g, '')}</p>\n`)
    .join('')

  text = text
    .replace(/<p>[ \t\n\r\f\v]*<\/p>/g, '')
    .replace(/<p>([^<]+)<\/(div|address|form)>/g, '<p>$1</p></$2>')
    .replace(new RegExp(`<p>[ \\t\\n\\r\\f\\v]*(</?${ALL_BLOCKS}[^>]*>)[ \\t\\n\\r\\f\\v]*</p>`, 'g'), '$1')
    .replace(/<p>(<li.+?)<\/p>/g, '$1')
    .replace(/<p><blockquote([^>]*)>/gi, '<blockquote$1><p>')
    .replace(/<\/blockquote><\/p>/g, '</p></blockquote>')
    .replace(new RegExp(`<p>[ \\t\\n\\r\\f\\v]*(</?${ALL_BLOCKS}[^>]*>)`, 'g'), '$1')
    .replace(new RegExp(`(</?${ALL_BLOCKS}[^>]*>)[ \\t\\n\\r\\f\\v]*</p>`, 'g'), '$1')
    .replace(/<(script|style|svg|math)[\s\S]*?<\/\1>/g, (block) => block.replace(/\n/g, '<WPPreserveNewline />'))
    .replace(/<br>|<br\/>/g, '<br />')
    .replace(/(?<!<br \/>)[ \t\n\r\f\v]*\n/g, '<br />\n')
    .replace(/<WPPreserveNewline \/>/g, '\n')
    .replace(new RegExp(`(</?${ALL_BLOCKS}[^>]*>)[ \\t\\n\\r\\f\\v]*<br />`, 'g'), '$1')
    .replace(/<br \/>([ \t\n\r\f\v]*<\/?(?:p|li|div|dl|dd|dt|th|pre|td|ul|ol)[^>]*>)/g, '$1')
    .replace(/\n<\/p>(?=\n?$)/, '</p>')

  if (preTags.length) text = text.replace(/<pre wp-pre-tag-(\d+)><\/pre>/g, (_, index: string) => preTags[Number(index)])
  return text.replace(/ <!-- wpnl --> |<!-- wpnl -->/g, '\n')
}

const SHORTCODE = /\[(acf|nav_glbl_var)\b([^\]]*)\]/g

const shortcodeUnautop = (html: string) => html.replace(/<p>\s*(\[(?:acf|nav_glbl_var)\b[^\]]*\])\s*<\/p>/g, '$1')

// [acf] renders empty through the REST API (no global post); [nav_glbl_var] is the Nav Global Variables plugin.
const doShortcode = (html: string, globals: Map<string, string>) =>
  html.replace(SHORTCODE, (_, tag: string, attributes: string) => {
    if (tag === 'acf') return ''
    const name = /name\s*=\s*["']?([^"'\s\]]+)/.exec(attributes)?.[1] ?? ''
    return globals.get(name) ?? ''
  })

// ACF's acf_the_content filter chain for wysiwyg fields, in WordPress priority order.
export const formatWysiwyg = (html: string, globals: Map<string, string>) =>
  doShortcode(shortcodeUnautop(wpautop(wptexturize(html))), globals)
