import React from "react";
import { Flex } from "@src/components/Boxes";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { mediaQueries } from "@src/styles/theme";
import Translate from "@src/components/translation/Translate";

const Header = styled("h1")`
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.14);
  color: #fff;
  font-size: 31px;
  line-height: 1.1;
  font-weight: 400;
  z-index: 3;
  text-align: center;
  ${mediaQueries[0]} {
    font-weight: 800;
    font-size: 52.8px;
  }
  margin: 0 auto;
  max-width: 800px;
`;

const HeaderSection: React.FC = () => {
  const data = useStaticQuery(graphql`
    {
      left: file(name: { eq: "teacher_resources-left@2x" }) {
        childImageSharp {
          gatsbyImageData(width: 387, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
      right: file(name: { eq: "teacher_resources-right@2x" }) {
        childImageSharp {
          gatsbyImageData(width: 387, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
    }
  `);

  const { left, right } = data;

  return (
    <Flex
      height="100px"
      position="relative"
      justifyContent="center"
      alignItems="center"
      backgroundColor={["#00aeef", "#b3925d"]}
      width="100%"
      overflow="hidden"
      css={css`
        ${mediaQueries[0]} {
          height: 200px;
        }
      `}
    >
      <GatsbyImage
        image={left.childImageSharp.gatsbyImageData}
        css={css`
          position: absolute !important;
          width: 387px;
          left: 0;
          top: 0;
          z-index: 2;
          display: none;
          ${mediaQueries[0]} {
            display: block;
          }
        `}
        alt="Mojo polaroids"
      />
      <GatsbyImage
        image={right.childImageSharp.gatsbyImageData}
        css={css`
          position: absolute !important;
          width: 387px;
          right: 0;
          top: 0;
          z-index: 1;
          display: none;
          ${mediaQueries[0]} {
            display: block;
          }
        `}
        alt="Coffee mug"
      />
      <Header>
        <Translate path="directus.page_remotelearninglp.title" />
      </Header>
    </Flex>
  );
};

export default HeaderSection;
