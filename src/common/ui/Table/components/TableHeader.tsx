'use client'

import {
  TableHeader as AriaTableHeader,
  TableHeaderProps,
} from 'react-aria-components'

export function TableHeader<T extends object>({
  children,
  className = '',
  ...props
}: TableHeaderProps<T>) {
  return (
    <AriaTableHeader
      className={`text-xs text-gray-700 bg-gray-50 ${className}`}
      {...props}
    >
      {children}
    </AriaTableHeader>
  )
}
