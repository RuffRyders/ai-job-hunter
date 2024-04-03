'use client'

import { cn } from '@/common/utils/style/cn'
import {
  NumberField as AriaNumberField,
  NumberFieldProps as AriaNumberFieldProps,
} from 'react-aria-components'

interface NumberFieldProps extends Omit<AriaNumberFieldProps, 'value'> {
  value?: number | null
}

export function NumberField({
  children,
  className,
  value,
  ...rest
}: NumberFieldProps) {
  return (
    <AriaNumberField
      className={cn(className, ['flex'])}
      value={value ?? undefined}
      {...rest}
    >
      {children}
    </AriaNumberField>
  )
}
