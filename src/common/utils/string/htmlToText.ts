import striptags from 'striptags'
import { convert as convertHtml } from 'html-to-text'

export function htmlToText(html: string) {
  striptags(
    convertHtml(html, {
      preserveNewlines: true,
      selectors: [{ selector: 'p', format: 'block' }],
    }),
    [],
    '\n',
  )
}
