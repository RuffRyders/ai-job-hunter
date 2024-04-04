'use client'

import { IconChevronDown } from '@tabler/icons-react'
import {
  Button,
  ListBox,
  Popover,
  Select as AriaSelect,
  SelectValue,
  SelectProps as AriaSelectProps,
  ListBoxItem,
  ListBoxItemProps,
} from 'react-aria-components'

interface SelectProps<T extends object>
  extends Omit<AriaSelectProps<T>, 'children'> {
  items?: Iterable<T>
  children: React.ReactNode | ((item: T) => React.ReactNode)
}

export function SelectOption({ children, ...rest }: ListBoxItemProps) {
  return (
    <ListBoxItem
      className="p-1 rounded cursor-pointer focus:outline focus:outline-2 focus:outline-blue-500"
      {...rest}
    >
      {children}
    </ListBoxItem>
  )
}

export function Select<T extends object>({
  items,
  children,
  ...rest
}: SelectProps<T>) {
  return (
    <AriaSelect {...rest}>
      <Button className="p-1 border-solid border border-transparent hover:border-gray-300 flex gap-2 w-full rounded-lg focus:outline focus:outline-2 focus:outline-blue-500 items-center">
        <SelectValue className="flex-auto display-block" />
        <div aria-hidden="true">
          <IconChevronDown />
        </div>
      </Button>
      <Popover className="w-48 flex-col gap-2">
        <ListBox className="bg-white drop-shadow-lg rounded-lg" items={items}>
          {children}
        </ListBox>
      </Popover>
    </AriaSelect>
  )
}
