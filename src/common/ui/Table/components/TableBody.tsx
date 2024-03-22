'use client'

import {
  TableBody as AriaTableBody,
  TableBodyProps,
} from 'react-aria-components'

export function TableBody<T extends object>({
  children,
  className = '',
  ...props
}: TableBodyProps<T>) {
  return <AriaTableBody {...props}>{children}</AriaTableBody>
}
