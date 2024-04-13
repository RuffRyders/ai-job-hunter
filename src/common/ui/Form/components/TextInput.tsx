import { Input } from '../../Input'
import { Label } from '../../Label'
import { TextField } from '../../TextField'

export function TextInput({
  ariaLabel,
  autoFocus,
  label,
  placeholder,
  ...rest
}: {
  ariaLabel?: string
  autoFocus?: boolean
  label?: string
  placeholder?: string
}) {
  return (
    <TextField aria-label={ariaLabel} autoFocus={autoFocus}>
      {label && <Label className="text-xs font-bold">{label}</Label>}
      <Input
        className="flex-1 border border-gray-300 border-solid p-2"
        placeholder={placeholder}
        {...rest}
      />
    </TextField>
  )
}
