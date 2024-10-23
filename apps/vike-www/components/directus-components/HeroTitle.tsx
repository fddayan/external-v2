import React from "react";
import { Flex } from "@src/components/Boxes";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { mediaQueries } from "@src/styles/theme";
import GatsbyImageWrapper from "../GatsbyImageWrapper";

const Header = styled("h1")`
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.14);
  color: #fff;
  font-size: 31px;
  line-height: 1.1;
  font-weight: 400;
  z-index: 3;
  ${mediaQueries[0]} {
    font-weight: 800;
    font-size: 52.8px;
  }
`;

type HeroTitleProps = {
  text: string;
  background_color_desktop?: string;
  background_color_mobile?: string;
  picture_left?: FluidObject | null;
  picture_right?: FluidObject | null;
};

const HeroTitle: React.FC<HeroTitleProps> = ({
  text,
  picture_left,
  picture_right,
  background_color_desktop = "#ffffff",
  background_color_mobile = "#ffffff",
}) => {
  return (
    <Flex
      height="200px"
      position="relative"
      justifyContent="center"
      alignItems="center"
      backgroundColor={[background_color_mobile, background_color_desktop]}
      width="100%"
      overflow="hidden"
    >
      {picture_left && (
        <GatsbyImageWrapper
          image={picture_left}
          css={css`
            position: absolute !important;
            width: 387px;
            left: 0;
            top: 0;
            z-index: 2;
            display: none;
            ${mediaQueries[0]} {
              display: block;
            }
          `}
        />
      )}

      {picture_right && (
        <GatsbyImageWrapper
          image={picture_right}
          css={css`
            position: absolute !important;
            width: 387px;
            right: 0;
            top: 0;
            z-index: 1;
            display: none;
            ${mediaQueries[0]} {
              display: block;
            }
          `}
        />
      )}

      <Header>{text}</Header>
    </Flex>
  );
};

export default HeroTitle;
