import React, { useContext } from "react";
import { mediaQueries } from "@src/styles/theme";
import styled from "@emotion/styled";
import { Flex } from "@src/components/Boxes";
import Container from "@src/components/Container";
import Translate from "@src/components/translation/Translate";
import { graphql, useStaticQuery } from "gatsby";
import FeatureItem from "./FeatureItem";
import { Text } from "@src/components/Text";
import { BodyText } from "@src/components/nessie-web";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { marked } from "marked";
import MarkedTranslate from "@src/components/translation/MarkedTranslate";

const Header = styled("h2")`
  text-align: center;
  font-family: DojoDisplay !important;
  padding-top: 25px;
  margin-top: 0;
  font-weight: 800;
  font-size: 40px;
  color: ${(props: any) => props.theme.colors.text};
  line-height: 32px;
  ${mediaQueries[2]} {
    line-height: 40px;
  }
`;

const Link = styled.a`
  display: inline;
  text-align: left;
  /* width: 100%; */
  font-weight: 400;
  color: #00bcf2;
  text-decoration: none;
  cursor: pointer;
  &:hover,
  &:focus {
    text-decoration: none;
    color: #00a8d9;
  }
  padding-left: 2px;
  padding-right: 2px;
`;

const StandardsSection = () => {
  const data = useStaticQuery(graphql`
    {
      standards_5_image: file(
        relativePath: { eq: "privacycenter/standards-5.png" }
      ) {
        publicURL
      }
      directus {
        page_privacy {
          standards_1_link
          standards_2_link
          standards_3_link
          standards_4_link
          standards_1_image {
            filename_disk
          }
          standards_2_image {
            filename_disk
          }
          standards_3_image {
            filename_disk
          }
          standards_4_image {
            filename_disk
          }
          standards_5_imagev2 {
            filename_disk
          }
        }
      }
    }
  `);

  const {
    directus: {
      page_privacy: {
        standards_1_image,
        standards_2_image,
        standards_3_image,
        standards_4_image,
        standards_5_imagev2,
        standards_1_link,
        standards_2_link,
        standards_3_link,
        standards_4_link,
      },
    },
  } = data;
  const t = useContext(TranslationContext);

  return (
    <Flex
      as="section"
      flexDirection="column"
      paddingTop="66px"
      backgroundColor="#fff"
    >
      <Container>
        <Header>
          <Translate path="directus.page_privacycenter.standards_title" />
        </Header>
        <div css={{ textAlign: "center", marginTop: 24 }}>
          <MarkedTranslate
            path="directus.page_privacycenter.standards_subtitle"
            Component={BodyText}
          />
        </div>
      </Container>
      <Container>
        <Flex
          flexWrap="wrap"
          justifyContent="center"
          alignItems="start"
          width="100%"
          maxWidth={["100%"]}
          marginX="auto"
          paddingTop="80px"
        >
          <FeatureItem
            width={["100%", 1 / 3]}
            image={standards_1_image}
            header={
              <>
                <Translate path="directus.page_privacycenter.standards_1_title" />
                <sup>
                  (
                  <Link href={standards_1_link} target="_new">
                    ?
                  </Link>
                  )
                </sup>
              </>
            }
            text={
              <>
                <MarkedTranslate
                  path="directus.page_privacycenter.standards_1_text"
                  Component={Text}
                />
              </>
            }
          />

          <FeatureItem
            width={["100%", 1 / 3]}
            image={standards_2_image}
            header={
              <>
                <Translate path="directus.page_privacycenter.standards_2_title" />
                <sup>
                  (
                  <Link href={standards_2_link} target="_new">
                    ?
                  </Link>
                  )
                </sup>
              </>
            }
            text={
              <>
                <MarkedTranslate
                  path="directus.page_privacycenter.standards_2_text"
                  Component={Text}
                />
              </>
            }
          />

          <FeatureItem
            width={["100%", 1 / 3]}
            image={standards_3_image}
            header={
              <>
                <Translate path="directus.page_privacycenter.standards_3_title" />
                <sup>
                  (
                  <Link href={standards_3_link} target="_new">
                    ?
                  </Link>
                  )
                </sup>
              </>
            }
            text={
              <>
                <MarkedTranslate
                  path="directus.page_privacycenter.standards_3_text"
                  Component={Text}
                />
              </>
            }
          />

          <FeatureItem
            width={["100%", 1 / 3]}
            image={standards_4_image}
            header={
              <>
                <Translate path="directus.page_privacycenter.standards_4_title" />
                <sup>
                  (
                  <Link href={standards_4_link} target="_new">
                    ?
                  </Link>
                  )
                </sup>
              </>
            }
            text={
              <>
                <MarkedTranslate
                  path="directus.page_privacycenter.standards_4_text"
                  Component={Text}
                />
              </>
            }
          />
          <FeatureItem
            width={["100%", 1 / 3]}
            image={standards_5_imagev2}
            header={
              <>
                <Translate path="directus.page_privacycenter.standards_5_title" />
              </>
            }
            text={
              <>
                <MarkedTranslate
                  path="directus.page_privacycenter.standards_5_text"
                  Component={Text}
                />
              </>
            }
          />
        </Flex>
      </Container>
    </Flex>
  );
};

export default StandardsSection;
