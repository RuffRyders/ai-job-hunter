'use client'

import {
  SearchField,
  Input,
  Button,
  InputProps,
  SearchFieldProps,
} from 'react-aria-components'
import { IconSearch, IconX } from '@tabler/icons-react'

type SearchInputProps = Pick<InputProps, 'placeholder'> &
  Pick<SearchFieldProps, 'className'>

export function SearchInput({
  className,
  placeholder,
  ...rest
}: SearchInputProps) {
  return (
    <SearchField
      className={`flex gap-1 items-center border border-gray-200 border-solid text-sm rounded-full ${className} px-4`}
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
