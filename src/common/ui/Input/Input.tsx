'use client'

import { cn } from '@/common/utils/style/cn'
import {
  Input as AriaInput,
  InputProps as AriaInputProps,
} from 'react-aria-components'

interface ButtonProps extends AriaInputProps {}

export function Input({ children, className, ...rest }: ButtonProps) {
  return (
    <AriaInput
      className={cn('flex-1 p-2 border rounded-lg', className)}
      {...rest}
    >
      {children}
    </AriaInput>
  )
}
