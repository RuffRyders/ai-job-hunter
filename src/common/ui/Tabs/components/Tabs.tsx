'use client'

import { cn } from '@/common/utils/style/cn'
import { Tabs as AriaTabs, TabsProps } from 'react-aria-components'

export function Tabs({ children, className = '', ...props }: TabsProps) {
  return (
    <AriaTabs className={cn(`flex flex-1 flex-col ${className}`)} {...props}>
      {children}
    </AriaTabs>
  )
}
