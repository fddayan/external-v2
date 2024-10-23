import React, { useContext } from "react";
import { Box, Flex } from "@src/components/Boxes";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Container from "@src/components/Container";
import { Text } from "@src/components/Text";
import Button from "@src/components/Button";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { mediaQueries } from "@src/styles/theme";
import { fontSize, space, textAlign, SpaceProps } from "styled-system";
import Translate from "@src/components/translation/Translate";
import _filter from "lodash/filter";
import { TranslationContext } from "@src/components/translation/TranslationContext";

const ItemWrapper = styled(Box)`
  padding-left: 15px;
  padding-right: 15px;
`;
ItemWrapper.defaultProps = { width: ["100%", 1 / 2] };

const ItemBox = styled(Flex)`
  position: relative;
  background: #fff;
  border-radius: 5px;
  padding: 57px 20px 30px;
  width: 100%;
  margin-bottom: 66px;
`;

ItemBox.defaultProps = { flexDirection: "column", alignItems: "center" };

const Header = styled<SpaceProps>("h2")`
  text-align: center;
  margin: 0;
  font-weight: 800;
  font-size: 24px;
  color: ${(props: any) => props.theme.colors.text};
  line-height: 32px;
  ${mediaQueries[2]} {
    line-height: 40px;
  }
`;

const ItemHeader = styled("h2")`
  text-align: center;
  padding: 76px 0 25px 0;
  margin-top: 0;
  font-weight: 800;
  font-size: 24px;
  color: ${(props: any) => props.theme.colors.text};
  line-height: 32px;
  ${mediaQueries[2]} {
    line-height: 40px;
  }

  ${space}
  ${textAlign}
  ${fontSize}
`;

const BackToSchoolItem = ({
  picture,
  headerText,
  text,
  children,
  idForAriaLabel,
}) => {
  return (
    <Flex
      flexDirection={["column", "column", "row"]}
      justifyContent="center"
      alignItems={["center", "center", "start"]}
      width="100%"
      maxWidth={["100%", "100%", "83%"]}
      marginX="auto"
      backgroundColor="#fff"
      marginBottom="30px"
      marginTop="10px"
    >
      <Box width="75px" minWidth="75px" marginRight={[0, 0, "22px"]}>
        <img src={picture} alt="back to school item icon" />
      </Box>

      <Flex
        flexDirection="column"
        alignItems={["center", "center", "start"]}
        width="100%"
        height="100%"
      >
        <ItemHeader
          padding="0"
          textAlign={["center", "center", "left"]}
          id={idForAriaLabel}
        >
          {headerText}
        </ItemHeader>
        <Text textAlign={["center", "center", "left"]} fontSize={2}>
          {text}
        </Text>
        {children}
      </Flex>
    </Flex>
  );
};

const SchoolLeadersResourcesSection: React.FC = () => {
  const data = useStaticQuery(graphql`
    {
      left: file(name: { eq: "balloons-left@2x" }) {
        childImageSharp {
          gatsbyImageData(
            width: 400
            quality: 90
            placeholder: NONE
            layout: CONSTRAINED
          )
        }
      }
      right: file(name: { eq: "balloons-right@2x" }) {
        childImageSharp {
          gatsbyImageData(
            width: 400
            quality: 90
            placeholder: NONE
            layout: CONSTRAINED
          )
        }
      }
      directus {
        page_remotelearning {
          schools_items
        }
      }
    }
  `);

  const {
    left,
    right,
    directus: {
      page_remotelearning: { schools_items },
    },
  } = data;

  const t = useContext(TranslationContext);
  return (
    <Box as="section" backgroundColor="#f5f5f3">
      <Container>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
          maxWidth={["100%", "100%", "83%"]}
          marginX="auto"
          backgroundColor="#fff"
          padding={["50px 15px"]}
          position="relative"
        >
          <Header
            id="leaders"
            padding="0"
            margin="0"
            textAlign={["center", "left"]}
          >
            <Translate path="directus.page_remotelearning.schools_title" />
          </Header>
          <Text fontSize={2} marginBottom="50px" textAlign="center">
            <Translate path="directus.page_remotelearning.schools_subtitle" />
          </Text>

          <Flex flexDirection={["column", "column", "row"]}>
            <Flex flexDirection="column" width={["100%", "100%", "50%"]}>
              {_filter(schools_items, (_, i: number) => i < 2).map(
                (item, index) => (
                  <BackToSchoolItem
                    key={`schools-item-${index}`}
                    picture={item.icon_url}
                    headerText={t.translate(
                      `directus.page_remotelearning.schools_items.title_${index + 1}`
                    )}
                    text={t.translate(
                      `directus.page_remotelearning.schools_items.text_${index + 1}`
                    )}
                    idForAriaLabel={`schools-item-${index}`}
                  >
                    <Button
                      as="a"
                      outline
                      padding="10px 25px"
                      marginTop="10px"
                      href={item.button_url}
                      aria-describedby={`schools-item-${index}`}
                    >
                      {t.translate(
                        `directus.page_remotelearning.schools_items.button_${index + 1}`
                      )}
                    </Button>
                  </BackToSchoolItem>
                )
              )}
            </Flex>

            <Flex
              flexDirection="column"
              width={["100%", "100%", "50%"]}
              css={css`
                border: 0;
                ${mediaQueries[1]} {
                  border-left: 1px solid #ddd;
                }
              `}
            >
              {_filter(schools_items, (_, i: number) => i >= 2).map(
                (item, index) => (
                  <BackToSchoolItem
                    key={`schools-item-${index}`}
                    picture={item.icon_url}
                    headerText={t.translate(
                      `directus.page_remotelearning.schools_items.title_${index + 3}`
                    )}
                    text={t.translate(
                      `directus.page_remotelearning.schools_items.text_${index + 3}`
                    )}
                    idForAriaLabel={`schools-item-${index + 2}`}
                  >
                    <Button
                      as="a"
                      outline
                      padding="10px 25px"
                      marginTop="10px"
                      href={item.button_url}
                      aria-describedby={`schools-item-${index + 2}`}
                    >
                      {t.translate(
                        `directus.page_remotelearning.schools_items.button_${index + 3}`
                      )}
                    </Button>
                  </BackToSchoolItem>
                )
              )}
            </Flex>
          </Flex>
        </Flex>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
          maxWidth={["100%", "100%", "83%"]}
          marginX="auto"
          backgroundColor="#daf5ff"
          padding={["50px 15px", "50px"]}
          position="relative"
          zIndex={1}
        >
          <GatsbyImage
            image={left.childImageSharp.gatsbyImageData}
            css={css`
              position: absolute !important;
              width: 168px;
              bottom: 0;
              left: 0;
              z-index: -1;
              display: none;
              ${mediaQueries[0]} {
                display: block;
              }
            `}
            alt="ClassDojo hot air balloons"
          />
          <GatsbyImage
            image={right.childImageSharp.gatsbyImageData}
            css={css`
              position: absolute !important;
              width: 180px;
              top: 0;
              right: 0;
              z-index: -1;
              display: none;
              ${mediaQueries[0]} {
                display: block;
              }
            `}
            alt="ClassDojo hot air balloons"
          />
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="100%"
            maxWidth="500px"
            marginX="auto"
          >
            <Text
              as="h2"
              textAlign="center"
              fontWeight={[800]}
              fontSize={5}
              marginBottom="11px"
              color="text"
            >
              <Translate path="directus.page_remotelearning.schools_cta_title" />
            </Text>
            <Text textAlign="center" fontSize={2} id={`schools-leader_banner`}>
              <Translate path="directus.page_remotelearning.schools_cta_text" />
            </Text>
            <Button
              as="a"
              aria-describedby={`schools-leader_banner`}
              href={
                t.translate(
                  `directus.page_remotelearning.schools_cta_button_url`
                ) as string
              }
              outline
              marginTop="25px"
              padding="10px 25px"
            >
              <Translate path="directus.page_remotelearning.schools_cta_button" />
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default SchoolLeadersResourcesSection;
