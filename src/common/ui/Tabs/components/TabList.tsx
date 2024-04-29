'use client'

import { cn } from '@/common/utils/style/cn'
import { TabList as AriaTabList, TabListProps } from 'react-aria-components'

export function TabList<T extends object>({
  children,
  className = '',
  ...props
}: TabListProps<T>) {
  return (
    <AriaTabList className={cn(`flex flex-1 gap-1 ${className}`)} {...props}>
      {children}
    </AriaTabList>
  )
}
