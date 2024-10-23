import React, { useContext } from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { Fade } from "react-slideshow-image";
import { Box, Flex } from "@src/components/Boxes";
import { graphql, useStaticQuery } from "gatsby";
import { css } from "@emotion/react";
import Container from "@src/components/Container";
import { Text } from "@src/components/Text";
import styled from "@emotion/styled";
import Button from "@src/components/Button";
import { mediaQueries } from "@src/styles/theme";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import Translate from "@src/components/translation/Translate";
import MarkedTranslate from "@src/components/translation/MarkedTranslate";

const Header = styled("h1")`
  box-sizing: border-box;
  font-weight: 800;
  text-align: center;
  margin: 40px 0 40px;
  color: #363636;

  font-size: 28px;
  line-height: 28px;

  ${mediaQueries[0]} {
    margin: 60px 0 40px;
    text-align: left;
    font-size: 48px;
    line-height: 52px;
  }
`;

const SlideText = styled("h2")`
  box-sizing: border-box;
  font-weight: 700;
  margin: 10px 0 0;
  text-align: center;
  transition: all 0.5s;
  width: 100%;
  font-size: 16px;
`;

const SliderImage = styled("img")`
  max-width: 100%;
  width: 500px;
  height: auto;
`;
const SliderContainer = styled("div")`
  width: 100%;
  margin-bottom: 20px;
  ${mediaQueries[0]} {
    margin-bottom: 0;
  }

  .each-slide > div {
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
  }

  .each-slide span {
    padding: 20px;
    font-size: 20px;
    background: #efefef;
    text-align: center;
  }

  .each-fade {
    display: flex;
  }

  .each-fade .image-container {
    width: 100%;
    overflow: hidden;
  }

  .each-fade .image-container img {
    width: 100%;
  }

  .react-slideshow-container .nav {
    display: none;
  }

  .react-slideshow-container + ul.indicators {
    padding: 0;
  }

  .react-slideshow-container + ul.indicators li {
    margin: 0 10px;
  }

  .react-slideshow-container + ul.indicators button.each-slideshow-indicator:before {
    cursor: pointer;
    height: 10px;
    background: rgb(198, 198, 198) none repeat scroll 0 0;
    border-radius: 100px;
    display: inline-block;
    width: 10px;
    margin-right: 20px;
  }

  .react-slideshow-container + ul.indicators button.each-slideshow-indicator.active:before {
    background: rgb(0, 174, 239) none repeat scroll 0 0;
  }
`;

function HeroSection() {
  const data = useStaticQuery(graphql`
    {
      right: file(name: { eq: "header-right" }, relativePath: { regex: "/studentstories/" }) {
        childImageSharp {
          gatsbyImageData(width: 920, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
      left: file(name: { eq: "header-left" }, relativePath: { regex: "/studentstories/" }) {
        childImageSharp {
          gatsbyImageData(width: 920, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
      directus {
        page_student_stories {
          hero_slider_items
        }
      }
    }
  `);
  const {
    right,
    left,
    directus: {
      page_student_stories: { hero_slider_items },
    },
  } = data;
  const modalContext = useContext(ModalContext);

  function showSignupModal() {
    modalContext.showModal(ModalType.Signup);
  }

  return (
    <Box as="section" position="relative" width="100vw" paddingTop="60px" display="block">
      <GatsbyImage
        image={left.childImageSharp.gatsbyImageData}
        css={css`
          z-index: -2;
          top: 0;
          position: absolute !important;
          left: 0;
          display: block;
          max-width: 551px;
          width: 100%;
          height: auto;
        `}
        alt="Watercolor spots"
      />
      <GatsbyImage
        image={right.childImageSharp.gatsbyImageData}
        css={css`
          z-index: -2;
          top: 0;
          position: absolute !important;
          right: 0;
          display: block;
          max-width: 551px;
          width: 100%;
          height: auto;
        `}
        alt="Watercolor spots"
      />
      <Container
        css={css`
          box-shadow: -5px 5px 2px 1px rgba(0, 0, 0, 0.2);
          max-width: 1024px;
          width: 80%;

          border-radius: 10px;
          padding: 0 20px;
          background: #fff;
          margin-top: 20px;
          margin-left: auto;
          margin-right: auto;
          ${mediaQueries[0]} {
            width: 750px;
          }
          ${mediaQueries[1]} {
            width: 970px;
            padding: 0 50px;
          }
          ${mediaQueries[2]} {
            width: 1170px;
          }
        `}
      >
        <Flex flexWrap="wrap" height="100%">
          <Flex width={["100%", "50%"]}>
            <Flex
              flexDirection="column"
              alignItems={["center", "start"]}
              justifyContent="center"
              textAlign={["center", "left"]}
              mx="auto"
            >
              <Header>
                <MarkedTranslate path="directus.page_student_stories.page_title" />
              </Header>
              <Text textAlign={["center", "left"]}>
                <MarkedTranslate path="directus.page_student_stories.page_subtitle" />
              </Text>
              <Button marginTop={["25px", "30px"]} marginBottom={["40px", "60px"]} onClick={showSignupModal}>
                <Translate path="directus.page_student_stories.page_hero_button_text" />
              </Button>
            </Flex>
          </Flex>
          <Flex width={["100%", "50%"]} flexDirection="column" alignItems="center" justifyContent="center">
            <SliderContainer>
              <Fade
                {...{
                  duration: 10000,
                  transitionDuration: 500,
                  infinite: true,
                  indicators: true,
                  autoplay: true,
                }}
              >
                {hero_slider_items.map((item, index) => (
                  <div key={`hero-slider-${index}`} className="each-fade">
                    <div className="image-container">
                      <SliderImage src={item["gif url"]} alt="" />
                      <SlideText>
                        <Translate path={`directus.page_student_stories.hero_slider_items.text_${index + 1}`} />
                      </SlideText>
                    </div>
                  </div>
                ))}
              </Fade>
            </SliderContainer>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

export default HeroSection;
