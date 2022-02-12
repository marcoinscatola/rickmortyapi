import { createGlobalStyle } from "styled-components";
import { color, fontFamily, fontSize, fontWeight, spacing } from ".";

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    background-color: ${color("background")};
    color: ${color("text")};
    ${fontFamily("root")};
    ${fontSize("root")};
    ${fontWeight("root")};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  h1,h2,h3,h4,h5,h6 {
    margin: 0;
    ${fontFamily("heading")};
    ${fontWeight("heading")};
    ${fontSize("heading")}
  }

  h1 {
    ${fontSize("heading1")}
  }

  h2 {
    ${fontSize("heading2")}
  }

  h3 {
    ${fontSize("heading3")}
  }

  button {
    ${fontFamily("caption")};
    ${fontWeight("caption")};
    ${fontSize("caption")}
  }

  ul {
    padding: 0;
    padding-inline-start: 1em;
  }

  dl, ul {
    margin: ${spacing(3)} 0;
  }

  li {
    margin: ${spacing(2)} 0;
  }
`;
