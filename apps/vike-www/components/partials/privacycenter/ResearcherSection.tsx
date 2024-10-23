import React, { useContext } from "react";

import { mediaQueries } from "@src/styles/theme";
import styled from "@emotion/styled";
import { Box } from "@src/components/Boxes";
import Container from "@src/components/Container";
import Translate from "@src/components/translation/Translate";
import { graphql, useStaticQuery } from "gatsby";
import { Text } from "@src/components/Text";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import MarkedTranslate from "@src/components/translation/MarkedTranslate";
import GatsbyImageWrapper from "@src/components/GatsbyImageWrapper";

const Header = styled("h2")`
  text-align: center;
  font-family: DojoDisplay !important;
  padding-block: 25px;
  margin-top: 0;
  font-weight: 800;
  font-size: 40px;
  color: ${(props: any) => props.theme.colors.text};
  line-height: 32px;
  ${mediaQueries[2]} {
    line-height: 40px;
  }
`;

const MojoImg = styled(GatsbyImageWrapper)`
  position: absolute !important;
  left: 0;
  right: 0;
  margin: 0 auto;
  top: -50px;
`;

const ResearcherSection = () => {
  const data = useStaticQuery(graphql`
    {
      directus {
        page_privacy {
          researcher_image {
            filename_disk
          }
        }
      }
    }
  `);

  const {
    directus: {
      page_privacy: { researcher_image },
    },
  } = data;
  const t = useContext(TranslationContext);
  return (
    <Box as="section" position="relative">
      <MojoImg
        image={researcher_image}
        alt="Mojo writing on a clipboard"
        css={{ width: 120 }}
      />
      <Container paddingTop="80px">
        <Header>
          <Translate path="directus.page_privacycenter.researcher_title" />
        </Header>
        <Box width={[10 / 12, 8 / 12]} mx="auto" marginBottom="50px">
          {/* <MarkedTranslate>Test [this](this)</MarkedTranslate> */}
          <MarkedTranslate
            path="directus.page_privacycenter.researcher_text"
            Component={Text}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default ResearcherSection;
