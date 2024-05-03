'use client'

import { FieldError, Group } from 'react-aria-components'
import { Label } from '@/common/ui/Label'
import { NumberField, NumberFieldProps } from '@/common/ui/NumberField'
import { Input } from '@/common/ui/Input'
import { ForwardedRef, forwardRef } from 'react'

interface NumberInputProps extends NumberFieldProps {
  label: string
  error?: { message: string }
}

export const NumberInput = forwardRef(function NumberInput(
  { label, error, ...rest }: NumberInputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <NumberField
      ref={ref}
      minValue={0}
      className="flex flex-1 flex-col gap-2"
      {...rest}
    >
      {label && <Label>{label}</Label>}
      <Group className="flex flex-1">
        <Input />
      </Group>
      <FieldError>{error?.message}</FieldError>
    </NumberField>
  )
})
