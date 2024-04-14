'use client'

import { Table as AriaTable, TableProps } from 'react-aria-components'

export function Table({ children, className = '', ...props }: TableProps) {
  return (
    <AriaTable
      className={`w-full text-sm text-left rtl:text-right text-gray-700 ${className}`}
      {...props}
    >
      {children}
    </AriaTable>
  )
}
