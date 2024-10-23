import * as React from "react";

import { Box, Flex } from "@src/components/Boxes";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import Button from "@src/components/Button";
import { graphql, navigate, useStaticQuery } from "gatsby";
import { mediaQueries } from "@src/styles/theme";
import Translate from "@src/components/translation/Translate";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import { getRelativePath } from "@src/utils/routes";
import { logEvent } from "@src/utils/logClient";
import window from "global/window";
import MarkedTranslate from "@src/components/translation/MarkedTranslate";
import GatsbyImageWrapper from "@src/components/GatsbyImageWrapper";

const FeaturesBoxImgStory = styled(GatsbyImageWrapper)`
  background: #fff;
  max-width: 385px;
  ${mediaQueries[1]} {
    max-width: unset;
    width: 788px;
  }
`;
const FeaturesBoxImgTools = styled(GatsbyImageWrapper)`
  background: #fff;
  max-width: 385px;
  ${mediaQueries[0]} {
    max-width: unset;
    width: 283px;
  }
  ${mediaQueries[1]} {
    width: 594px;
  }
`;

const FeaturesBoxImgPortfolio = styled(GatsbyImageWrapper)`
  background: #fff;
  max-width: 385px;
  ${mediaQueries[0]} {
    max-width: unset;
    width: 345px;
  }
  ${mediaQueries[1]} {
    width: 742px;
    position: absolute !important;
    right: 0;
  }
`;

const FeaturesBoxImgVideo = styled(GatsbyImageWrapper)`
  width: 100%;
  /* ${mediaQueries[0]} {
    width: 345px;
    min-width: 345px;
  }
  ${mediaQueries[1]} {
    width: 489px;
    position: absolute !important;
    right: 0;
  } */
`;

const FeaturesBoxImgVideoContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 415px;
  ${mediaQueries[0]} {
    width: 345px;
    min-width: 345px;
    max-width: unset;
  }
  ${mediaQueries[1]} {
    width: 489px;
    position: absolute !important;
    right: 0;
    top: 0;
    bottom: 0;
  }
`;

const VideoPlayButton = styled(GatsbyImageWrapper)`
  position: absolute !important;
  top: 50%;
  left: 50%;
  height: 75px;
  width: 75px;
  transform: translate(-50%, -50%);
  z-index: 2;
  cursor: pointer;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`;

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

const FeaturesText = styled("div")`
  p {
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
  }

  ul {
    font-weight: 500;
    text-align: left;
    color: #363636;
    margin-bottom: 11px;
    font-size: 14px;
    line-height: 20px;
    max-width: 520px;
    margin-left: auto;
    margin-right: auto;
    ${mediaQueries[2]} {
      margin-bottom: 30px;
      font-size: 20px;
      line-height: 52px;
    }
  }
`;

const FeaturesColumn = styled(Box)`
  position: relative;
  padding-left: 15px;
  padding-right: 15px;
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
      directus {
        page_home {
          feature_one_image {
            filename_disk
          }
          feature_two_image {
            filename_disk
          }
          feature_three_image {
            filename_disk
          }
          feature_four_image {
            filename_disk
          }
          feature_four_video
          feature_one_button_link
          feature_two_button_link
          feature_three_button_link
        }
      }
      videoPlayButton: file(name: { eq: "video-play-button" }) {
        childImageSharp {
          gatsbyImageData(width: 75, quality: 100, placeholder: NONE, layout: FIXED)
        }
      }
    }
  `);

  const {
    directus: {
      page_home: {
        feature_one_image,
        feature_two_image,
        feature_three_image,
        feature_four_image,
        feature_four_video,
        feature_one_button_link,
        feature_two_button_link,
        feature_three_button_link,
      },
    },
    videoPlayButton,
  } = data;

  const modalContext = React.useContext(ModalContext);

  function openVideoModal() {
    modalContext.showModal(ModalType.VideoModal, { youtubeID: feature_four_video });
  }

  return (
    <Box as="section" bg="#fff">
      <Container width={["100%", 750, 970, "100vw"]}>
        <FeatureContainer>
          <FeaturesColumn>
            <FeaturesInfo textAlign="center">
              <FeaturesHeader>
                <Translate path="directus.page_home.feature_one_title" />
              </FeaturesHeader>
              <FeaturesText>
                <MarkedTranslate path="directus.page_home.feature_one_text" />
              </FeaturesText>
              <Box>
                <Button
                  big
                  onClick={() => {
                    logEvent({ eventValue: window.location.href, eventName: "web.external_page.features.story.tap" });
                    navigate(getRelativePath(feature_one_button_link));
                  }}
                >
                  <Translate path="directus.page_home.feature_one_button_text" />
                </Button>
              </Box>
            </FeaturesInfo>
          </FeaturesColumn>
          <FeaturesColumn>
            <FeaturesBoxImgStory
              image={feature_one_image}
              loading="eager"
              alt="Mojo behind a giant cellphone showing ClassDojo stories"
            />
          </FeaturesColumn>
        </FeatureContainer>

        <FeatureContainer flexDirection={["column-reverse", "row"]}>
          <FeaturesColumn>
            <FeaturesInfo textAlign="center">
              <FeaturesHeader>
                <Translate path="directus.page_home.feature_two_title" />
              </FeaturesHeader>
              <FeaturesText>
                <MarkedTranslate path="directus.page_home.feature_two_text" />
              </FeaturesText>
              <Box>
                <Button
                  big
                  onClick={() => {
                    logEvent({ eventValue: window.location.href, eventName: "web.external_page.features.toolkit.tap" });
                    navigate(getRelativePath(feature_two_button_link));
                  }}
                >
                  <Translate path="directus.page_home.feature_two_button_text" />
                </Button>
              </Box>
            </FeaturesInfo>
          </FeaturesColumn>
          <FeaturesColumn>
            <FeaturesBoxImgTools
              image={{ ...feature_two_image.file.childImageSharp.gatsbyImageData, aspectRatio: 1176 / 1118 }}
              loading="eager"
              alt="ClassDojo app tools"
            />
          </FeaturesColumn>
        </FeatureContainer>

        <FeatureContainer flexDirection={["column-reverse", "row-reverse"]} height={["auto", "auto", 531]}>
          <FeaturesColumn>
            <FeaturesInfo textAlign="center">
              <FeaturesHeader>
                <Translate path="directus.page_home.feature_three_title" />
              </FeaturesHeader>
              <FeaturesText>
                <MarkedTranslate path="directus.page_home.feature_three_text" />
              </FeaturesText>
              <Box>
                <Button
                  big
                  onClick={() => {
                    logEvent({
                      eventValue: window.location.href,
                      eventName: "web.external_page.features.portfolio.tap",
                    });
                    navigate(getRelativePath(feature_three_button_link));
                  }}
                >
                  <Translate path="directus.page_home.feature_three_button_text" />
                </Button>
              </Box>
            </FeaturesInfo>
          </FeaturesColumn>
          <FeaturesColumn position="relative" height="100%">
            <FeaturesBoxImgPortfolio
              image={{ ...feature_three_image.file.childImageSharp.gatsbyImageData, aspectRatio: 1458 / 1043 }}
              loading="eager"
              alt="Tablet showing a ladybug picture"
            />
          </FeaturesColumn>
        </FeatureContainer>

        <FeatureContainer flexDirection={["column-reverse", "row-reverse"]} height={["auto", "auto", 531]}>
          <FeaturesColumn>
            <FeaturesInfo textAlign="center">
              <FeaturesHeader>
                <Translate path="directus.page_home.feature_four_title" />
              </FeaturesHeader>
              <FeaturesText>
                <MarkedTranslate path="directus.page_home.feature_four_text" />
              </FeaturesText>
              <Box>
                <Button big onClick={openVideoModal}>
                  <Translate path="directus.page_home.feature_four_button_text" />
                </Button>
              </Box>
            </FeaturesInfo>
          </FeaturesColumn>
          <FeaturesColumn>
            <FeaturesBoxImgVideoContainer onClick={openVideoModal}>
              <FeaturesBoxImgVideo
                image={{ ...feature_four_image.file.childImageSharp.gatsbyImageData, aspectRatio: 978 / 608 }}
                loading="eager"
                alt="Empty stage"
              />
              <VideoPlayButton
                image={videoPlayButton.childImageSharp.gatsbyImageData}
                loading="eager"
                alt="Play video"
              />
            </FeaturesBoxImgVideoContainer>
          </FeaturesColumn>
        </FeatureContainer>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
