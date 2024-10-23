import React from "react";
import { Box, Flex } from "@src/components/Boxes";
import Button from "@src/components/Button";
import { navigate } from "gatsby";
import { getRelativePath } from "@src/utils/routes";
import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";
import GatsbyImageWrapper from "../GatsbyImageWrapper";

const FeatureContainer = styled(Flex)`
  margin-top: 60px;
  margin-bottom: 60px;
`;
FeatureContainer.defaultProps = {
  width: ["100%", "100%", 10 / 12],
  mx: "auto",
  alignItems: "center",
  flexDirection: ["column-reverse", "row"],
};

const FeaturesColumn = styled(Box)`
  position: relative;
  padding: 15px;
`;
FeaturesColumn.defaultProps = { width: ["100%", 1 / 2], maxWidth: [415, "100%"] };

const FeaturesInfo = styled(Flex)``;
FeaturesInfo.defaultProps = { flexDirection: "column" };

const FeaturesHeader = styled("h3")`
  max-width: 530px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 800;
  font-size: 21px;
  line-height: 24px;
  ${mediaQueries[2]} {
    font-size: 36px;
    line-height: 43px;
  }
`;

const FeaturesText = styled("p")`
  margin: 0 0 11px;
  font-size: 16px;
  line-height: 23px;
  max-width: 440px;
  color: #363636;
  ${mediaQueries[2]} {
    margin: 30px auto;
    font-size: 18px;
    line-height: 20px;
  }
`;

const FeaturesBoxImgTools = styled(GatsbyImageWrapper)`
  background: #fff;
  max-width: 385px;
  width: 100%;
  ${mediaQueries[0]} {
    max-width: unset;
  }
`;

type FeatureItemProps = {
  is_picture_left: boolean;
  header?: string;
  text?: string;
  button_url?: string;
  button_text?: string;
  picture: { filename_disk: string };
};
const FeatureItem: React.FC<FeatureItemProps> = ({
  is_picture_left,
  header,
  text,
  button_url,
  button_text,
  picture,
}) => {
  return (
    <FeatureContainer flexDirection={is_picture_left ? ["column", "row-reverse"] : ["column-reverse", "row"]}>
      <FeaturesColumn>
        <FeaturesInfo textAlign="center">
          {header && <FeaturesHeader>{header}</FeaturesHeader>}
          {text && <FeaturesText>{text}</FeaturesText>}
          {button_url && (
            <Box>
              <Button
                big
                onClick={() => {
                  navigate(getRelativePath(button_url));
                }}
              >
                {button_text}
              </Button>
            </Box>
          )}
        </FeaturesInfo>
      </FeaturesColumn>
      <FeaturesColumn>
        <FeaturesBoxImgTools image={picture} loading="eager" />
      </FeaturesColumn>
    </FeatureContainer>
  );
};

export default FeatureItem;
