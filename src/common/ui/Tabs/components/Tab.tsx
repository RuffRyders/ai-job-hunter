'use client'

import { cn } from '@/common/utils/style/cn'
import { Tab as AriaTab, TabProps } from 'react-aria-components'

export function Tab({ children, className = '', ...props }: TabProps) {
  return (
    <AriaTab
      className={cn(
        `px-4 py-2 self-center hover:bg-gray-200 selected:text-white selected:bg-primary-500 rounded-full user-select-none cursor-pointer text-sm ${className}`,
      )}
      {...props}
    >
      {children}
    </AriaTab>
  )
}
