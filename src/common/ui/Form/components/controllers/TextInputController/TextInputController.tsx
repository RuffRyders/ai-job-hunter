import { Control, Controller } from 'react-hook-form'
import { TextInput, TextInputProps } from '../../inputs/TextInput'
import { HTMLInputTypeAttribute } from 'react'

interface TextInputController extends TextInputProps {
  'aria-label'?: React.ComponentProps<'input'>['aria-label']
  control: Control<any>
  name: string
  label?: string
  type?: HTMLInputTypeAttribute
  placeholder?: string
  isRequired?: boolean
  autoFocus?: boolean
}

export function TextInputController({
  autoFocus,
  'aria-label': ariaLabel,
  control,
  name,
  label,
  type = 'text',
  placeholder,
  isRequired,
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
            isRequired={isRequired}
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
