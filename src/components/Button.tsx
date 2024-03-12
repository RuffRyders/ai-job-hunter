import { Button as MantineButton } from "@mantine/core";

export function Button({ children, ...rest }: { children: React.ReactNode }) {
  return (
    <MantineButton
      className="bg-primary py-2 px-4 rounded-full text-normal"
      {...rest}
    >
      {children}
    </MantineButton>
  );
}
