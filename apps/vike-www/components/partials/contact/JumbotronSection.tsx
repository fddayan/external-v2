import React from "react";
import BackgroundImage from "gatsby-background-image";
import { mediaQueries } from "@src/styles/theme";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Flex } from "@src/components/Boxes";
import Translate from "@src/components/translation/Translate";
import { graphql, useStaticQuery } from "gatsby";

const JumbotronHeader = styled("h1")`
  font-size: 36px;
  margin: 0;
  text-shadow: 2px 2px 2px rgba(4, 76, 102, 0.5);
  color: #fff;
  line-height: 1.1;
  font-weight: 400;
  z-index: 3;
  ${mediaQueries[0]} {
    font-weight: 800;
    font-size: 53px;
  }
`;

const JumbotronSection = () => {
  const data = useStaticQuery(graphql`
    {
      background: file(name: { eq: "contact-us@2x" }) {
        childImageSharp {
          gatsbyImageData(quality: 90, placeholder: NONE, layout: FULL_WIDTH)
        }
      }
    }
  `);

  const { background } = data;

  return (
    <BackgroundImage
      as="section"
      image={background.childImageSharp.gatsbyImageData}
      backgroundColor={"#2cbcf9"}
      css={css`
        height: 200px;
        ${mediaQueries[0]} {
          height: 400px;
        }
      `}
    >
      <Flex justifyContent="center" alignItems="center" height="100%" backgroundColor={["#2cbcf9", "transparent"]}>
        <JumbotronHeader>
          <Translate path="directus.page_contact.page_title" />
        </JumbotronHeader>
      </Flex>
    </BackgroundImage>
  );
};

export default JumbotronSection;
