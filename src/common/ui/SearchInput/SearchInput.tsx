'use client'

import {
  SearchField,
  Input,
  Button,
  InputProps,
  SearchFieldProps,
} from 'react-aria-components'
import { IconSearch, IconX } from '@tabler/icons-react'
import { useCallback, useState } from 'react'

type SearchInputProps = Pick<InputProps, 'placeholder'> & SearchFieldProps

export function SearchInput({
  className,
  placeholder,
  onChange,
  onClear,
  value: initialValue,
  ...rest
}: SearchInputProps) {
  const [value, setValue] = useState(initialValue)
  const handleChange = useCallback(
    (value: string) => {
      setValue(value)
      onChange?.(value)
    },
    [setValue, onChange],
  )
  const handleClear = useCallback(() => {
    setValue('')
    onClear?.()
  }, [setValue, onClear])
  return (
    <SearchField
      className={`flex gap-1 items-center border border-gray-200 border-solid text-sm rounded-full ${className} px-4`}
      value={value}
      onChange={handleChange}
      onClear={handleClear}
      {...rest}
    >
      <IconSearch stroke={3} size={18} />
      <Input
        placeholder={placeholder}
        className="appearance-none outline-none py-3 text-normal"
      />
      <Button className="pr-2">
        <IconX size={16} />
      </Button>
    </SearchField>
  )
}
