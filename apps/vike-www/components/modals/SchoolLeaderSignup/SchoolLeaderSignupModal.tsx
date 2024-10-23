import React, { useContext } from "react";
import CommonModal, { CommonModalProps } from "../CommonModal";
import { MutedText, Text } from "@src/components/Text";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import styled from "@emotion/styled";
import { layout } from "styled-system";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { css } from "@emotion/react";
import { Box, Flex } from "@src/components/Boxes";
import SignupForm, { SignupFormDataInput } from "../SignupForm";
import Translate from "../../translation/Translate";
import { logEvent as le } from "@src/utils/logClient";

const Link = styled.a<{ display?: "inline-block" }>`
  line-height: 18px;
  font-family: proxima-nova, "Helvetica Neue", Helvetica, Arial, sans-serif;
  word-break: keep-all;
  white-space: nowrap;
  font-weight: 600;

  text-decoration: none;
  cursor: pointer;
  &:hover,
  &:focus {
    text-decoration: none;
    color: #00bcf2;
  }

  ${layout}
`;

const ModalTitle = styled("h3")`
  font-size: 36px;
  font-weight: 800;
  margin: 18px 0;
  line-height: 40px;
  text-align: center;
`;

const SchoolLeaderSignupModal = (props: CommonModalProps & { formData: SignupFormDataInput; fullPage?: boolean }) => {
  const data = useStaticQuery(graphql`
    {
      badge: file(name: { eq: "school_leader_badge" }) {
        childImageSharp {
          gatsbyImageData(width: 88, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
    }
  `);

  const { badge } = data;

  const modalContext = useContext(ModalContext);

  function showLoginModal() {
    modalContext.showModal(ModalType.SchoolLeaderLogin);
  }

  return (
    <CommonModal noHeader {...props}>
      <GatsbyImage
        image={badge.childImageSharp.gatsbyImageData}
        loading="eager"
        css={css`
          margin: 15px 0;
        `}
        alt="Identifying badge icon"
      />
      <Flex flexDirection="column" alignItems="center" maxWidth={["100%", props.fullPage ? "545px" : "85%"]} mx="auto">
        <ModalTitle>
          <Translate path="components.signup_teacher.ab_title_leader" />
        </ModalTitle>
        <Box>
          <Text display="inline-block">
            <Translate path="components.signup_teacher.subtitle" />
          </Text>
          <Link
            onClick={() => {
              le({
                eventName: "web.school_leader.user_signup.signup_form.login_instead.tap",
                eventValue: "domain_email_signup_overlay_variant",
              });
              showLoginModal();
            }}
            display="inline-block"
          >
            <MutedText display="inline-block" ml="5px" fontSize={[2, 2, 3]}>
              <Translate path="components.signup_teacher.log_in_here" />
            </MutedText>
          </Link>
        </Box>
        <SignupForm userType="school_leader" formData={props.formData} />
      </Flex>
    </CommonModal>
  );
};

export default SchoolLeaderSignupModal;
