import React, { useContext, useEffect } from "react";
import CommonModal from "../CommonModal";
import { MutedText, Text } from "@src/components/Text";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import styled from "@emotion/styled";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { Flex } from "@src/components/Boxes";
import SignupForm, { SignupFormDataInput } from "../SignupForm";
import Translate from "../../translation/Translate";
import isMobile from "@src/utils/isMobile";
import { logEvent as le } from "@src/utils/logClient";
import { Subheading, Space, theme } from "../../nessie-web";

const {
  colors: { dt_taro10, dt_taro50 },
} = theme;

const LinkButton = styled("button")`
  border: 0;
  background: transparent;
  font-weight: bold;
  color: #2c2f42;
  &:hover {
    text-decoration: underline;
  }
`;

const ModalTitle = styled("h3")`
  font-size: 36px;
  font-weight: 800;
  margin: 18px 0;
  line-height: 40px;
  text-align: center;
`;

const SignToWatchWrapper = styled("div")`
  background-color: ${dt_taro10};
  padding: 16px;
  text-align: center;
`;

type TeacherSignupModalProps = {
  signToWatch?: string;
  closeModal: () => void;
  formData: SignupFormDataInput;
  fullPage?: boolean;
};

const TeacherSignupModal: React.FC<TeacherSignupModalProps> = (props) => {
  const data = useStaticQuery(graphql`
    {
      badge: file(name: { eq: "teacher_badge" }) {
        childImageSharp {
          gatsbyImageData(width: 88, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
    }
  `);

  const { badge } = data;

  const modalContext = useContext(ModalContext);

  useEffect(() => {
    le({ eventName: "externalPage.teacher_or_school_leader.signup_modal.shown", eventValue: "email_signup" });
  });

  function showLoginModal() {
    modalContext.showModal(ModalType.TeacherLogin);
  }

  return (
    <CommonModal noHeader fullScreen={isMobile().apple.device} {...props}>
      <GatsbyImage image={badge.childImageSharp.gatsbyImageData} loading="eager" alt="" />
      <Flex flexDirection="column" alignItems="center" maxWidth={["100%", props.fullPage ? "545px" : "85%"]} mx="auto">
        <ModalTitle>
          <Translate path="components.signup_teacher.ab_title_teacher" />
        </ModalTitle>
        {props.signToWatch && (
          <>
            <SignToWatchWrapper>
              <Subheading color={dt_taro50}>{props.signToWatch}</Subheading>
            </SignToWatchWrapper>
            <Space size="m" />
          </>
        )}
        <div>
          <Text display="inline-block">
            <Translate path="components.signup_teacher.subtitle" />
          </Text>
          <LinkButton
            onClick={() => {
              le({
                eventName: "web.teacher.user_signup.signup_form.login_instead.tap",
                eventValue: "domain_email_signup_overlay_variant",
              });
              showLoginModal();
            }}
          >
            <MutedText display="inline-block" ml="5px" fontSize={[2, 2, 3]}>
              <Translate path="components.signup_teacher.log_in_here" />
            </MutedText>
          </LinkButton>
        </div>
        <SignupForm formData={props.formData} userType="teacher" />
      </Flex>
    </CommonModal>
  );
};

export default TeacherSignupModal;
