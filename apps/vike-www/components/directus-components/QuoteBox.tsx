import React from "react";
import { Box, Flex } from "@src/components/Boxes";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";
import BackgroundImage from "gatsby-background-image";
import { graphql, useStaticQuery } from "gatsby";
import Container from "@src/components/Container";

const QuoteText = styled("p")`
  font-weight: 300;
  line-height: 35px;
  margin: 0 0 25px;
  font-size: 21px;
  text-align: center;

  ${mediaQueries[0]} {
    font-size: 25px;
  }
`;

const QuoteAuthor = styled("footer")`
  color: rgba(255, 255, 255, 0.9);
  display: block;
  font-weight: 600;
  line-height: 1.42857;
  font-size: 17px;

  ${mediaQueries[0]} {
    font-size: 20px;
  }
`;

const Quote = styled("blockquote")`
  border-width: 0;
  font-size: 20px;
  margin: 0;
  text-align: center;
  padding: 30px;

  ${mediaQueries[0]} {
    padding: 50px 25px;
  }
`;

const QuoteBoxStyled = styled(BackgroundImage)`
  box-shadow: rgba(0, 0, 0, 0.15) 0 2px 4px 1px;
  border-radius: 5px;
  overflow: hidden;
`;

type QuoteBoxProps = {
  text: string;
  author: string;
  color: "orange" | "purple" | "blue";
  container_background: string;
};
const QuoteBox: React.FC<QuoteBoxProps> = ({ text, author, color, container_background = "#ffffff" }) => {
  const data = useStaticQuery(graphql`
    {
      blueStars: file(name: { eq: "light-blue-stars@2x" }) {
        childImageSharp {
          gatsbyImageData(width: 920, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
      purpleStars: file(name: { eq: "purple-stars@2x" }) {
        childImageSharp {
          gatsbyImageData(width: 920, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
      orangeStars: file(name: { eq: "orange-stars@2x" }) {
        childImageSharp {
          gatsbyImageData(width: 920, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
    }
  `);

  const { blueStars, orangeStars, purpleStars } = data;
  let image, bgColor;
  switch (color) {
    case "orange":
      image = orangeStars;
      bgColor = "#fd6c36";
      break;
    case "blue":
      image = blueStars;
      bgColor = "#00a4ed";
      break;
    case "purple":
      image = purpleStars;
      bgColor = "#595b78";
      break;
  }

  return (
    <Box backgroundColor={container_background}>
      <Container>
        <Box py="60px">
          <QuoteBoxStyled
            image={image.childImageSharp.gatsbyImageData}
            css={css`
              background-position: center top !important;
              background-size: 991px 296px !important;
              background-color: ${bgColor};
              color: #fff;
            `}
          >
            <Flex width={["100%", "83%"]} mx="auto" flexDirection="column" alignItems="center">
              <Quote>
                <QuoteText>“{text}”</QuoteText>
                <QuoteAuthor>{author}</QuoteAuthor>
              </Quote>
            </Flex>
          </QuoteBoxStyled>
        </Box>
      </Container>
    </Box>
  );
};

export default QuoteBox;
