import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";
import { theme, Title } from "@src/components/nessie-web";
import FunCurveTop from "@src/assets/images/resources/curves/having-fun-top.svg";
import FunCurveBottom from "@src/assets/images/resources/curves/having-fun-bottom.svg";
import { getAllJSDocTagsOfKind } from "typescript";

export const HavingFunHolder = styled("section")<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  position: relative;
  padding: 100px ${theme.space.s}px 10px;
  text-align: center;
  z-index: 1;
  ::before,
  ::after {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    width: 100%;
    min-width: 600px;
    height: 80px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top center;
    z-index: 2;
  }
  ::before {
    top: -1px;
    background-image: url("${FunCurveTop}");
  }
  ::after {
    bottom: -1px;
    background-image: url("${FunCurveBottom}");
  }
  ${mediaQueries[1]} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: ${theme.space.l}px;
    align-items: center;
  }
`;

export const HavingFunIllustration = styled("img")`
  height: 250px;
  margin: ${theme.space.l}px auto 0;
  ${mediaQueries[1]} {
    margin: 0;
    height: 420px;
    grid-column-start: 1;
    grid-row-start: 1;
    justify-self: end;
  }
`;

export const HavingFunTitle = styled(Title)`
  max-width: 320px;
  margin: auto;
  ${mediaQueries[1]} {
    max-width: 600px;
    grid-column-start: 2;
    text-align: left;
    margin: 0;
    justify-self: start;
    transform: translateY(-50px);
  }
`;
