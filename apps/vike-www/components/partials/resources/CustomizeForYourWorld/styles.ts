import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";
import { theme } from "@src/components/nessie-web";
import Container from "@src/components/Container";
import CurveTop from "@src/assets/images/resources/curves/customize-top.svg";
import CurveLeft from "@src/assets/images/resources/curves/customize-left.svg";
import CurveRight from "@src/assets/images/resources/curves/customize-right.svg";
import CurveBottom from "@src/assets/images/resources/curves/customize-bottom.svg";
import BlobOne from "@src/assets/images/resources/blob-1.svg";
import BlobTwo from "@src/assets/images/resources/blob-2.svg";
import BlobThree from "@src/assets/images/resources/blob-3.svg";
import BlobFour from "@src/assets/images/resources/blob-4.svg";

export const ContentContainer = styled(Container)`
  position: relative;
  margin-bottom: 93px;

  ${mediaQueries[2]} {
    &:before {
      width: 120px;
      height: 496px;
      content: "";
      position: absolute;
      top: calc(50% - calc(496px / 2));
      left: 70px;
      background-image: url("${CurveLeft}");
      background-repeat: no-repeat;
      z-index: -32;
    }
    &:after {
      width: 153px;
      height: 530px;
      background-image: url("${CurveRight}");
      background-repeat: no-repeat;
      content: "";
      position: absolute;
      top: calc(50% - calc(530px / 2));
      right: 100px;
      z-index: -32;
    }
  }
`;

export const CustomizeBubbleRow = styled("div")`
  order: 2;
  display: flex;
  flex-direction: row;
  justify-content: center;
  ${mediaQueries[2]} {
    order: unset;
    gap: 200px 0px;
    justify-content: space-between;
  }
  flex-wrap: wrap;
  ${mediaQueries[2]} {
    flex-wrap: no-wrap;
  }
`;

export const Bubble = styled("div")`
  display: grid;
  place-content: center;
  justify-items: center;
  gap: ${theme.space.m}px;
  text-align: center;
  position: relative;
  margin-top: ${theme.space.l}px;
  ${mediaQueries[2]} {
    margin-top: 0px;
  }
  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    top: 20px;
    ${mediaQueries[0]} {
      top: 0;
    }
  }
`;

export const BubbleOne = styled(Bubble)`
  margin-top: 0px;
  width: 457px;
  height: 347px;
  &:before {
    background-image: url("${BlobOne}");
    background-size: 100%;
  }
  ${mediaQueries[2]} {
    padding: 89px 48px 70px 26px;
    &:after {
      background-image: url("${CurveTop}");
      background-repeat: no-repeat;
      content: "";
      position: absolute;
      width: 598px;
      height: 184.24px;
      left: 64%;
      top: 20%;
      z-index: -32;
    }
  }
`;

export const BubbleTwo = styled(Bubble)`
  z-index: 2;
  width: 450px;
  height: 376px;
  padding: 0 20px;
  ${mediaQueries[2]} {
    margin-top: 40px;
    padding: 110px 22px 68px 50px;
  }
  &:before {
    background-image: url("${BlobTwo}");
    background-size: 100%;
  }
`;

export const BubbleThree = styled(Bubble)`
  margin-top: -50px;
  padding: 0 20px;
  width: 544px;
  height: 459px;
  &:before {
    background-image: url("${BlobThree}");
    background-size: 100%;
    top: 40px;
  }
  ${mediaQueries[1]} {
    &:before {
      top: 0;
    }
  }
  ${mediaQueries[2]} {
    margin-top: 0px;
    padding: 122px 95px 90px 64px;
    &:after {
      background-image: url("${CurveBottom}");
      background-repeat: no-repeat;
      content: "";
      position: absolute;
      width: 426px;
      height: 143px;
      left: 70%;
      top: 70%;
      z-index: -32;
    }
  }
`;

export const BubbleFour = styled(Bubble)`
  padding: 0 20px;
  margin-top: -90px;
  ${mediaQueries[2]} {
    margin-top: 60px;
    padding: 90px 86px 76px 72px;
  }
  width: 536px;
  height: 379px;
  &:before {
    background-image: url("${BlobFour}");
    background-size: 100%;
  }
`;

export const RocketHolder = styled("div")`
  text-align: center;
  order: 1;
  margin-bottom: ${theme.space.xxl}px;
  ${mediaQueries[2]} {
    order: 0;
    width: 750px;
    margin: -170px auto -180px 120px;
    pointer-events: none;
  }
`;

export const RocketSection = styled("img")`
  max-width: 80%;
  ${mediaQueries[2]} {
    margin-left: 84px;
  }
`;
