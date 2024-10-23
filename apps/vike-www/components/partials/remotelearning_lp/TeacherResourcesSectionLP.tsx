/* eslint-disable react/jsx-no-target-blank */
import React, { useContext, useState } from "react";
import { Box, Flex } from "@src/components/Boxes";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import { Text } from "@src/components/Text";
import Button from "@src/components/Button";
import { graphql, useStaticQuery } from "gatsby";
import { mediaQueries } from "@src/styles/theme";
import { css } from "@emotion/react";
import { fontSize, space, textAlign, SpaceProps } from "styled-system";
import {
  ModalContext,
  ModalType,
} from "@src/components/modals/ModalController";
import Translate from "@src/components/translation/Translate";
import { AppDataContext } from "@src/components/AppDataContext";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { logEvent } from "@src/utils/logClient";
import MarkedTranslate from "@src/components/translation/MarkedTranslate";
import GatsbyImageWrapper from "@src/components/GatsbyImageWrapper";

const aCss = css`
  a {
    display: inline-block;
    font-family: proxima-nova, "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 400;
    color: #00bcf2;
    text-decoration: none;
    cursor: pointer;
    &:hover,
    &:focus {
      text-decoration: none;
      color: #00a8d9;
    }
    padding-left: 5px;
    padding-right: 5px;
  }
`;

const ItemWrapper = styled(Box)`
  padding-left: 15px;
  padding-right: 15px;
`;
ItemWrapper.defaultProps = { width: ["100%", 1 / 3] };

const ItemBox = styled(Flex)`
  position: relative;
  background: #fff;
  border: 1px solid transparent;
  box-shadow: 0 2px 4px rgba(201, 201, 201, 0.5);
  border-radius: 5px;
  padding: 57px 20px 30px;
  width: 100%;
  margin-bottom: 66px;
`;

ItemBox.defaultProps = { flexDirection: "column", alignItems: "center" };

const ItemBoxImg = styled.img`
  position: absolute !important;
  top: -37.5px;
  margin: 0 auto;
`;

const Header = styled<SpaceProps>("h2")`
  text-align: center;
  padding: 76px 0 25px 0;
  margin-top: 0;
  font-weight: 800;
  font-size: 24px;
  color: ${(props: any) => props.theme.colors.text};
  line-height: 1.6;

  ${space}
  ${textAlign}
  ${fontSize}
`;

const BackToSchoolItem = ({ picture, headerText, text, children }) => {
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
        <img src={picture} alt="Back To School item icon" />
      </Box>

      <Flex
        flexDirection="column"
        alignItems={["center", "center", "start"]}
        width="100%"
        height="100%"
      >
        <Header
          padding="0"
          textAlign={["center", "center", "left"]}
          fontSize={3}
        >
          {headerText}
        </Header>
        <Text textAlign={["center", "center", "left"]} fontSize={2}>
          {text}
        </Text>
        {children}
      </Flex>
    </Flex>
  );
};

const TeacherResourcesSectionLP: React.FC = () => {
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
        page_remotelearninglp {
          hero_video_url
          hero_video_image {
            filename_disk
          }
          teachers_items
          teachers_cta_button_url
          cta_items
        }
      }
    }
  `);
  const {
    left,
    right,
    directus: { page_remotelearninglp: directusPageRemotelearninglp },
  } = data;

  const modalContext = useContext(ModalContext);
  const [isBoxVisible, setBoxVisibility] = useState(true);

  function openSignupModal() {
    logEvent({
      eventValue: window.location.href,
      eventName: "web.external_page.navbar.sign_up.tap",
    });
    modalContext.showModal(ModalType.Signup);
  }

  function openVideoModal() {
    modalContext.showModal(ModalType.VideoModal, {
      youtubeID: directusPageRemotelearninglp.hero_video_url,
    });
  }

  const t = useContext(TranslationContext);

  const appData = useContext(AppDataContext);

  return (
    <Box as="section" backgroundColor="#f5f5f3">
      <Container paddingTop={isBoxVisible ? "80px" : ""}>
        {isBoxVisible && (
          <Flex
            flexDirection={["column", "row"]}
            justifyContent="center"
            alignItems={["center", "start"]}
            width="100%"
            maxWidth={["100%", "100%", "83%"]}
            marginX="auto"
            backgroundColor="#fff"
            padding={["50px 15px", "50px"]}
            marginBottom="30px"
            css={css`
              border: 1px solid transparent;
              box-shadow: 0 2px 4px rgba(201, 201, 201, 0.5);
            `}
          >
            <Box
              as="a"
              width={["100%", "310px"]}
              onClick={() => openVideoModal()}
              minWidth={["50px", "310px"]}
              paddingRight={["0px", "50px"]}
              height="100%"
            >
              <GatsbyImageWrapper
                image={directusPageRemotelearninglp.hero_video_image}
                alt="Video thumbnail"
              />
            </Box>
            <Flex
              flexDirection="column"
              alignItems={["center", "start"]}
              width="100%"
              height="100%"
            >
              <Header padding="0" textAlign={["center", "left"]}>
                <Translate path="directus.page_remotelearninglp.hero_title" />
              </Header>
              <Text textAlign={["center", "left"]} css={aCss}>
                <MarkedTranslate path="directus.page_remotelearninglp.hero_text" />
              </Text>
              <Flex
                flexDirection={["column", "row"]}
                width="100%"
                marginLeft={[0, 0, -100]}
              >
                {!appData.data.userData && (
                  <Button
                    big
                    padding="10px 25px"
                    marginRight={[0, "15px"]}
                    marginTop="20px"
                    onClick={() => openSignupModal()}
                  >
                    <Translate path="directus.page_remotelearninglp.hero_signup_text" />
                  </Button>
                )}
                <Button
                  outline
                  big
                  padding="10px 25px"
                  marginTop="20px"
                  onClick={() => openVideoModal()}
                >
                  <Translate path="directus.page_remotelearninglp.hero_button_text" />
                </Button>
              </Flex>
            </Flex>
          </Flex>
        )}

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
            id="teachers"
            padding="0"
            margin="0"
            textAlign={["center", "left"]}
          >
            <Translate path="directus.page_remotelearninglp.teachers_title" />
          </Header>
          <Text fontSize={2} marginBottom="50px" textAlign="center">
            <Translate path="directus.page_remotelearninglp.teachers_subtitle" />
          </Text>

          <Flex flexDirection={["column", "column", "row"]}>
            <Flex flexDirection="column" width={["100%", "100%", "50%"]}>
              {directusPageRemotelearninglp.teachers_items.map(
                (item, index) =>
                  index % 2 === 0 && (
                    <BackToSchoolItem
                      key={`teachers-item-${index}`}
                      picture={item.image_url}
                      headerText={t.translate(
                        `directus.page_remotelearninglp.teachers_items.title_${index + 1}`
                      )}
                      text={t.translate(
                        `directus.page_remotelearninglp.teachers_items.text_${index + 1}`
                      )}
                    >
                      <Button
                        as="a"
                        outline
                        padding="10px 25px"
                        marginTop="10px"
                        href={item.url}
                      >
                        {t.translate(
                          `directus.page_remotelearninglp.teachers_items.button_${index + 1}`
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
              {directusPageRemotelearninglp.teachers_items.map(
                (item, index) =>
                  index % 2 === 1 && (
                    <BackToSchoolItem
                      key={`teachers-item-${index}`}
                      picture={item.image_url}
                      headerText={t.translate(
                        `directus.page_remotelearninglp.teachers_items.title_${index + 1}`
                      )}
                      text={t.translate(
                        `directus.page_remotelearninglp.teachers_items.text_${index + 1}`
                      )}
                    >
                      <Button
                        as="a"
                        outline
                        padding="10px 25px"
                        marginTop="10px"
                        href={item.url}
                      >
                        {t.translate(
                          `directus.page_remotelearninglp.teachers_items.button_${index + 1}`
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
          <GatsbyImageWrapper
            image={left}
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
            alt="ClassDojo hot air ballons"
          />
          <GatsbyImageWrapper
            image={right}
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
            alt="ClassDojo hot air ballons"
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
              <Translate path="directus.page_remotelearninglp.teachers_cta_title" />
            </Text>
            <Text textAlign="center" fontSize={2}>
              <Translate path="directus.page_remotelearninglp.teachers_cta_text" />
            </Text>
            <Button
              as="a"
              outline
              marginTop="25px"
              padding="10px 25px"
              href={directusPageRemotelearninglp.teachers_cta_button_url}
              target="_blank"
            >
              <Translate path="directus.page_remotelearninglp.teachers_cta_button" />
            </Button>
          </Flex>
        </Flex>
        <Flex
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          width="100%"
          maxWidth={["100%", "100%", "83%"]}
          marginX="auto"
          paddingTop="80px"
          backgroundColor="#f5f5f3"
        >
          {directusPageRemotelearninglp.cta_items.map((item, index) => (
            <ItemWrapper key={`cta-items-${index}`}>
              <ItemBox>
                <ItemBoxImg src={item.image_url} alt="Teacher resource icon" />
                <Text textAlign="center" fontWeight={[600]} fontSize={2}>
                  {t.translate(
                    `directus.page_remotelearninglp.cta_items.title_${index + 1}`
                  )}
                </Text>
                <Text textAlign="center" fontSize={2}>
                  {t.translate(
                    `directus.page_remotelearninglp.cta_items.text_${index + 1}`
                  )}
                </Text>
                <Button
                  as="a"
                  marginTop="23px"
                  padding="10px 25px"
                  block
                  href={item.url}
                >
                  {t.translate(
                    `directus.page_remotelearninglp.cta_items.button_${index + 1}`
                  )}
                </Button>
              </ItemBox>
            </ItemWrapper>
          ))}
        </Flex>
      </Container>
    </Box>
  );
};

export default TeacherResourcesSectionLP;
