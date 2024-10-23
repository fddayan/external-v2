import React, { useContext, useState } from "react";
import { mediaQueries } from "@src/styles/theme";
import styled from "@emotion/styled";
import { Box, Flex } from "@src/components/Boxes";
import Container from "@src/components/Container";
import Translate from "@src/components/translation/Translate";
import { Text } from "@src/components/Text";
import { graphql, useStaticQuery } from "gatsby";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { marked } from "marked";
import MarkedTranslate from "@src/components/translation/MarkedTranslate";
import GatsbyImageWrapper from "@src/components/GatsbyImageWrapper";

const Header = styled("h2")`
  text-align: center;
  font-family: DojoDisplay !important;
  padding-top: 25px;
  margin-top: 0;
  margin-bottom: 50px;
  font-weight: 800;
  font-size: 40px;
  color: ${(props: any) => props.theme.colors.text};
  line-height: 32px;
  ${mediaQueries[2]} {
    line-height: 40px;
  }
`;

const TabHeaderImg = styled(GatsbyImageWrapper)`
  border-radius: 50%;
  opacity: 0.4;
  transition: opacity 0.4s;
  max-width: 154px;
  width: 100%;
  &:hover {
    opacity: 1;
  }
`;

const TabHeader = styled(Flex)<{ onClick: () => void; active: boolean }>`
  cursor: pointer !important;
  padding: 0 8px;
  border-bottom: ${(props) => (props.active ? "4px solid #00aeef" : 0)};

  &:hover h4 {
    color: #00aeef;
  }

  ${TabHeaderImg} {
    opacity: ${(props) => (props.active ? 1 : "auto")};
  }

  h4 {
    color: ${(props) => (props.active ? "#00aeef" : "inherit")};
  }
`;
TabHeader.defaultProps = {
  flexDirection: "column",
  width: 1 / 3,
  alignItems: "center",
};

const TabText = styled("h4")`
  text-align: center;
  color: #363636;
  font-weight: 600;
  font-size: 16px;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const Hr = styled("hr")`
  width: 100vw;
  border-top: 1px solid #eee;
  margin-bottom: 50px;
  margin-top: 0;
`;

const AdvisorsSection = () => {
  const data = useStaticQuery(graphql`
    {
      directus {
        page_privacy {
          advisor_1_name
          advisor_2_name
          advisor_3_name
          advisor_4_name
          advisor_1_image {
            filename_disk
          }
          advisor_2_image {
            filename_disk
          }
          advisor_3_image {
            filename_disk
          }
          advisor_4_image {
            filename_disk
          }
        }
      }
    }
  `);

  const {
    directus: {
      page_privacy: {
        advisor_1_image,
        advisor_2_image,
        advisor_3_image,
        advisor_4_image,
        advisor_1_name,
        advisor_2_name,
        advisor_3_name,
        advisor_4_name,
      },
    },
  } = data;
  const t = useContext(TranslationContext);
  const [tab, setTab] = useState(1);

  return (
    <Flex
      as="section"
      flexDirection="column"
      paddingY="66px"
      backgroundColor="#fff"
    >
      <Hr />
      <Header>
        <Translate path="directus.page_privacycenter.advisors_title" />
      </Header>
      <Container>
        <Flex>
          <TabHeader onClick={() => setTab(1)} active={tab === 1}>
            <TabHeaderImg
              image={advisor_1_image}
              alt={`${advisor_1_name} picture`}
            />
            <TabText>{advisor_1_name}</TabText>
          </TabHeader>
          <TabHeader onClick={() => setTab(2)} active={tab === 2}>
            <TabHeaderImg
              image={advisor_2_image}
              alt={`${advisor_2_name} picture`}
            />
            <TabText>{advisor_2_name}</TabText>
          </TabHeader>
          <TabHeader onClick={() => setTab(3)} active={tab === 3}>
            <TabHeaderImg
              image={advisor_3_image}
              alt={`${advisor_3_name} picture`}
            />
            <TabText>{advisor_3_name}</TabText>
          </TabHeader>
          <TabHeader onClick={() => setTab(4)} active={tab === 4}>
            <TabHeaderImg
              image={advisor_4_image}
              alt={`${advisor_4_name} picture`}
            />
            <TabText>{advisor_4_name}</TabText>
          </TabHeader>
        </Flex>
      </Container>
      <Hr />
      <Box
        maxWidth={["100%", "66%"]}
        width="100%"
        mx="auto"
        paddingX="15px"
        fontSize={2}
      >
        {tab === 1 && (
          <>
            <MarkedTranslate
              path="directus.page_privacycenter.advisor_1_text"
              Component={Text}
            />
          </>
        )}
        {tab === 2 && (
          <>
            <MarkedTranslate
              path="directus.page_privacycenter.advisor_2_text"
              Component={Text}
            />
          </>
        )}
        {tab === 3 && (
          <>
            <MarkedTranslate
              path="directus.page_privacycenter.advisor_3_text"
              Component={Text}
            />
          </>
        )}
        {tab === 4 && (
          <>
            <MarkedTranslate
              path="directus.page_privacycenter.advisor_4_text"
              Component={Text}
            />
          </>
        )}
      </Box>
    </Flex>
  );
};

export default AdvisorsSection;
