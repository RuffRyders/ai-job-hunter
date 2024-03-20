import {
  SearchField,
  Input,
  Button,
  InputProps,
  SearchFieldProps,
} from 'react-aria-components'
import { IconSearch } from '@tabler/icons-react'

type SearchInputProps = Pick<InputProps, 'placeholder'> &
  Pick<SearchFieldProps, 'className'>

export function SearchInput({ className, placeholder }: SearchInputProps) {
  return (
    <SearchField
      className={`flex gap-1 items-center border border-slate-300 border-solid text-sm rounded-full ${className} px-4`}
    >
      <IconSearch stroke={3} />
      <Input
        placeholder={placeholder}
        className="appearance-none outline-none py-3 text-normal"
      />
      <Button className="pr-2">✕</Button>
    </SearchField>
  )
}
