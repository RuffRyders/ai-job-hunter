import { Input } from '@/common/ui/Input'
import { Label } from '@/common/ui/Label'
import { TextField } from '@/common/ui/TextField'
import { ForwardedRef, HTMLInputTypeAttribute, forwardRef } from 'react'
import { InputProps } from 'react-aria-components'

export interface TextInputProps extends InputProps {
  ariaLabel?: string
  autoFocus?: boolean
  label?: string
  type?: HTMLInputTypeAttribute
  placeholder?: string
  className?: string
  isRequired?: boolean
}

export const TextInput = forwardRef(function TextInput(
  {
    ariaLabel,
    autoFocus,
    className,
    label,
    type,
    placeholder,
    isRequired,
    ...rest
  }: TextInputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <TextField
      aria-label={ariaLabel}
      autoFocus={autoFocus}
      className={className}
      isRequired={isRequired}
    >
      {label && <Label isRequired={isRequired}>{label}</Label>}
      <Input
        ref={ref}
        type={type}
        className="flex-1 border border-gray-300 border-solid p-2"
        placeholder={placeholder}
        required={isRequired}
        {...rest}
      />
    </TextField>
  )
})
