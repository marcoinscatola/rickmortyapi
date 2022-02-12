import styled from "styled-components";
import Image from "next/image";
import { color, spacing } from "@/theme";

export const Card = styled.article`
  display: grid;
  grid-template-columns: 180px 1fr;
  grid-template-rows: 180px 1fr;
  border-radius: ${spacing(3)};
  overflow: hidden;
  background: ${color("highlight")};
`;

export const CardImageWrapper = styled.div`
  grid-column: 1 / 2;
`;

export const CardImage = styled(Image)`
  height: auto;
  width: 100%;
  display: block;
`;

export const CardContentWrapper = styled.div`
  grid-column: 2 / 3;
  padding: ${spacing(3)};
  overflow: hidden;
`;

export const CardAnnexWrapper = styled.div`
  grid-column: 1 / 3;
  padding: 0 ${spacing(3)};
`;

export const CardTitle = styled.h2`
  margin-top: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
