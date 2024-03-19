import { IconChevronDown } from "@tabler/icons-react";
import {
  Button,
  ListBox,
  Popover,
  Select as AriaSelect,
  SelectValue,
  SelectProps as AriaSelectProps,
} from "react-aria-components";

interface SelectProps<T extends object>
  extends Omit<AriaSelectProps<T>, "children"> {
  items?: Iterable<T>;
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

export function Select<T extends object>({
  items,
  children,
  ...rest
}: SelectProps<T>) {
  return (
    <AriaSelect {...rest}>
      <Button className="flex gap-2 w-full">
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
  );
}
