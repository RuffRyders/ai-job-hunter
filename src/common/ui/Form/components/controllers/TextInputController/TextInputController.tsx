import { Control, Controller } from 'react-hook-form'
import { TextInput } from '../../inputs/TextInput'
import { HTMLInputTypeAttribute } from 'react'

interface TextInputController {
  ariaLabel?: string
  control: Control<any>
  name: string
  label?: string
  type?: HTMLInputTypeAttribute
  placeholder?: string
  autoFocus?: boolean
}

export function TextInputController({
  autoFocus,
  ariaLabel,
  control,
  name,
  label,
  type = 'text',
  placeholder,
}: TextInputController) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <TextInput
            autoFocus={autoFocus}
            ariaLabel={ariaLabel || name}
            label={label}
            type={type}
            placeholder={placeholder}
            {...field}
          />
        )
      }}
    />
  )
}
