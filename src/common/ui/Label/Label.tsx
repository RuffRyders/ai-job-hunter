'use client'

import { cn } from '@/common/utils/style/cn'
import { Label as AriaLabel, LabelProps } from 'react-aria-components'

export function Label({ children, className, ...rest }: LabelProps) {
  return (
    <AriaLabel className={cn('text-xs font-bold', className)} {...rest}>
      {children}
    </AriaLabel>
  )
}
