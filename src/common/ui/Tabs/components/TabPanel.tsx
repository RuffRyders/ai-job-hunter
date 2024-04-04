'use client'

import { cn } from '@/common/utils/style/cn'
import { TabPanel as AriaTabPanel, TabPanelProps } from 'react-aria-components'

export function TabPanel({
  children,
  className = '',
  ...props
}: TabPanelProps) {
  return (
    <AriaTabPanel
      className={cn(`flex flex-col flex-1 gap-4 pt-2 ${className}`)}
      {...props}
    >
      {children}
    </AriaTabPanel>
  )
}
