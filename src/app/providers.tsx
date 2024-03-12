"use client";

import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  /** Your theme override here */
});

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      {children}
    </MantineProvider>
  );
}
