import styled from "styled-components";
import { color, fontFamily, fontWeight, spacing } from "@/theme";

export const SubHeading = styled.div`
  ${fontFamily("heading")};
  ${fontWeight("heading")};
  padding: ${spacing(2)} 0;
  border-bottom: 1px solid ${color("highlight")};
`;
