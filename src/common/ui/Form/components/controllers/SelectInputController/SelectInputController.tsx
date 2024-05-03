import { Control, Controller, ControllerRenderProps } from 'react-hook-form'
import { Label } from '@/common/ui/Label'
import { Select, SelectOption } from '@/common/ui/Select'
import { SelectProps } from '@/common/ui/Select/Select'

type Item = {
  [key: string]: any
  value: string
}

interface SelectInputControllerProps<T extends Item>
  extends Omit<SelectProps<T>, 'children'> {
  name: string
  control: Control<any>
  items: T[]
}

export function SelectInputController<T extends Item>({
  'aria-label': ariaLabel,
  name,
  control,
  label,
  isRequired,
  items = [],
  ...rest
}: SelectInputControllerProps<T>) {
  const renderSelectInput = ({ field }: { field: ControllerRenderProps }) => {
    return (
      <div>
        {label && <Label isRequired={isRequired}>{label}</Label>}
        <Select
          {...rest}
          {...field}
          className="w-48"
          items={[{ value: '', name: 'select one' }, ...items]}
          selectedKey={field.value}
          aria-label={ariaLabel || name}
          onSelectionChange={field.onChange}
        >
          {(item: any) => (
            <SelectOption id={item.value}>{item.name}</SelectOption>
          )}
        </Select>
      </div>
    )
  }
  return <Controller name={name} control={control} render={renderSelectInput} />
}
