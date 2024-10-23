import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { Box, Flex } from "@src/components/Boxes";
import { graphql, useStaticQuery } from "gatsby";
import Container from "@src/components/Container";
import styled from "@emotion/styled";
import Button from "@src/components/Button";
import { mediaQueries } from "@src/styles/theme";
import { getRelativePath } from "@src/utils/routes";
import { Text } from "@src/components/Text";
import MarkedTranslate from "@src/components/translation/MarkedTranslate";
import Translate from "@src/components/translation/Translate";
import GatsbyImageWrapper from "@src/components/GatsbyImageWrapper";

const Header = styled("h2")`
  font-size: 36px;
  font-weight: 800;
  line-height: 1.3em;
  margin-bottom: 26px;
  margin-top: 22px;
  text-align: center;
`;

const BallPitImg = styled(GatsbyImageWrapper)`
  position: absolute !important;
  bottom: 0;
  right: 0;
  left: 0;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 100%;
  ${mediaQueries[2]} {
    max-width: 992px;
  }
`;

const BallsLeftImg = styled(GatsbyImageWrapper)`
  position: absolute !important;
  top: 0;
  left: 10px;
  width: 100%;
  max-width: 150px;
  ${mediaQueries[0]} {
    max-width: 187px;
  }
`;
const BallsRightImg = styled(GatsbyImageWrapper)`
  position: absolute !important;
  top: 0;
  right: 10px;
  width: 100%;
  max-width: 150px;
  ${mediaQueries[0]} {
    max-width: 259px;
  }
`;

const Quote = styled("blockquote")`
  border: none;
  border-image: none;
  color: #6666f2;
  margin: 0 auto;

  position: relative;
  text-align: center;
  width: 100%;
  footer {
    color: #6666f2;
    display: block;
    font-size: 22px;
    ${mediaQueries[0]} {
      font-size: 28px;
    }
    font-weight: 600;
    line-height: 1.42857;
  }

  font-size: 18px;
  max-width: 420px;
  padding: 11px 40px;
  ${mediaQueries[0]} {
    font-size: 24px;
    max-width: none;
    padding: 11px 80px;
  }
`;
const LeftQuote = styled("span")`
  font-size: 70px;
  ${mediaQueries[0]} {
    font-size: 96px;
  }
  left: 0;
  line-height: 1em;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;
const RightQuote = styled("span")`
  font-size: 70px;
  ${mediaQueries[0]} {
    font-size: 96px;
  }
  line-height: 1em;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;

function CallToActionSection() {
  const data = useStaticQuery(graphql`
    {
      ballpit: file(name: { eq: "ballpit@2x" }, relativePath: { regex: "/toolkit/" }) {
        childImageSharp {
          gatsbyImageData(width: 920, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
      ballsRight: file(name: { eq: "balls-right@2x" }, relativePath: { regex: "/toolkit/" }) {
        childImageSharp {
          gatsbyImageData(width: 480, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
      ballsLeft: file(name: { eq: "balls-left@2x" }, relativePath: { regex: "/toolkit/" }) {
        childImageSharp {
          gatsbyImageData(width: 480, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
    }
  `);
  const { ballpit, ballsRight, ballsLeft } = data;
  return (
    <Box as="section" position="relative" color="#363636">
      <Container paddingBottom="66px">
        <Quote>
          <LeftQuote>“</LeftQuote>
          <Text>
            <Translate path="directus.page_toolkit.quote_text" />
          </Text>
          <RightQuote>”</RightQuote>
          <footer>
            <Translate path="directus.page_toolkit.quote_signature" />
          </footer>
        </Quote>
      </Container>
      <Container>
        <BallsLeftImg image={ballsLeft} alt="Colorful spots" />
        <BallsRightImg image={ballsRight} alt="Colorful spots" />
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          paddingTop={["155px", "195px"]}
          paddingBottom={["35vw", "320px"]}
        >
          <Header>
            <Translate path="directus.page_toolkit.cta_title" />
          </Header>
          <Button big as="a" href={getRelativePath("/appcheck")}>
            <Translate path="directus.page_toolkit.cta_button_text" />
          </Button>
        </Flex>
      </Container>

      <BallPitImg image={ballpit} alt="Mojo in a ballpit" />
    </Box>
  );
}

export default CallToActionSection;
