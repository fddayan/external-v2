import * as React from "react";

import { Box, Flex } from "@src/components/Boxes";
import styled from "@emotion/styled";
import { HeaderStyles } from "@src/components/Text";
import Container from "@src/components/Container";
import { css } from "@emotion/react";
import { graphql, useStaticQuery } from "gatsby";
import Translate from "@src/components/translation/Translate";
import GatsbyImageWrapper from "@src/components/GatsbyImageWrapper";

const BoxesContainer = styled(Flex)`
  padding-top: 122px;
`;
BoxesContainer.defaultProps = {
  flexDirection: ["column", "row"],
  width: ["100%"],
  maxWidth: [415, "100%", "100%", "83%"],
};

const InfoBox = styled(Flex)`
  position: relative;
  max-width: none;
  background: #fff;
  border: 1px solid #f0f0f0;
  padding: 30px;
  margin-bottom: 60px;
`;
InfoBox.defaultProps = { flexDirection: "column", alignItems: "center", width: ["100%", 1 / 3], textAlign: "center" };

const InfoBoxImg = styled(GatsbyImageWrapper)`
  position: absolute;
  display: flex;
  left: 0;
  right: 0;
  top: -60px;
  width: 75px;
`;
InfoBoxImg.defaultProps = { loading: "eager" };

const InfoBoxHeader = styled("h3")`
  font-size: 18px;
  line-height: 24px;
  color: #363636;
  margin-top: -30px;
  margin-bottom: 11px;
  font-weight: 800;
  width: 100%;
`;

const InfoBoxText = styled("p")`
  font-size: 16px;
  color: #363636;
  width: 100%;
`;

const Heading = HeaderStyles.withComponent("p");
Heading.defaultProps = { lineHeight: 2, fontSize: ["22px", "28px"], fontWeight: 400 };

const MainBannerSection: React.FC = ({ children }) => {
  const data = useStaticQuery(graphql`
    {
      directus {
        page_home {
          main_banner_one_image {
            filename_disk
          }
          main_banner_two_image {
            filename_disk
          }
          main_banner_three_image {
            filename_disk
          }
        }
      }
    }
  `);

  const {
    directus: {
      page_home: { main_banner_one_image, main_banner_two_image, main_banner_three_image },
    },
  } = data;

  return (
    <Box as="section" bg="#f5f5f3">
      <div
        id="LearnMore"
        css={css`
          visibility: hidden;
          margin-bottom: 132px;
        `}
      >
        LearnMore
      </div>
      <Container>
        <Flex flexDirection="column" alignItems="center">
          <Box maxWidth={499} marginBottom={20} textAlign="center">
            <Heading color="#363636">
              <Translate path="directus.page_home.main_banner_title" />
            </Heading>
            {children}
          </Box>
          <BoxesContainer>
            <InfoBox>
              <InfoBoxImg image={main_banner_one_image} alt="Heart icon" />
              <InfoBoxHeader>
                <Translate path="directus.page_home.main_banner_one_title" />
              </InfoBoxHeader>
              <InfoBoxText>
                <Translate path="directus.page_home.main_banner_one_text" />
              </InfoBoxText>
            </InfoBox>
            <InfoBox>
              <InfoBoxImg image={main_banner_two_image} alt="Mojo icon" />
              <InfoBoxHeader>
                <Translate path="directus.page_home.main_banner_two_title" />
              </InfoBoxHeader>
              <InfoBoxText>
                <Translate path="directus.page_home.main_banner_two_text" />
              </InfoBoxText>
            </InfoBox>
            <InfoBox>
              <InfoBoxImg image={main_banner_three_image} alt="Mojo picture icon" />
              <InfoBoxHeader>
                <Translate path="directus.page_home.main_banner_three_title" />
              </InfoBoxHeader>
              <InfoBoxText>
                <Translate path="directus.page_home.main_banner_three_text" />
              </InfoBoxText>
            </InfoBox>
          </BoxesContainer>
        </Flex>
      </Container>
    </Box>
  );
};

export default MainBannerSection;
