import styled from "@emotion/styled";
import { theme, Title, Heading, BodyText } from "@src/components/nessie-web";
import { Box, Flex } from "@src/components/Boxes";
import { mediaQueries } from "@src/styles/theme";
import { css } from "@emotion/react";
import GatsbyImageWrapper from "@src/components/GatsbyImageWrapper";

type themeProps = {
  dark?: boolean;
};

export const textColor = (darkMode) => {
  css`
    color: ${darkMode ? theme.colors.white : theme.colors.taro90};
  `;
};

const themedColor = (props) => (props.dark ? theme.colors.white : theme.colors.taro90);

export const FeaturesBoxImgStory = styled(GatsbyImageWrapper)`
  background: #fff;
  min-width: 200px;
  max-width: 385px;
  margin: auto;
  ${mediaQueries[1]} {
    max-width: unset;
    width: 420px;
  }
`;

export const TranparentFeaturesBoxImgStory = styled(GatsbyImageWrapper)`
  min-width: 200px;
  max-width: 385px;
  margin: auto;
  ${mediaQueries[1]} {
    max-width: unset;
    width: 420px;
  }
`;

export const CustomComponentContainer = styled(Box)`
  min-width: 200px;
  max-width: 385px;
  margin: auto;
  ${mediaQueries[1]} {
    max-width: unset;
    width: 420px;
  }
`;

export const SectionTitle = styled(Title)<themeProps>`
  color: ${(props) => themedColor(props)} !important;
`;

export const FeaturesNumber = styled("span")`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #9984cd;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  font-size: 30px;
  font-weight: 800;
  margin-right: 10px;
`;

export const FeaturesInfo = styled(Box)<themeProps>`
  color: ${(props) => themedColor(props)};
`;

export const FeaturesHeading = styled(Heading)<themeProps>`
  color: ${(props) => themedColor(props)};
`;

export const FeaturesText = styled(BodyText)`
  color: ${(props) => themedColor(props)};
`;

export const FeatureContainer = styled(Flex)``;
FeatureContainer.defaultProps = {
  width: ["100%", "100%", 10 / 12],
  mx: "auto",
  alignItems: "center",
  marginTop: ["60px", "0"],
  marginBottom: ["60px", "0"],
  justifyContent: "center",
};

export const FeaturesColumn = styled(Flex)`
  width: 100%;
  max-width: 415px;
  position: relative;
  margin: 12px;
  ${mediaQueries[0]} {
    width: 50%;
    margin: 36px;
  }
`;
