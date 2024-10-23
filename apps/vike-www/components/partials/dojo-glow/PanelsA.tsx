import React, { ReactNode } from "react";
import { Flex } from "@src/components/Boxes";
import styled from "@emotion/styled";
import { mediaQueriesMax } from "@src/styles/theme";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 60px;

  grid-template-areas:
    "a b"
    "c b";

  ${mediaQueriesMax[1]} {
    grid-template-columns: 1fr;
    grid-template-areas:
      "a"
      "b"
      "c";
  }
`;

export const PanelsA = ({ children }: { children: ReactNode }) => {
  return <GridContainer>{children}</GridContainer>;
};
