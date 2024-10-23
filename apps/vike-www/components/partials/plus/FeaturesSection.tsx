import React from "react";

import Container from "@src/components/Container";
import Translate from "@src/components/translation/Translate";
import { Box, Flex } from "@src/components/Boxes";
import { Grid, GridItem } from "@src/components/Grid";
import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";
import { theme, Title, BodyText, Subheading, DetailText, Space } from "@src/components/nessie-web";
import { PublicUrlImg } from "@src/types/common";

const {
  colors: { dt_white, dt_taro20 },
  shadows: { dt_shadow_shadezies_small },
} = theme;

const FeatureContainer = styled(Flex)`
  text-align: left;
  width: 100%;
`;
FeatureContainer.defaultProps = {
  mx: "auto",
  alignItems: "center",
  flexDirection: ["column", "row"],
};

const FeaturesColumn = styled(Flex)`
  position: relative;
  padding-left: 15px;
  padding-right: 15px;
`;
FeaturesColumn.defaultProps = { width: ["100%", "100%", 1 / 2], alignItems: "center", justifyContent: "center" };

const FeaturesBoxImg = styled("img")<{ left?: boolean }>`
  position: relative;
  max-width: 100%;

  ${mediaQueries[1]} {
    left: ${(props) => (props.left ? 0 : "auto")};
    right: ${(props) => (props.left ? "auto" : 0)};
  }
`;

const IconImg = styled("img")<{ marginRight?: number; alignSelf?: string; background?: string; maxWidth?: string }>`
  position: relative;
  margin-right: ${(props) => props.marginRight};
  background: ${(props) => props.background};
`;

const IconContainer = styled(Flex)`
  justify-content: center;
  align-items: center;
  min-width: 68px;
  height: 68px;
  border: 2px solid ${dt_taro20};
  box-sizing: border-box;
  border-radius: 34px;
  background-color: ${dt_taro20};
  box-shadow: ${dt_shadow_shadezies_small};
  margin-right: 20px;
`;

const IconRing = styled(Flex)`
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 66px;
  padding: 5px;
  border: 4px solid ${dt_white};
  box-sizing: border-box;
  border-radius: 34px;
  background-color: ${dt_taro20};
`;

const FeaturesSection = (props: {
  iterable: { feature_icon_url: string; feature_link_url: string; footnote: string }[];
  image: PublicUrlImg;
  isLeft: boolean;
  bgColor: string;
  featureHeader: string;
  featureTitlePath: string;
  featureTextPath: string;
  featureLinkLabel: string;
  featureFootnotePath?: string;
}) => {
  const {
    iterable,
    image,
    isLeft,
    bgColor,
    featureHeader,
    featureTitlePath,
    featureTextPath,
    featureLinkLabel,
    featureFootnotePath,
  } = props;
  return (
    <Box
      as="section"
      bg="transparent"
      position="relative"
      width="100vw"
      paddingY={["54px", "108px"]}
      minHeight="500px"
      backgroundColor={bgColor}
    >
      <FeatureContainer>
        <Container padding="0">
          <Flex
            flexDirection={isLeft ? ["column-reverse", "row"] : ["column-reverse", "row-reverse"]}
            marginBottom={[24, 28]}
          >
            <FeaturesColumn width={["100%", "40%"]}>
              <Flex width="100%" textAlign="left" marginTop={[0, 40]} marginBottom={[0, 40]}>
                <Title textAlign="left">
                  <Translate path={featureHeader} />
                </Title>
              </Flex>
            </FeaturesColumn>
            <FeaturesColumn width={["100%", "60%"]}>
              <FeaturesBoxImg left={isLeft} src={image.file.publicURL} alt="" />
            </FeaturesColumn>
          </Flex>

          <Box padding={["0 15px", "0"]}>
            <Grid gapSize={["0", "4"]}>
              {iterable.map((item, index) => {
                return (
                  <GridItem key={index} colSpan={[12, 6]}>
                    <IconContainer>
                      <IconRing>
                        <IconImg src={item.feature_icon_url} alt="" />
                      </IconRing>
                    </IconContainer>
                    <Box marginBottom="24px" minHeight="70px">
                      <Subheading>
                        <Translate path={featureTitlePath + (index + 1)} />
                      </Subheading>
                      <BodyText>
                        <Translate path={featureTextPath + (index + 1)} />{" "}
                        {item.feature_link_url && (
                          <a href={item.feature_link_url}>
                            <Translate path={featureLinkLabel + (index + 1)} />
                          </a>
                        )}
                      </BodyText>
                      {item.footnote && (
                        <>
                          <Space size="xs" />
                          <DetailText color="dt_taro50">
                            <Translate path={featureFootnotePath + (index + 1)} />
                          </DetailText>
                        </>
                      )}
                    </Box>
                  </GridItem>
                );
              })}
            </Grid>
          </Box>
        </Container>
      </FeatureContainer>
    </Box>
  );
};

export default FeaturesSection;
