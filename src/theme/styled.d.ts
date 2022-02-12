// import original module declarations
import "styled-components";
import { ColorVariant, TypographyVariant, Typography } from "./types";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      [key in ColorVariant]: string;
    };
    typography: {
      [key in TypographyVariant]: Typography;
    };
    spacing: number[];
  }
}

import { CSSProp } from "styled-components";

declare module "react" {
  interface Attributes {
    css?: CSSProp;
  }
}
