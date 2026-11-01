import hljs from 'highlight.js/lib/common'
import MarkdownIt from 'markdown-it'

// ponytail: common set only; hljs.registerLanguage if a post needs a language outside it
const markdown = new MarkdownIt({
  html: false,
  highlight(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang, ignoreIllegals: true }).value
    }
    return ''
  },
})

export function renderMarkdown(source: string): string {
  return markdown.render(source)
}
