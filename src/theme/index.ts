import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    text: "hsl(210, 50%, 96%)",
    background: "hsl(230, 25%, 18%)",
    primary: "hsl(260, 100%, 80%)",
    secondary: "hsl(290, 100%, 80%)",
    highlight: "hsl(260, 20%, 40%)",
    muted: "hsla(230, 20%, 0%, 20%)",
    gray: "hsl(210, 50%, 60%)",
  },
  typography: {
    root: {
      fontFamily: '"Open Sans", sans-serif',
      fontSize: 1,
      fontWeight: 400,
    },
    body: {
      fontFamily: '"Open Sans", sans-serif',
      fontSize: 1,
      fontWeight: 400,
    },
    heading: {
      fontFamily: '"Open Sans", sans-serif',
      fontSize: 1.2,
      fontWeight: 600,
    },
    heading1: {
      fontFamily: '"Open Sans", sans-serif',
      fontSize: 2,
      fontWeight: 600,
    },
    heading2: {
      fontFamily: '"Open Sans", sans-serif',
      fontSize: 1.75,
      fontWeight: 600,
    },
    heading3: {
      fontFamily: '"Open Sans", sans-serif',
      fontSize: 1.5,
      fontWeight: 600,
    },
    caption: {
      fontFamily: '"Open Sans", sans-serif',
      fontSize: 1,
      fontWeight: 600,
      textTransform: "uppercase",
    },
  },
  spacing: [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4],
};

export * from "./helpers";
