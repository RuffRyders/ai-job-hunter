import format from 'string-format'

export function formatPrompt(
  template: string,
  ...args: (
    | string
    | {
        [k: string]: any
      }
  )[]
): string {
  return format(template, ...args)
}
