import styled from "@emotion/styled";
import { theme } from "@src/components/nessie-web";

export const CityStateGrid = styled("div")`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: ${theme.space.s}px;
`;
