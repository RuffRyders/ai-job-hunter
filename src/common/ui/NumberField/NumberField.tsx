'use client'

import { cn } from '@/common/utils/style/cn'
import { ForwardedRef, forwardRef } from 'react'
import {
  NumberField as AriaNumberField,
  NumberFieldProps as AriaNumberFieldProps,
} from 'react-aria-components'

export interface NumberFieldProps extends Omit<AriaNumberFieldProps, 'value'> {
  value?: number | null
}

export const NumberField = forwardRef(function NumberField(
  { children, className, value, ...rest }: NumberFieldProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <AriaNumberField
      className={cn(className, ['flex'])}
      value={value ?? undefined}
      ref={ref}
      {...rest}
    >
      {children}
    </AriaNumberField>
  )
})
