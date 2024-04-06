'use client'

import { cn } from '@/common/utils/style/cn'
import React from 'react'
import {
  Input as AriaInput,
  InputProps as AriaInputProps,
} from 'react-aria-components'

interface InputProps extends AriaInputProps {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ children, className, ...rest }: InputProps, ref) => {
    return (
      <AriaInput
        ref={ref}
        className={cn(
          'flex-1 p-2 border border-gray-300 border-solid rounded-lg',
          className,
        )}
        {...rest}
      >
        {children}
      </AriaInput>
    )
  },
)

Input.displayName = 'Input'
