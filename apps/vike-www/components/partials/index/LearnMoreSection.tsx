import * as React from "react";

import { Box, Flex } from "@src/components/Boxes";
import BackgroundImage from "gatsby-background-image";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import { css } from "@emotion/react";
import Button from "@src/components/Button";
import { graphql, useStaticQuery } from "gatsby";
import Translate from "@src/components/translation/Translate";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import { logEvent } from "@src/utils/logClient";
import window from "global/window";
import MarkedTranslate from "@src/components/translation/MarkedTranslate";
import GatsbyImageWrapper from "@src/components/GatsbyImageWrapper";

const SectionHeader = styled.h2`
  font-weight: 800;
  font-size: 24px;
  margin-top: 76px;
  margin-bottom: 52px;
  text-align: center;
  line-height: 40px;
`;

const FeatureBox = styled(Flex)`
  text-align: center;
  padding: 30px 19px;
  background: #fff;
  border: 1px solid transparent;
  box-shadow: 0 2px 4px rgba(201, 201, 201, 0.5);
  border-radius: 5px;
  margin-bottom: 20px;
  min-height: 20px;
  margin-left: 15px;
  margin-right: 15px;
  label: feature-box;
`;
FeatureBox.defaultProps = { width: ["fill-parent", 1 / 3], alignItems: "center", flexDirection: "column" };

const FeatureIcon = styled(GatsbyImageWrapper)`
  width: 100px;
  margin-bottom: 25px;
`;

const LearnMoreSectionStyled = styled(BackgroundImage)`
  background-color: #f5f5f3;

  width: 100%;
  background-repeat: no-repeat;
  background-position: center bottom;
  padding-bottom: 130px;
  background-size: 90%;

  @media (min-width: 768px) {
    background-size: 657px 115px !important;
    &:before,
    &:after {
      background-size: 657px 115px !important;
    }
  }
`;

type LearnMoreSectionType = {
  hideCta?: boolean;
};

const LearnMoreSection: React.FC<LearnMoreSectionType> = ({ hideCta }) => {
  const data = useStaticQuery(graphql`
    {
      directus {
        page_home {
          second_feature_section_one_icon {
            filename_disk
          }
          second_feature_section_two_icon {
            filename_disk
          }
          second_feature_section_three_icon {
            filename_disk
          }
        }
      }
      footerImage: file(name: { eq: "footer-image@2x" }) {
        childImageSharp {
          gatsbyImageData(placeholder: NONE, layout: FULL_WIDTH)
        }
      }
    }
  `);

  const {
    directus: {
      page_home: {
        second_feature_section_one_icon,
        second_feature_section_two_icon,
        second_feature_section_three_icon,
      },
    },
    footerImage,
  } = data;

  const modalContext = React.useContext(ModalContext);

  function openSignupModal() {
    logEvent({ eventValue: window.location.href, eventName: "web.external_page.page_end_sign_up.tap" });
    modalContext.showModal(ModalType.Signup);
  }

  return (
    <LearnMoreSectionStyled Tag="section" image={footerImage.childImageSharp.gatsbyImageData}>
      <Container>
        <Flex justifyContent="center" flexDirection="column">
          <SectionHeader>
            <Translate path="directus.page_home.second_feature_section_title" />
          </SectionHeader>
          <Flex flexDirection={["column", "row"]} width={11 / 12} mx="auto">
            <FeatureBox>
              <FeatureIcon image={second_feature_section_one_icon} loading="eager" alt="Cellphone icon" />
              <Box textAlign="center" width="100%">
                <MarkedTranslate path="directus.page_home.second_feature_section_one_text" />
              </Box>
            </FeatureBox>
            <FeatureBox>
              <FeatureIcon image={second_feature_section_two_icon} loading="eager" alt="Padlock icon" />
              <Box
                width="100%"
                textAlign="center"
                css={css`
                  a {
                    color: #00bcf2;
                    text-decoration: none;
                    font-weight: 600;
                    &:hover {
                      color: #00a8d9;
                    }
                    &:focus {
                      color: #00a8d9;
                    }
                  }
                `}
              >
                <MarkedTranslate path="directus.page_home.second_feature_section_two_text" />
              </Box>
            </FeatureBox>
            <FeatureBox>
              <FeatureIcon image={second_feature_section_three_icon} loading="eager" alt="Computer screen icon" />
              <Box textAlign="center" width="100%">
                <MarkedTranslate path="directus.page_home.second_feature_section_three_text" />
              </Box>
            </FeatureBox>
          </Flex>
          {!hideCta && (
            <Box textAlign="center">
              <SectionHeader>
                <Translate path="directus.page_home.cta_title" />
              </SectionHeader>
              <Button big onClick={openSignupModal}>
                <Translate path="directus.page_home.cta_button_text" />
              </Button>
            </Box>
          )}
        </Flex>
      </Container>
    </LearnMoreSectionStyled>
  );
};

export default LearnMoreSection;
