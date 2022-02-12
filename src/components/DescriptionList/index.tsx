import styled from "styled-components";
import { fontFamily, fontSize, fontWeight, spacing } from "@/theme";

export const DescriptionTerm = styled.dt`
  ${fontWeight("caption")};
  ${fontFamily("caption")};
  display: inline-block;
  flex: 0 0 auto;
  &:after {
    content: ": ";
    white-space: pre;
  }
`;

export const DescriptionDetails = styled.dd`
  ${fontWeight("body")};
  ${fontFamily("body")};
  display: inline-block;
  padding: 0;
  margin: 0;
  margin-inline-start: 0;
  flex: 1 1 auto;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const DescriptionSection = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: ${spacing(2)} 0;
`;

export const DescriptionList = styled.dl`
  ${fontSize("body")};
`;
