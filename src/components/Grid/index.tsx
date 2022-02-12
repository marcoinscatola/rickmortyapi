import styled from "styled-components";
import PropTypes from "prop-types";
import { spacing } from "@/theme";

interface GridProps {
  minWidth?: number;
}

export const Grid = styled.div<GridProps>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${(props) => props.minWidth}px, 1fr)
  );
  grid-gap: ${spacing(3)};
`;

Grid.propTypes = {
  minWidth: PropTypes.number.isRequired,
};

Grid.defaultProps = {
  minWidth: 400,
};
