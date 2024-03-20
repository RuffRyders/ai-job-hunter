export function textToHtml(str: string) {
  return str
    .split('\n')
    .map((line) => {
      if (line === '') {
        return null
      }
      return `<p>${line}</p>`
    })
    .filter(Boolean)
    .join('')
}
