import React, { useState } from "react";

import { graphql, useStaticQuery } from "gatsby";
import { Box, Flex } from "@src/components/Boxes";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import { css } from "@emotion/react";
import Button from "@src/components/Button";
import scrollTo from "gatsby-plugin-smoothscroll";
import { mediaQueries } from "@src/styles/theme";
import MarkedTranslate from "@src/components/translation/MarkedTranslate";
import GatsbyImageWrapper from "@src/components/GatsbyImageWrapper";

const LettersImg = styled(GatsbyImageWrapper)`
  position: absolute !important;
  left: 5%;
  width: 20%;
  height: auto;
  top: 50px;
`;

const BicycleImg = styled(GatsbyImageWrapper)`
  position: absolute !important;
  left: 5%;
  bottom: 0;
  width: 20%;
  height: auto;
`;
const Letter = styled(Box)`
  h3 {
    font-size: 21px;
    font-weight: 800;
    line-height: 24px;
    margin-bottom: 30px;
    margin-top: 22px;
    text-align: center;
    color: #363636;
  }
  a {
    font-weight: 600;
    color: #00bcf2;
    :hover {
      color: #00a8d9;
    }
  }
`;

const LettersHeader = styled("h3")``;

const Link = styled("a")`
  font-weight: 600;
  color: #00bcf2;
  :hover {
    color: #00a8d9;
  }
`;

const ContentContainer = styled("div")<{ opened: boolean }>(
  css`
    position: relative;
    padding: 50px 70px;
    margin: 30px 0 0 auto;
    border-radius: 5px;
    background-color: #fff;
    overflow: hidden;
    width: 100%;
    ${mediaQueries[0]} {
      width: 66%;
    }
  `,
  (props) =>
    props.opened
      ? css`
          height: auto;
        `
      : css`
          height: 600px;
        `,
);

const ReadMoreContainer = styled("div")(
  css`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    width: 100%;
    padding: 0 70px;
    height: 70px;
    background: rgba(255, 255, 255, 0.9);
    bottom: 0;
  `,
);
const ReadLessContainer = styled("div")(
  css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    ${mediaQueries[0]} {
      width: 66%;
    }
    padding: 0 70px;
    margin-left: auto;
    height: 160px;
  `,
);
const ReadMoreButton = styled(Button)`
  background: #8a87f9;
  color: white;
  font-weight: 600;
  padding: 10px 30px;
  font-size: 12px;
  border: none;
  :hover,
  :focus {
    background: #8a87f9;
  }
`;

const TabChooser = styled("div")(
  css`
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
  `,
);
const TabChooserImg = styled(GatsbyImageWrapper)<{ selected: boolean }>(
  css`
    margin-left: auto;
    margin-right: auto;
    width: 80%;
    box-sizing: border-box;
  `,
  (props) =>
    props.selected
      ? css`
          border: 4px solid #00aeef;
        `
      : null,
);

function PortfolioSection() {
  const data = useStaticQuery(graphql`
    {
      directus {
        page_student_stories {
          portfolios_upper_image {
            filename_disk
          }
          portfolios_bottom_image {
            filename_disk
          }
          portfolio_one_selector {
            filename_disk
          }
          portfolio_two_selector {
            filename_disk
          }
          portfolio_three_selector {
            filename_disk
          }
        }
      }
    }
  `);
  const [opened, setOpened] = useState(false);
  const [tabSelected, setTabSelected] = useState(1);

  function selectTab(number) {
    setTabSelected(number);
    scrollTo("#letters");
  }

  const {
    directus: {
      page_student_stories: {
        portfolios_upper_image,
        portfolios_bottom_image,
        portfolio_one_selector,
        portfolio_two_selector,
        portfolio_three_selector,
      },
    },
  } = data;
  return (
    <Box as="section" id="letters">
      <Box
        backgroundColor={tabSelected === 1 ? "#FFD235" : tabSelected === 2 ? "rgb(3, 208, 215)" : "rgb(148, 177, 255)"}
      >
        <Container paddingTop="50px" overflow="auto">
          <LettersImg image={portfolios_upper_image} alt="Letters from portfolio-loving teachers" />
          <BicycleImg image={portfolios_bottom_image} alt="Mojo riding a bicycle" />
          <ContentContainer opened={opened}>
            {tabSelected === 1 && (
              <Letter>
                <MarkedTranslate path="directus.page_student_stories.portfolios_one_text" />
              </Letter>
            )}
            {tabSelected === 2 && (
              <Letter>
                <MarkedTranslate path="directus.page_student_stories.portfolios_two_text" />
              </Letter>
            )}
            {tabSelected === 3 && (
              <Letter>
                <MarkedTranslate path="directus.page_student_stories.portfolios_three_text" />
              </Letter>
            )}

            {!opened && (
              <ReadMoreContainer>
                <ReadMoreButton onClick={() => setOpened(true)}>Read More</ReadMoreButton>
              </ReadMoreContainer>
            )}
          </ContentContainer>
          {opened && (
            <ReadLessContainer>
              <ReadMoreButton onClick={() => setOpened(false)}>Read Less</ReadMoreButton>
            </ReadLessContainer>
          )}
        </Container>
      </Box>
      <Container>
        <Flex flexWrap="wrap" paddingY="50px">
          <Box width={["100%", "33%"]}>
            <TabChooser onClick={() => selectTab(1)}>
              <TabChooserImg image={portfolio_one_selector} selected={tabSelected === 1} alt="letter 1" />
            </TabChooser>
          </Box>
          <Box width={["100%", "33%"]}>
            <TabChooser onClick={() => selectTab(2)}>
              <TabChooserImg image={portfolio_two_selector} selected={tabSelected === 2} alt="letter 2" />
            </TabChooser>
          </Box>
          <Box width={["100%", "33%"]}>
            <TabChooser onClick={() => selectTab(3)}>
              <TabChooserImg image={portfolio_three_selector} selected={tabSelected === 3} alt="letter 3" />
            </TabChooser>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default PortfolioSection;
