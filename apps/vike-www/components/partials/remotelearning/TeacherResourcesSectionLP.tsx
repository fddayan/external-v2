/* eslint-disable react/jsx-no-target-blank */
import React, { useContext, useState } from "react";
import { Box, Flex } from "@src/components/Boxes";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import { Text } from "@src/components/Text";
import Button from "@src/components/Button";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { mediaQueries } from "@src/styles/theme";
import { css } from "@emotion/react";
import { fontSize, space, textAlign, SpaceProps } from "styled-system";
import {
  ModalContext,
  ModalType,
} from "@src/components/modals/ModalController";
import { DropDown, DropDownItem } from "@src/components/Dropdown";
import Translate from "@src/components/translation/Translate";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { logEvent } from "@src/utils/logClient";
import window from "global/window";

const Link = styled.a`
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

const ItemBoxImg = styled(GatsbyImage)`
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

const Caret = styled("span")`
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 0;
  vertical-align: middle;
  border-top: 4px solid;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
`;
const BenefitList = styled("ul")`
  margin-bottom: 0;
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
        <GatsbyImage image={picture.childImageSharp.gatsbyImageData} />
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

const TeacherResourcesSection: React.FC = () => {
  const data = useStaticQuery(graphql`
    {
      pd: file(name: { eq: "PlayButton_RemoteLearning" }) {
        childImageSharp {
          gatsbyImageData(
            width: 400
            quality: 90
            placeholder: NONE
            layout: CONSTRAINED
          )
        }
      }
      backToSchool: file(name: { eq: "Book" }) {
        childImageSharp {
          gatsbyImageData(
            width: 75
            quality: 90
            placeholder: NONE
            layout: FIXED
          )
        }
      }
      studentIntro: file(name: { eq: "Workbook" }) {
        childImageSharp {
          gatsbyImageData(
            width: 75
            quality: 90
            placeholder: NONE
            layout: FIXED
          )
        }
      }
      parentTakeHome: file(name: { eq: "Lightbulb" }) {
        childImageSharp {
          gatsbyImageData(
            width: 75
            quality: 90
            placeholder: NONE
            layout: FIXED
          )
        }
      }
      openLetter: file(name: { eq: "Note" }) {
        childImageSharp {
          gatsbyImageData(
            width: 75
            quality: 90
            placeholder: NONE
            layout: FIXED
          )
        }
      }
      parentFaq: file(name: { eq: "Star" }) {
        childImageSharp {
          gatsbyImageData(
            width: 75
            quality: 90
            placeholder: NONE
            layout: FIXED
          )
        }
      }
      briefcase: file(name: { eq: "Communication" }) {
        childImageSharp {
          gatsbyImageData(
            width: 75
            quality: 90
            placeholder: NONE
            layout: FIXED
          )
        }
      }
      contact: file(name: { eq: "SOS" }) {
        childImageSharp {
          gatsbyImageData(
            width: 75
            quality: 90
            placeholder: NONE
            layout: FIXED
          )
        }
      }
      highfive: file(name: { eq: "Highfive" }) {
        childImageSharp {
          gatsbyImageData(
            width: 75
            quality: 90
            placeholder: NONE
            layout: FIXED
          )
        }
      }
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
    }
  `);

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
    modalContext.showModal(ModalType.VideoModal, { youtubeID: "0IqnV06bKNw" });
  }

  function openWebinarModal() {
    modalContext.showModal(ModalType.VideoModal, { youtubeID: "OAEkfrwtAOI" });
  }

  const {
    pd,
    backToSchool,
    studentIntro,
    parentTakeHome,
    openLetter,
    parentFaq,
    briefcase,
    contact,
    highfive,
    left,
    right,
  } = data;
  return (
    <Box as="section" backgroundColor="#f5f5f3">
      <Container paddingTop={isBoxVisible ? "30px" : ""}>
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
            flexWrap="wrap"
            css={css`
              border: 1px solid transparent;
              box-shadow: 0 2px 4px rgba(201, 201, 201, 0.5);
            `}
          >
            <Box
              as="a"
              width={["100%", "100%", "310px"]}
              onClick={() => openVideoModal()}
              minWidth={["50px", "310px"]}
              paddingRight={["0px", "0px", "50px"]}
              height="100%"
              css={css`
                order: 3;
                ${mediaQueries[1]} {
                  order: 1;
                }
              `}
            >
              <GatsbyImage
                image={pd.childImageSharp.gatsbyImageData}
                width="100%"
              />
            </Box>
            <Box
              css={css`
                order: 1;
                max-width: 100%;
                ${mediaQueries[1]} {
                  order: 2;
                  max-width: 50%;
                  margin-bottom: 20px;
                }
              `}
            >
              <BenefitList>
                <li>
                  Classrooms and schools are communities. With more schools
                  closing, we know keeping your community connected is more
                  important than ever.
                </li>
                <li>
                  ClassDojo helps you instantly communicate and engage with all
                  families and students, so you can keep building relationships
                  while school is closed.
                </li>
                <li>
                  It is <strong>100% free</strong>, and you can{" "}
                  <strong>get set up in minutes.</strong>
                </li>
              </BenefitList>
            </Box>
            <Button
              big
              padding="10px 25px"
              marginRight={[0, "15px"]}
              marginTop="20px"
              marginBottom={["50px", 0]}
              onClick={() => openSignupModal()}
              css={css`
                order: 2;
                width: 100%;
                ${mediaQueries[1]} {
                  order: 3;
                  width: auto;
                }
              `}
            >
              Sign up
            </Button>
            <Button
              big
              outline
              padding="10px 25px"
              marginTop="20px"
              onClick={() => openVideoModal()}
              css={css`
                order: 4;
                width: 100%;
                ${mediaQueries[1]} {
                  width: auto;
                }
              `}
            >
              Watch video (4 mins)
            </Button>
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
            Teachers
          </Header>
          <Text fontSize={2} marginBottom="50px" textAlign="center">
            Everything you need to stay connected with students and families,
            wherever they are <span aria-hidden={true}>❤️</span>
          </Text>

          <Flex flexDirection={["column", "column", "row"]}>
            <Flex flexDirection="column" width={["100%", "100%", "50%"]}>
              <BackToSchoolItem
                picture={briefcase}
                headerText="Remote learning on ClassDojo"
                text="Send direct messages to families, share lessons or announcements, and assign classwork to students."
              >
                <Button
                  as="a"
                  outline
                  padding="10px 25px"
                  marginTop="10px"
                  href="https://static.classdojo.com/img/remote_learning/cd_remote_learning_overview.pdf"
                  aria-label="Learn more about remote learning"
                >
                  Learn more
                </Button>
              </BackToSchoolItem>

              <BackToSchoolItem
                picture={parentTakeHome}
                headerText="10 ideas for remote learning"
                text="We asked teachers how they plan to use ClassDojo for remote learning and they shared their best ideas!"
              >
                <Button
                  as="a"
                  outline
                  padding="10px 25px"
                  marginTop="10px"
                  aria-label="Get 10 ideas for remote learning"
                  href="https://static.classdojo.com/img/remote_learning/cd_remote_learning_activity_ideas.pdf"
                >
                  Get ideas
                </Button>
              </BackToSchoolItem>
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
              <BackToSchoolItem
                picture={studentIntro}
                headerText="Share activities with students"
                text="Share activities that students can respond to from home via video, photo, journal entry, or drawing."
              >
                <Button
                  as="a"
                  outline
                  padding="10px 25px"
                  marginTop="10px"
                  href="https://youtu.be/uG7-axyuUcg"
                  aria-label="Check out activities with students"
                >
                  Check it out
                </Button>
              </BackToSchoolItem>

              <BackToSchoolItem
                picture={openLetter}
                headerText="Get students connected"
                text="Simply print and share a class code or individual codes, so students can easily log in from home!"
              >
                <Button
                  as="a"
                  href="https://classdojo.zendesk.com/hc/en-us/articles/360009869032-How-Do-Students-Log-in-at-Home-to-Respond-to-Activities-and-Post-to-Their-Portfolio-#web"
                  outline
                  padding="10px 25px"
                  marginTop="10px"
                  aria-label="Get instructions to connect students"
                >
                  Get instructions
                </Button>
              </BackToSchoolItem>
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
              Watch our remote learning webinar
            </Text>
            <Text textAlign="center" fontSize={2}>
              Join Caitlin, a former teacher now on the ClassDojo team, as she
              shares how to transition your in-person classroom community into a
              remote learning community on ClassDojo.
            </Text>
            <Button
              as="a"
              outline
              marginTop="25px"
              padding="10px 25px"
              onClick={() => openWebinarModal()}
            >
              Watch webinar (30 mins)
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
          <ItemWrapper>
            <ItemBox>
              <ItemBoxImg image={parentFaq.childImageSharp.gatsbyImageData} />
              <Text textAlign="center" fontWeight={[600]} fontSize={2}>
                New to ClassDojo?
              </Text>
              <Text textAlign="center" fontSize={2}>
                Set up your teacher account, and get students and families
                connected in minutes
              </Text>
              <Button
                as="a"
                marginTop="23px"
                padding="10px 25px"
                block
                aria-label="Get started with classdojo"
                href="https://classdojo.zendesk.com/hc/en-us/articles/360040488152-Remote-Learning-School-Wide-A-Step-by-Step-Guide-for-Teachers"
              >
                Get started
              </Button>
            </ItemBox>
          </ItemWrapper>

          <ItemWrapper>
            <ItemBox>
              <ItemBoxImg image={highfive.childImageSharp.gatsbyImageData} />
              <Text textAlign="center" fontWeight={[600]} fontSize={2}>
                Join the community
              </Text>
              <Text textAlign="center" fontSize={2}>
                Join ClassDojo teachers around the world sharing advice and
                helping each other out!
              </Text>
              <Button
                as="a"
                href="https://www.facebook.com/groups/classdojoambassadors"
                marginTop="23px"
                padding="10px 25px"
                block
                aria-label="Join classdojo community"
              >
                Join the community
              </Button>
            </ItemBox>
          </ItemWrapper>

          <ItemWrapper>
            <ItemBox>
              <ItemBoxImg image={contact.childImageSharp.gatsbyImageData} />
              <Text textAlign="center" fontWeight={[600]} fontSize={2}>
                We’re here to help
              </Text>
              <Text textAlign="center" fontSize={2}>
                Find quick answers to your questions. Plus, we’re only an email
                away!
              </Text>
              <Button
                as="a"
                href="https://classdojo.zendesk.com/hc/en-us/categories/200185275-For-teachers"
                block
                marginTop="23px"
                padding="10px 25px"
                aria-label="Get support from ClassDojo"
              >
                Get support
              </Button>
            </ItemBox>
          </ItemWrapper>
        </Flex>
      </Container>
    </Box>
  );
};

export default TeacherResourcesSection;
