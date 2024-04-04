'use client'

import { cn } from '@/common/utils/style/cn'
import { Tab as AriaTab, TabProps } from 'react-aria-components'

export function Tab({ children, className = '', ...props }: TabProps) {
  return (
    <AriaTab
      className={cn(
        `p-2 selected:text-blue-500 border-b-4 border-transparent border-solid selected:border-blue-500 user-select-none cursor-pointer text-sm ${className}`,
      )}
      {...props}
    >
      {children}
    </AriaTab>
  )
}
