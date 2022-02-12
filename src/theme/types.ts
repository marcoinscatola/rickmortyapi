export type ColorVariant =
  | "text"
  | "background"
  | "primary"
  | "secondary"
  | "highlight"
  | "muted"
  | "gray";

export type TypographyVariant =
  | "root"
  | "body"
  | "heading"
  | "heading1"
  | "heading2"
  | "heading3"
  | "caption";

export type Typography = {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number | string;
  textTransform?: string;
};
