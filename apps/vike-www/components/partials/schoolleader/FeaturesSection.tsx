import * as React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { Box, Flex } from "@src/components/Boxes";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import { graphql, useStaticQuery } from "gatsby";
import { mediaQueries } from "@src/styles/theme";
import Translate from "@src/components/translation/Translate";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import { Text } from "@src/components/Text";
import { Button } from "@src/components/nessie-web";

const FeaturesBoxImgStory = styled(GatsbyImage)`
  background: #fff;
  min-width: 200px;
  max-width: 385px;
  ${mediaQueries[1]} {
    max-width: unset;
    width: 420px;
  }
`;

const FeaturesInfo = styled(Box)``;

const FeaturesHeader = styled("h3")`
  color: #2c2a50;
  max-width: 530px;
  margin: 0 auto 30px;
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
`;

const FeaturesQuote = styled("p")`
  max-width: 530px;
  margin-left: auto;
  margin-right: auto;
  font-size: 16px;
  line-height: 21px;
  ${mediaQueries[2]} {
    font-size: 18px;
    line-height: 24px;
  }
`;

const FeaturesText = styled(Text)`
  margin: 0 0 30px;
  max-width: 440px;
  ${mediaQueries[2]} {
    margin: 30px auto;
  }
`;
FeaturesText.defaultProps = {
  color: "#2c2a50",
  fontSize: "18px",
  lineHeight: "24px",
  fontWeight: "600",
};

const FeaturesColumn = styled(Flex)`
  position: relative;
  padding-left: 15px;
  padding-right: 15px;
  > button {
    border: 0;
    background-color: transparent;
    margin: 0 auto 30px;
  }
`;
FeaturesColumn.defaultProps = { width: ["100%", 1 / 2], maxWidth: [415, "100%"] };

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

const FeaturesSection = () => {
  const data = useStaticQuery(graphql`
    {
      videoLearnMore: file(name: { eq: "learn-more-video@2x" }) {
        childImageSharp {
          gatsbyImageData(width: 455, quality: 100, placeholder: NONE, layout: CONSTRAINED)
        }
      }
      couchImage: file(name: { eq: "family-couch" }) {
        childImageSharp {
          gatsbyImageData(width: 470, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
    }
  `);

  const { couchImage, videoLearnMore } = data;

  const modalContext = React.useContext(ModalContext);

  function openVideoModal() {
    modalContext.showModal(ModalType.VideoModal, { youtubeID: "0IqnV06bKNw" });
  }

  return (
    <Box as="section" bg="#fff">
      <Container width={["100%", 750, 970, "100vw"]}>
        <FeatureContainer>
          <FeaturesColumn>
            <FeaturesInfo textAlign="center" width="100%">
              <FeaturesHeader>
                <Translate path="pages.schoolleader.community_features_alt.first.title" />
              </FeaturesHeader>
              <FeaturesText>
                <Translate path="pages.schoolleader.community_features_alt.first.first_content" />
              </FeaturesText>
              <FeaturesText>
                <Translate path="pages.schoolleader.community_features_alt.first.second_content" />
              </FeaturesText>
              <FeaturesText>
                <Translate path="pages.schoolleader.community_features_alt.first.third_content" />
              </FeaturesText>
              <Flex justifyContent="center">
                <Button kind="primary" onClick={() => openVideoModal()}>
                  <Translate path="pages.schoolleader.community_features_alt.first.button" />
                </Button>
              </Flex>
            </FeaturesInfo>
          </FeaturesColumn>
          <FeaturesColumn>
            <button onClick={() => openVideoModal()} aria-label="Video about remote learning">
              <FeaturesBoxImgStory image={videoLearnMore.childImageSharp.gatsbyImageData} loading="eager" alt="" />
            </button>
          </FeaturesColumn>
        </FeatureContainer>

        <FeatureContainer flexDirection={["column-reverse", "row-reverse"]}>
          <FeaturesColumn>
            <FeaturesInfo textAlign="center">
              <FeaturesQuote>
                <Translate path="directus.page_landing_common_data.quote_text" />
              </FeaturesQuote>
              <FeaturesText color="#D6D9ED" fontSize="16px" fontWeight="400">
                <Translate path="directus.page_landing_common_data.quote_signature" />
              </FeaturesText>
            </FeaturesInfo>
          </FeaturesColumn>
          <FeaturesColumn flexDirection="column" justifyContent="center" alignItems="center" marginBottom="30px">
            <FeaturesBoxImgStory
              image={couchImage.childImageSharp.gatsbyImageData}
              loading="eager"
              alt="ClassDojo family characters sitting on a couch"
            />
          </FeaturesColumn>
        </FeatureContainer>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
