'use client'

import {
  TextField as AriaTextField,
  TextFieldProps,
} from 'react-aria-components'
import { cn } from '@/common/utils/style/cn'

interface TextField<T extends object> {
  children: React.ReactNode | ((item: T) => React.ReactNode)
  className: string
}

export function TextField({ children, className, ...rest }: TextFieldProps) {
  return (
    <AriaTextField
      className={cn('flex flex-1 flex-col gap-2', className)}
      {...rest}
    >
      {children}
    </AriaTextField>
  )
}
