import React from "react";

import { Box, Flex } from "@src/components/Boxes";
import { graphql, useStaticQuery } from "gatsby";
import Container from "@src/components/Container";
import styled from "@emotion/styled";
import Button from "@src/components/Button";
import { mediaQueries, mediaQueriesMax } from "@src/styles/theme";
import { getRelativePath } from "@src/utils/routes";
import { Text } from "@src/components/Text";
import { css } from "@emotion/react";
import Translate from "@src/components/translation/Translate";
import MarkedTranslate from "@src/components/translation/MarkedTranslate";
import GatsbyImageWrapper from "@src/components/GatsbyImageWrapper";

const Header = styled("h2")`
  font-size: 28px;
  font-weight: 800;
  line-height: 1.3em;
  margin-bottom: 22px;
  margin-top: 22px;
  text-align: center;

  ${mediaQueries[0]} {
    text-align: left;
  }
  ${mediaQueries[1]} {
    font-size: 36px;
  }
`;

const FeatureImg = styled(GatsbyImageWrapper)`
  max-width: 300px;
  width: 100%;

  ${mediaQueriesMax[0]} {
    margin-left: auto;
    margin-right: auto;
  }

  ${mediaQueries[0]} {
    max-width: 45%;
  }
`;

const StoreLink = styled("a")`
  background-color: transparent;
  display: inline-block;
  padding: 5px;
`;

function FeatureListSection() {
  const data = useStaticQuery(graphql`
    {
      directus {
        page_toolkit {
          feature_one_image {
            filename_disk
          }
          feature_two_image {
            filename_disk
          }
          feature_three_image {
            filename_disk
          }
          feature_two_cta_url
        }
      }
      apple: file(name: { eq: "app-store-button@2x" }, relativePath: { regex: "/toolkit/" }) {
        childImageSharp {
          gatsbyImageData(width: 160, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
      android: file(name: { eq: "play-store-button@2x" }, relativePath: { regex: "/toolkit/" }) {
        childImageSharp {
          gatsbyImageData(width: 160, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
      amazon: file(name: { eq: "amazon-button@2x" }, relativePath: { regex: "/toolkit/" }) {
        childImageSharp {
          gatsbyImageData(width: 160, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
      chrome: file(name: { eq: "chrome-button@2x" }, relativePath: { regex: "/toolkit/" }) {
        childImageSharp {
          gatsbyImageData(width: 160, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
    }
  `);
  const {
    directus: {
      page_toolkit: { feature_one_image, feature_two_image, feature_three_image, feature_two_cta_url },
    },
    apple,
    android,
    amazon,
    chrome,
  } = data;
  return (
    <Box as="section" position="relative" color="#363636" paddingTop="66px">
      <Container>
        <Flex
          flexWrap="wrap"
          justifyContent="space-between"
          mx="auto"
          maxWidth={["380px", "100%"]}
          flexDirection={["column-reverse", "row"]}
          paddingBottom={["66px"]}
        >
          <Flex flexDirection="column" width={["100%", "43%"]} paddingTop={[0, "10px"]}>
            <Header>
              {" "}
              <Translate path="directus.page_toolkit.feature_one_title" />️
            </Header>
            <Text fontSize="18px" textAlign={["center", "left"]}>
              <MarkedTranslate path="directus.page_toolkit.feature_one_text" />
            </Text>
          </Flex>

          <FeatureImg image={feature_one_image} alt="ClassDojo app tools" />
        </Flex>

        <Flex
          flexWrap="wrap"
          justifyContent="space-between"
          mx="auto"
          maxWidth={["380px", "100%"]}
          flexDirection={["column", "row"]}
          paddingBottom={["66px"]}
        >
          <FeatureImg image={feature_two_image} alt="features icons" />

          <Flex flexDirection="column" width={["100%", "43%"]} paddingTop={[0, "40px"]} alignItems="center">
            <Header>
              <Translate path="directus.page_toolkit.feature_two_title" />
            </Header>
            <Text fontSize="18px" textAlign={["center", "center"]}>
              <MarkedTranslate path="directus.page_toolkit.feature_two_text" />
            </Text>
            <Box>
              <Button big as="a" href={feature_two_cta_url} target="_blank" marginTop="20px">
                <Translate path="directus.page_toolkit.feature_two_cta_label" />
              </Button>
            </Box>
          </Flex>
        </Flex>

        <Flex
          flexWrap="wrap"
          justifyContent="space-between"
          mx="auto"
          maxWidth={["380px", "100%"]}
          flexDirection={["column-reverse", "row"]}
          paddingBottom={["66px"]}
        >
          <Flex flexDirection="column" width={["100%", "55%"]} paddingTop={[0, "40px"]}>
            <Header>
              <Translate path="directus.page_toolkit.feature_three_title" />
            </Header>
            <Text fontSize="18px" textAlign={["center", "left"]}>
              <MarkedTranslate path="directus.page_toolkit.feature_three_text" />
            </Text>
            <Flex flexWrap="wrap" alignItems="center" justifyContent={["center", "start"]} maxWidth="350px">
              <StoreLink href="https://itunes.apple.com/us/app/classdojo/id552602056?mt=8" target="_blank">
                <GatsbyImageWrapper image={apple} alt="Apple banner" />
              </StoreLink>
              <StoreLink href="https://play.google.com/store/apps/details?id=com.classdojo.android" target="_blank">
                <GatsbyImageWrapper image={android} alt="Android banner" />
              </StoreLink>
              <StoreLink href={getRelativePath("/appcheck")} target="_blank">
                <GatsbyImageWrapper image={chrome} alt="chrome banner" />
              </StoreLink>
              <StoreLink href="https://www.amazon.com/ClassDojo/dp/B01AIM0EGO" target="_blank">
                <GatsbyImageWrapper image={amazon} alt="Amazon banner" />
              </StoreLink>
            </Flex>
          </Flex>

          <FeatureImg
            image={feature_three_image}
            css={css`
              left: -29px;
              ${mediaQueries[0]} {
                left: 0;
              }
            `}
            alt="Cellphone running ClassDojo app"
          />
        </Flex>
      </Container>
    </Box>
  );
}

export default FeatureListSection;
