"use client";

import { createTheme, Button } from "@mantine/core";

export const theme = createTheme({
  defaultGradient: {
    from: "orange",
    to: "red",
    deg: 45,
  },
  components: {
    Button: Button.extend({
      defaultProps: {
        // color: "cyan",
        radius: "xl",
      },
    }),
  },
});
