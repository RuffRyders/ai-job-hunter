import { twMerge } from 'tailwind-merge'
import clsx, { ClassValue } from 'clsx'

// https://github.com/dcastil/tailwind-merge/blob/v2.2.2/docs/what-is-it-for.md
/**
 * Handy utility to make className usage more convenient. See readme for examples and usage.
 */
export function cn(...classes: ClassValue[]): string {
  return twMerge(clsx(classes))
}

// Examples:
// conditional classes/styles
// <button
//   onClick={() => editor.chain().focus().toggleCode().run()}
//   disabled={!editor.can().chain().focus().toggleCode().run()}
//   className={cn(styles.menuButton, {
//     [styles['menuButton--active']]: true,
//     'm-4': false,
//   })}
// >
// code
// </button>
