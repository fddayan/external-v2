import * as React from "react";
import styled from "@emotion/styled";
import { Box, Flex } from "@src/components/Boxes";
import Container from "@src/components/Container";
import { mediaQueries } from "@src/styles/theme";
import Translate from "@src/components/translation/Translate";
import { BodyText, Title, DetailText } from "@src/components/nessie-web";
import HeroMojo from "@src/assets/images/beyond-lp/hero-mojo.svg";
import GrapeBg from "@src/assets/images/beyond-lp/grape-bg.svg";
import TestimonialBg from "@src/assets/images/beyond-lp/testimonial-bg.svg";

const InfoBox = styled(Flex)`
  position: relative;
  max-width: none;
  background: #fff;
  margin-bottom: 20px;
  margin-left: 0;
  ${mediaQueries[0]} {
    margin-left: 40px;
    align-items: center;
  }
`;
InfoBox.defaultProps = {
  flexDirection: "column",
  alignItems: ["center", "center", "start"],
};

const HeroSectionStyled = styled(Box)`
  padding-bottom: 40px;
  background-image: url(${GrapeBg});
  background-color: #eaecf5;
  background-position: center top;
  background-size: 6000px;
  background-repeat: no-repeat;
  overflow: hidden;
  ${mediaQueries[1]} {
    background-size: auto;
  }
  ${mediaQueries[2]} {
    background-size: auto;
  }
`;

HeroSectionStyled.defaultProps = {};

const InfoBoxTitle = styled("h1")`
  color: white;
  font-size: 36px;
  text-align: center;
  padding-top: 50px;
  font-weight: 800;
  ${mediaQueries[2]} {
    min-width: 550px;
  }
`;
const Subtitle = styled("h3")`
  color: white;
  font-size: 18px;
  text-align: center;
  margin-bottom: 22px;
  @media (max-width: 577px) {
    font-size: 20px;
  }
  font-weight: bold;
`;

const Testimonials = styled("div")`
  font-size: 15px;
  color: white;
  text-align: center;
  position: relative;
  &:before {
    display: block;
    content: "";
    background-image: url(${TestimonialBg});
    width: 975px;
    height: 337px;
    position: absolute;
    left: -366px;
    top: -70px;
  }
`;

const StarsSpan = styled("span")`
  display: block;
`;

interface HeroScetionProps {
  topTitleTranslation: string;
  topSubtitleTranslation: string;
  heroTitleTranslation: string;
  heroTextTranslation: string;
  quoteTextTranslation?: string;
  heroImage: string;
}
const HeroSection: React.FC<HeroScetionProps> = ({
  topTitleTranslation,
  topSubtitleTranslation,
  heroTitleTranslation,
  heroTextTranslation,
  quoteTextTranslation,
  heroImage,
}) => {
  return (
    <HeroSectionStyled>
      <Container>
        <Flex justifyContent="space-between" flexDirection={["column", "row", "row"]}>
          <Box>
            <InfoBoxTitle>
              <Translate path={topTitleTranslation} />
            </InfoBoxTitle>
            <Subtitle>
              <Translate path={topSubtitleTranslation} />
            </Subtitle>
            <Flex justifyContent="center" alignItems="center" position="relative" zIndex={1}>
              <Box>
                <a
                  href="https://itunes.apple.com/us/app/classdojo/id552602056"
                  aria-label="Click to download app on iTunes"
                >
                  <img src="https://static.classdojo.com/img/mobile-web/download-app-store.svg" height={54} alt="" />
                </a>
              </Box>
              <Box>
                <a
                  href="https://play.google.com/store/apps/details?id=com.classdojo.android"
                  aria-label="Click to download app on Play Store"
                >
                  <img
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                    height={80}
                    alt=""
                  />
                </a>
              </Box>
            </Flex>
            <Flex
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              maxWidth="400px"
              marginTop={20}
              marginX="auto"
            >
              <Testimonials>
                <Box position="relative">
                  {/*eslint-disable-next-line jsx-a11y/accessible-emoji*/}
                  <StarsSpan role="img" aria-label="5 out of 5 stars review">
                    ⭐⭐⭐⭐⭐
                  </StarsSpan>
                  <DetailText color="white">
                    <Translate path={quoteTextTranslation} />
                    <br />
                    <br />
                    @thatcookingmama
                  </DetailText>
                </Box>
              </Testimonials>
            </Flex>
          </Box>
          <Box marginTop={60}>
            <img src={HeroMojo} alt="Astronaut Mojo" />
          </Box>
        </Flex>
      </Container>
      <Container marginTop={[`120, 40`]}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          flexDirection={["column", "column", "row"]}
          marginTop="100px"
        >
          <Box marginRight={[0, 0, 60]} textAlign={["center", "left", "left"]}>
            <Title>
              <Translate path={heroTitleTranslation} />
            </Title>
            <br />
            <BodyText>
              <Translate path={heroTextTranslation} />
            </BodyText>
          </Box>
          <Box width="400px" minWidth="400px" marginTop={[40, 0, 0]} textAlign={["center", "right"]}>
            <img src={heroImage} alt="Monster props" />
          </Box>
        </Flex>
      </Container>
    </HeroSectionStyled>
  );
};

HeroSection.defaultProps = { quoteTextTranslation: "directus.page_home_monsters.section_1_quote" };

export default HeroSection;
