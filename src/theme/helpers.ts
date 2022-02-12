import { DefaultTheme } from "styled-components";
import { ColorVariant, Typography, TypographyVariant } from "./types";

interface PropsWithTheme {
  theme: DefaultTheme;
}

export const color: (name: ColorVariant) => (theme: PropsWithTheme) => string =
  (name) => (props) =>
    props.theme.colors[name];

export const fontFamily: (
  variant: TypographyVariant
) => (props: PropsWithTheme) => string = (variant) => (props) => {
  const fontFamily = props.theme.typography[variant].fontFamily;
  return fontFamily ? `font-family: ${fontFamily}` : "";
};

export const fontSize: (
  variant: TypographyVariant
) => (props: PropsWithTheme) => string = (variant) => (props) => {
  const fontSize = props.theme.typography[variant].fontSize;
  return fontSize ? `font-size: ${fontSize}rem` : "";
};

export const fontWeight: (
  variant: TypographyVariant
) => (props: PropsWithTheme) => string = (variant) => (props) => {
  const fontWeight = props.theme.typography[variant].fontWeight;
  return fontWeight ? `font-weight: ${fontWeight}` : "";
};

export const textTransform: (
  variant: TypographyVariant
) => (props: PropsWithTheme) => string = (variant) => (props) => {
  const textTransform = props.theme.typography[variant].textTransform;
  return textTransform ? `text-transform: ${textTransform}` : "";
};

export const spacing: (
  value: number
) => (props: PropsWithTheme) => string | number = (value) => (props) => {
  const spacingValue = props.theme.spacing[value];
  return spacingValue ? `${spacingValue}rem` : value;
};
