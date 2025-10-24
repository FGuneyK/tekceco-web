// src/lib/renderLexical.ts
export function renderLexicalContent(content: any): string {
  if (!content) return ''

  // Eğer content zaten HTML string ise
  if (typeof content === 'string') return content

  // Eğer array ise (Lexical block yapısı)
  if (Array.isArray(content)) {
    return content
      .map((block) => {
        switch (block.type) {
          case 'paragraph':
            return `<p>${renderChildren(block.children)}</p>`

          case 'heading': {
            const Tag = `h${block.tag || 2}`
            return `<${Tag}>${renderChildren(block.children)}</${Tag}>`
          }

          case 'quote':
            return `<blockquote>${renderChildren(block.children)}</blockquote>`

          case 'list': {
            const listTag = block.listType === 'ordered' ? 'ol' : 'ul'
            const items =
              block.children
                ?.map((item: any) => `<li>${renderChildren(item.children)}</li>`)
                .join('') || ''
            return `<${listTag}>${items}</${listTag}>`
          }

          case 'code':
            return `<pre><code>${escapeHTML(block.text || '')}</code></pre>`

          case 'linebreak':
            return '<br />'

          default:
            return renderChildren(block.children)
        }
      })
      .join('')
  }

  // Fallback: JSON stringify
  return JSON.stringify(content)
}

// 🔹 Alt çocukları işler
function renderChildren(children: any[]): string {
  if (!children) return ''

  return children
    .map((child) => {
      if (child.text) {
        let text = escapeHTML(child.text)

        if (child.bold) text = `<strong>${text}</strong>`
        if (child.italic) text = `<em>${text}</em>`
        if (child.underline) text = `<u>${text}</u>`

        return text
      }

      if (child.type === 'link') {
        const url = child.fields?.url || '#'
        const target = child.fields?.newTab ? '_blank' : '_self'
        return `<a href="${url}" target="${target}" rel="noopener noreferrer">${renderChildren(
          child.children,
        )}</a>`
      }

      if (child.children) return renderChildren(child.children)

      return ''
    })
    .join('')
}

// 🔹 Basit HTML escape
function escapeHTML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
