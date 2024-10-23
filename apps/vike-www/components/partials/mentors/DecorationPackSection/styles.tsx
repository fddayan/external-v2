import styled from "@emotion/styled";
import { theme } from "@src/components/nessie-web";
import { mediaQueries } from "@src/styles/theme";

const {
  colors: { dt_blueberry30 },
} = theme;

export const DecorationPackSectionContainer = styled.section<{ leftBalloon: string; rightBalloon: string }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0;
  background: ${dt_blueberry30};

  ${mediaQueries[1]} {
    background: url("${(props) => props.leftBalloon}") no-repeat top left,
      url("${(props) => props.rightBalloon}") no-repeat top right, ${dt_blueberry30};
    background-size: contain;
  }
`;

export const DecorationPackHeader = styled.div`
  width: 100%;
  max-width: 530px;
  margin: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
