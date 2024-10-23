import React, { useContext } from "react";
import { mediaQueries } from "@src/styles/theme";
import styled from "@emotion/styled";
import { Flex } from "@src/components/Boxes";
import Container from "@src/components/Container";
import Translate from "@src/components/translation/Translate";
import { graphql, useStaticQuery } from "gatsby";
import { Text } from "@src/components/Text";
import FeatureItem from "./FeatureItem";
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

const ControlSection = () => {
  const data = useStaticQuery(graphql`
    {
      directus {
        page_privacy {
          control_1_image {
            filename_disk
          }
          control_2_image {
            filename_disk
          }
          control_3_image {
            filename_disk
          }
        }
      }
    }
  `);

  const {
    directus: {
      page_privacy: { control_1_image, control_2_image, control_3_image },
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
        <Translate path="directus.page_privacycenter.control_title" />
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
            image={control_1_image}
            header={
              <>
                <Translate path="directus.page_privacycenter.control_1_title" />
              </>
            }
            text={
              <>
                <MarkedTranslate
                  path="directus.page_privacycenter.control_1_text"
                  Component={Text}
                />
              </>
            }
          />

          <FeatureItem
            image={control_2_image}
            header={
              <>
                <Translate path="directus.page_privacycenter.control_2_title" />
              </>
            }
            text={
              <>
                <MarkedTranslate
                  path="directus.page_privacycenter.control_2_text"
                  Component={Text}
                />
              </>
            }
          />

          <FeatureItem
            image={control_3_image}
            header={
              <>
                <Translate path="directus.page_privacycenter.control_3_title" />
              </>
            }
            text={
              <>
                <MarkedTranslate
                  path="directus.page_privacycenter.control_3_text"
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

export default ControlSection;
