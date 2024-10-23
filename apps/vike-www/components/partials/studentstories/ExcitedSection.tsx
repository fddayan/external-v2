import React, { useContext } from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { Flex } from "@src/components/Boxes";
import { graphql, useStaticQuery } from "gatsby";
import styled from "@emotion/styled";
import Button from "@src/components/Button";
import { Text } from "@src/components/Text";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import MarkedTranslate from "@src/components/translation/MarkedTranslate";
import Translate from "@src/components/translation/Translate";

const BackgroundImg = styled(GatsbyImage)`
  position: absolute !important;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  z-index: -3;
`;
const BottomImg = styled(GatsbyImage)`
  position: absolute !important;
  width: 272px;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  z-index: 10;
`;

const ContentBox = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  padding: 50px 20px 50px;
  background-color: white;
  border-radius: 10px;
  max-width: 515px;
  height: 260px;
  z-index: 9;
  box-shadow: -5px 5px 2px 1px rgba(0, 0, 0, 0.2);
`;

const Header = styled("h2")`
  font-size: 24px;
  font-weight: 900;
  line-height: 40px;
  margin-bottom: 15px;
  margin-top: 0;
  text-align: center;
  color: #363636;
`;

function ExcitedSection() {
  const data = useStaticQuery(graphql`
    {
      background: file(name: { eq: "bottom-section-bg" }, relativePath: { regex: "/studentstories/" }) {
        childImageSharp {
          gatsbyImageData(width: 980, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
      bottom: file(name: { eq: "bottom-section-mascots" }, relativePath: { regex: "/studentstories/" }) {
        childImageSharp {
          gatsbyImageData(width: 320, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
    }
  `);
  const { background, bottom } = data;
  const modalContext = useContext(ModalContext);

  function showSignupModal() {
    modalContext.showModal(ModalType.Signup);
  }

  return (
    <Flex height={["400px"]} position="relative" justifyContent="center" alignItems="center">
      <BackgroundImg image={background.childImageSharp.gatsbyImageData} alt="Watercolor spots" />
      <BottomImg image={bottom.childImageSharp.gatsbyImageData} alt="Mojo and Katie doing a high five" />
      <ContentBox>
        <Header>
          <Translate path="directus.page_student_stories.call_to_action_title" />
        </Header>
        <Text marginBottom="20px" marginTop="10px" textAlign="center" maxWidth="450px" mx="auto">
          <MarkedTranslate path="directus.page_student_stories.call_to_action_text" />
        </Text>
        <Button onClick={showSignupModal}>
          <Translate path="directus.page_student_stories.call_to_action_button_text" />
        </Button>
      </ContentBox>
    </Flex>
  );
}

export default ExcitedSection;
