import styled from "@emotion/styled";
import { theme } from "@src/components/nessie-web";
import { mediaQueries } from "@src/styles/theme";

const {
  colors: { dt_mango20 },
} = theme;

export const CTASectionContainer = styled.section`
  width: 100%;
  padding: 48px 0;
  background-color: ${dt_mango20};

  ${mediaQueries[0]} {
    padding: 96px 0;
  }
`;

export const CTASectionFlex = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${mediaQueries[0]} {
    flex-direction: row;
  }
`;

export const CTASectionFlexChild = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  ${mediaQueries[0]} {
    width: 50%;
  }
`;
