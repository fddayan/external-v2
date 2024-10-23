import { Button } from "@src/components/nessie-web";
import styled from "@emotion/styled/base";
import { mediaQueries } from "@src/styles/theme";

export const ShareOptionWrap = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${mediaQueries[0]} {
    flex-direction: row;
    gap: 93px;
  }
`;

export const ShareOption = styled("div")`
  text-align: center;
  margin-bottom: 93px;
`;

export const ShareIcon = styled("div")<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  height: 60px;
  width: 60px;
  border-radius: 100%;
  display: grid;
  place-content: center;
  margin: auto;
`;
