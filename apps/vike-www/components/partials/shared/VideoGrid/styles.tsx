import styled from "@emotion/styled";
import { Box } from "@src/components/Boxes";
import { mediaQueries } from "@src/styles/theme";

type CardsGridProps = {
  double?: boolean;
};
export const CardsGrid = styled(Box)<CardsGridProps>`
  grid-template-columns: 1fr 1fr;
  display: grid;
  grid-template-rows: auto;
  grid-column-gap: 12px;
  grid-row-gap: 12px;
  margin-bottom: 12px;

  ${mediaQueries[0]} {
    grid-template-columns: ${(props) => (props.double ? "1fr 1fr" : "1fr 1fr 1fr")};
    grid-column-gap: 36px;
    grid-row-gap: 36px;
    margin-bottom: 36px;
  }
`;
