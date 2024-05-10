'use client'

import { cn } from '@/common/utils/style/cn'
import {
  Label as AriaLabel,
  LabelProps as AriaLabelProps,
} from 'react-aria-components'

interface LabelProps extends AriaLabelProps {
  isRequired?: boolean
}

export function Label({
  children,
  isRequired,
  className,
  ...rest
}: LabelProps) {
  return (
    <AriaLabel className={cn('text-xs font-bold', className)} {...rest}>
      {children} {isRequired && <span className="text-red-600">*</span>}
    </AriaLabel>
  )
}
