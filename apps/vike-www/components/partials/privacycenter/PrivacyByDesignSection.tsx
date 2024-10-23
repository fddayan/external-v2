import React, { useContext } from "react";
import { mediaQueries } from "@src/styles/theme";
import styled from "@emotion/styled";
import { Flex } from "@src/components/Boxes";
import Container from "@src/components/Container";
import Translate from "@src/components/translation/Translate";
import { graphql, useStaticQuery } from "gatsby";
import { Text } from "@src/components/Text";
import FeatureItem from "./FeatureItem";
import { marked } from "marked";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import MarkedTranslate from "@src/components/translation/MarkedTranslate";

const Link = styled.a`
  display: inline;
  text-align: left;
  /* width: 100%; */
  font-weight: 600;
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

const PrivacyByDesignSection = () => {
  const data = useStaticQuery(graphql`
    {
      directus {
        page_privacy {
          privacy_1_link
          privacy_2_link
          privacy_3_link
          privacy_4_link
          privacy_5_link
          privacy_1_image {
            filename_disk
          }
          privacy_2_image {
            filename_disk
          }
          privacy_3_image {
            filename_disk
          }
          privacy_4_image {
            filename_disk
          }
          privacy_5_image {
            filename_disk
          }
        }
      }
    }
  `);

  const {
    directus: {
      page_privacy: {
        privacy_1_image,
        privacy_2_image,
        privacy_3_image,
        privacy_4_image,
        privacy_5_image,
        privacy_1_link,
        privacy_2_link,
        privacy_3_link,
        privacy_4_link,
        privacy_5_link,
      },
    },
  } = data;
  const t = useContext(TranslationContext);

  return (
    <Flex
      as="section"
      flexDirection="column"
      paddingY="66px"
      backgroundColor="#fff"
    >
      <Header>
        <Translate path="directus.page_privacycenter.privacy_title" />
      </Header>
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
            image={privacy_1_image}
            header={
              <>
                <Translate path="directus.page_privacycenter.privacy_1_title" />
                <sup>
                  (
                  <Link href={privacy_1_link} target="_blank">
                    ?
                  </Link>
                  )
                </sup>
              </>
            }
            text={
              <>
                <MarkedTranslate
                  path="directus.page_privacycenter.privacy_1_text"
                  Component={Text}
                />
              </>
            }
          />

          <FeatureItem
            image={privacy_2_image}
            header={
              <>
                <Translate path="directus.page_privacycenter.privacy_2_title" />
                <sup>
                  (
                  <Link href={privacy_2_link} target="_blank">
                    ?
                  </Link>
                  )
                </sup>
              </>
            }
            text={
              <>
                <MarkedTranslate
                  path="directus.page_privacycenter.privacy_2_text"
                  Component={Text}
                />
              </>
            }
          />

          <FeatureItem
            image={privacy_3_image}
            header={
              <>
                <Translate path="directus.page_privacycenter.privacy_3_title" />
                <sup>
                  (
                  <Link href={privacy_3_link} target="_new">
                    ?
                  </Link>
                  )
                </sup>
              </>
            }
            text={
              <>
                <MarkedTranslate
                  path="directus.page_privacycenter.privacy_3_text"
                  Component={Text}
                />
              </>
            }
          />

          <FeatureItem
            image={privacy_4_image}
            header={
              <>
                <Translate path="directus.page_privacycenter.privacy_4_title" />
                <sup>
                  (
                  <Link href={privacy_4_link} target="_new">
                    ?
                  </Link>
                  )
                </sup>
              </>
            }
            text={
              <>
                <MarkedTranslate
                  path="directus.page_privacycenter.privacy_4_text"
                  Component={Text}
                />
              </>
            }
          />

          <FeatureItem
            image={privacy_5_image}
            header={
              <>
                <Translate path="directus.page_privacycenter.privacy_5_title" />
                <sup>
                  (
                  <Link href={privacy_5_link} target="_new">
                    ?
                  </Link>
                  )
                </sup>
              </>
            }
            text={
              <>
                <MarkedTranslate
                  path="directus.page_privacycenter.privacy_5_text"
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

export default PrivacyByDesignSection;
