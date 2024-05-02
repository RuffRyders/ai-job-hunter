import { Input } from '@/common/ui/Input'
import { Label } from '@/common/ui/Label'
import { TextField } from '@/common/ui/TextField'
import { ForwardedRef, HTMLInputTypeAttribute, forwardRef } from 'react'

export const TextInput = forwardRef(function TextInput(
  {
    ariaLabel,
    autoFocus,
    className,
    label,
    type,
    placeholder,
    ...rest
  }: {
    ariaLabel?: string
    autoFocus?: boolean
    label?: string
    type?: HTMLInputTypeAttribute
    placeholder?: string
    className?: string
  },
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <TextField
      aria-label={ariaLabel}
      autoFocus={autoFocus}
      className={className}
    >
      {label && <Label className="text-xs font-bold">{label}</Label>}
      <Input
        ref={ref}
        type={type}
        className="flex-1 border border-gray-300 border-solid p-2"
        placeholder={placeholder}
        {...rest}
      />
    </TextField>
  )
})
