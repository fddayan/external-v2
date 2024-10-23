import React, { useContext } from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { mediaQueries } from "@src/styles/theme";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Box, Flex } from "@src/components/Boxes";
import Container from "@src/components/Container";
import Translate from "@src/components/translation/Translate";
import { graphql, useStaticQuery } from "gatsby";
import { Text } from "@src/components/Text";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import marked from "marked";
import MarkedTranslate from "@src/components/translation/MarkedTranslate";

const Header = styled("h2")`
  text-align: center;
  font-family: DojoDisplay !important;
  display: block;
  width: 100%;
  padding: 36px 0 52px 0;
  margin-top: 0;
  font-weight: 800;
  font-size: 40px;
  color: ${(props: any) => props.theme.colors.text};
  line-height: 32px;
  ${mediaQueries[2]} {
    line-height: 40px;
  }
`;

const NoteSection = () => {
  const data = useStaticQuery(graphql`
    {
      iKeepSafeCoppa: file(name: { eq: "iKeepSafe-COPPA-seal" }) {
        childImageSharp {
          gatsbyImageData(width: 83, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
      iKeepSafeFerpa: file(name: { eq: "iKeepSafe-FERPA-seal" }) {
        childImageSharp {
          gatsbyImageData(width: 83, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
      studentPrivacy: file(name: { eq: "student-privacy-pledge-signatory-badge" }) {
        childImageSharp {
          gatsbyImageData(width: 128, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
      trusteSeal: file(name: { eq: "truste-seal" }) {
        childImageSharp {
          gatsbyImageData(width: 198, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
    }
  `);

  const { iKeepSafeCoppa, iKeepSafeFerpa, studentPrivacy, trusteSeal } = data;
  const t = useContext(TranslationContext);

  return (
    <Box as="section">
      <Container>
        <Flex
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          marginY="50px"
          css={css`
            & > a,
            & > div {
              margin: 7.5px;
            }
          `}
        >
          <GatsbyImage
            image={iKeepSafeCoppa.childImageSharp.gatsbyImageData}
            alt="Keep safe privacy safe harbor COPPA badge"
          />
          <GatsbyImage image={iKeepSafeFerpa.childImageSharp.gatsbyImageData} alt="Keep safe privacy FERPA badge" />
          <GatsbyImage image={studentPrivacy.childImageSharp.gatsbyImageData} alt="Student Privacy Pledge Signatory" />
        </Flex>
        <Flex flexDirection="column" marginBottom="50px">
          <Header>
            <Translate path="directus.page_privacycenter.note_heading" />
          </Header>
          <Box width={[10 / 12, 8 / 12]} mx="auto">
            <Text>
              <MarkedTranslate path="directus.page_privacycenter.note_body_1" />
              <br /> <br />
              <ul>
                <li>
                  <Translate path="directus.page_privacycenter.bullets.bullet_1" />
                </li>
                <li>
                  <Translate path="directus.page_privacycenter.bullets.bullet_2" />
                </li>
                <li>
                  <Translate path="directus.page_privacycenter.bullets.bullet_3" />
                </li>
                <li>
                  <Translate path="directus.page_privacycenter.bullets.bullet_4" />
                </li>
                <li>
                  <Translate path="directus.page_privacycenter.bullets.bullet_5" />
                </li>
                <li>
                  <Translate path="directus.page_privacycenter.bullets.bullet_6" />
                </li>
              </ul>
              <br />
              <MarkedTranslate path="directus.page_privacycenter.note_body_2" />
            </Text>
            <Text textAlign="center">
              <Translate path="directus.page_privacycenter.signature" />
            </Text>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default NoteSection;
