import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Flex, FlexProps } from "@src/components/Boxes";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import Translate from "@src/components/translation/Translate";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { mediaQueries } from "@src/styles/theme";
import { getSubdomainURL } from "@src/utils/getSubdomainURL";
import { logEvent } from "@src/utils/logClient";
import { useFeatureFlagsWithOverrides } from "@src/utils/useFeatureFlag";
import { graphql, navigate, useStaticQuery } from "gatsby";
import window from "global/window";
import * as React from "react";
import { useContext } from "react";
import { AppDataContext } from "./AppDataContext";
import ResponsiveIcon from "./ResponsiveIcon";

const MaterialArrow = styled("div")`
  margin-top: 8px;
  background-image: url("data:image/svg+xml,%3Csvg width='17' height='16' viewBox='0 0 17 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.7281 8.51537C14.7946 8.35682 14.8314 8.1827 14.8314 8C14.8314 7.99649 14.8314 7.99299 14.8313 7.98949C14.8339 7.64493 14.7038 7.29956 14.4409 7.03666L9.82109 2.41689C9.30039 1.89619 8.45617 1.89619 7.93547 2.41689C7.41477 2.93759 7.41477 3.78181 7.93547 4.30251L10.2996 6.66667H2.83138C2.095 6.66667 1.49805 7.26362 1.49805 8C1.49805 8.73638 2.095 9.33333 2.83138 9.33333L10.2791 9.33333L7.93547 11.677C7.41477 12.1977 7.41477 13.0419 7.93547 13.5626C8.45617 14.0833 9.30039 14.0833 9.82109 13.5626L14.4386 8.94502C14.4458 8.93793 14.4528 8.93075 14.4598 8.9235C14.5769 8.8016 14.6664 8.66291 14.7281 8.51537Z' fill='%2300B2F7'/%3E%3C/svg%3E%0A");
  height: 16px;
  width: 16px;
`;

const selectorBadgeVariant = ({ responsive }: { responsive?: boolean }) => {
  if (responsive) {
    return css`
      flex-direction: row;
      width: 100%;
      font-size: 26px;

      ${mediaQueries[0]} {
        flex-direction: column;
        width: 25%;
        font-size: 18px;
        line-height: 26px;
      }
    `;
  }
  return css`
    flex-direction: column;
    width: 100%;
    width: 25%;

    font-size: 18px;
    line-height: 26px;
  `;
};

type SelectorBadgeProps = FlexProps & {
  responsive?: boolean;
  onClick?: () => void;
};
const SelectorBadge = styled(Flex)<SelectorBadgeProps>`
  margin: 5px;
  color: #2c2a50;
  background-color: #fff;
  border-radius: 24px;
  transition: box-shadow 0.2s;
  box-shadow: 0 0 0 rgba(37, 61, 229, 0);
  border: 2px solid #eaecf5;
  padding: 20px 5px;
  font-weight: 600;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  word-wrap: normal;
  white-space: normal;
  cursor: pointer;
  font-size: 18px;
  width: 100%;
  ${mediaQueries[1]} {
    max-width: 160px;
  }

  &:hover {
    box-shadow: 0 8px 0 rgba(37, 61, 229, 0.05);
  }
  ${selectorBadgeVariant};
`;
SelectorBadge.defaultProps = { alignItems: "center" };

export enum ConstituentButtonsType {
  LOGIN = "login",
  SIGNUP = "signup",
}

type ConstituentButtonsProps = {
  responsive?: boolean;
  type: ConstituentButtonsType;
  buttonLocation?: string;
  noRedirect?: boolean;
  arrow?: boolean;
  closeModal?: () => void;
};
const ConstituentButtons: React.FC<ConstituentButtonsProps> = ({
  responsive,
  buttonLocation,
  type = ConstituentButtonsType.LOGIN,
  noRedirect,
  arrow = false,
  closeModal,
}) => {
  const data = useStaticQuery(graphql`
    {
      parentBadge: file(name: { eq: "parent_badge" }) {
        childImageSharp {
          gatsbyImageData(width: 72, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
      studentBadge: file(name: { eq: "student_badge" }) {
        childImageSharp {
          gatsbyImageData(width: 72, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
      schoolLeaderBadge: file(name: { eq: "school_leader_badge" }) {
        childImageSharp {
          gatsbyImageData(width: 72, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
      teacherBadge: file(name: { eq: "teacher_badge" }) {
        childImageSharp {
          gatsbyImageData(width: 72, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
      districtBadge: file(name: { eq: "district_badge" }) {
        childImageSharp {
          gatsbyImageData(width: 72, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
    }
  `);
  const { teacherBadge, schoolLeaderBadge, studentBadge, parentBadge, districtBadge } = data;
  const appData = useContext(AppDataContext);
  const featureFlags = useFeatureFlagsWithOverrides();
  const modalContext = useContext(ModalContext);
  const { translationLocaleAsString } = useContext(TranslationContext);
  const currentLocale = translationLocaleAsString();
  const isLocaleEN = currentLocale === "en";

  // Experimentation section
  const shouldShowDistrictButtons = type !== ConstituentButtonsType.LOGIN && isLocaleEN;

  // End experimentation section

  function teachersButtonClick() {
    if (appData.data.type && appData.data.type === "teacher") {
      logEvent({ eventName: "web.teacher.external_page.from_button_link.user_login.tap" });
      window.location.href = getSubdomainURL("teacher");
    } else {
      if (type === ConstituentButtonsType.LOGIN) {
        logEvent({
          eventValue: window.location.href,
          eventName: "web.teacher.external_page.from_button_link.user_signup.start.tap",
        });
        modalContext.showModal(ModalType.SignupCombinedModal, {
          noRedirect,
          newLoginFeatures: true,
        });
      } else if (type === ConstituentButtonsType.SIGNUP) {
        if (buttonLocation === "header") {
          logEvent({
            eventValue: window.location.href,
            eventName: "web.teacher.external_page.from_header_link.user_signup.start.tap",
            metadata: featureFlags,
          });
        } else if (buttonLocation === "home") {
          logEvent({
            eventValue: window.location.href,
            eventName: "web.teacher.external_page.from_homepage.user_signup.start.tap",
            metadata: featureFlags,
          });
        }
        modalContext.showModal(ModalType.TeacherSignup);
      }
    }
  }

  function parentsButtonClick() {
    if (appData.data.type && appData.data.type === "parent") {
      logEvent({ eventName: "web.parent.external_page.from_button_link.user_login.tap" });
      window.location.href = getSubdomainURL("parent");
    } else {
      if (type === ConstituentButtonsType.LOGIN) {
        logEvent({
          eventValue: window.location.href,
          eventName: "web.parent.external_page.from_button_link.user_signup.start.tap",
        });
        modalContext.showModal(ModalType.ParentLogin);
      } else if (type === ConstituentButtonsType.SIGNUP) {
        if (buttonLocation === "header") {
          logEvent({
            eventValue: window.location.href,
            eventName: "web.parent.external_page.from_header_link.user_signup.start.tap",
            metadata: featureFlags,
          });
        } else if (buttonLocation === "home") {
          logEvent({
            eventValue: window.location.href,
            eventName: "web.parent.external_page.from_homepage.user_signup.start.tap",
            metadata: featureFlags,
          });
        }
        window.location.href = "https://home.classdojo.com/#/signup";
      }
    }
  }

  function studentsButtonClick() {
    if (type === ConstituentButtonsType.LOGIN) {
      logEvent({
        eventValue: window.location.href,
        eventName: "web.student.external_page.from_button_link.user_signup.start.tap",
      });
    } else if (type === ConstituentButtonsType.SIGNUP) {
      if (buttonLocation === "header") {
        logEvent({
          eventValue: window.location.href,
          eventName: "web.student.external_page.from_header_link.user_signup.start.tap",
        });
      } else if (buttonLocation === "home") {
        logEvent({
          eventValue: window.location.href,
          eventName: "web.student.external_page.from_homepage.user_signup.start.tap",
        });
      }
    }
    //If a student was the last user logged in we want to keep them logged in
    if (appData.data?.type === "student") {
      window.location.href = getSubdomainURL("student");
    } else {
      window.location.href = "https://student.classdojo.com/#/qr-reader";
    }
  }

  function schoolLeaderButtonClick() {
    if (appData.data.type && appData.data.type === "teacher") {
      logEvent({ eventName: "web.school_leader.external_page.from_button_link.user_login.tap" });
      window.location.href = getSubdomainURL("teacher");
    } else {
      if (type === ConstituentButtonsType.LOGIN) {
        logEvent({
          eventValue: window.location.href,
          eventName: "web.school_leader.external_page.from_button_link.user_signup.start.tap",
        });
        modalContext.showModal(ModalType.SchoolLeaderLogin, { noRedirect });
      } else if (type === ConstituentButtonsType.SIGNUP) {
        if (buttonLocation === "header") {
          logEvent({
            eventValue: window.location.href,
            eventName: "web.school_leader.external_page.from_header_link.user_signup.start.tap",
            metadata: featureFlags,
          });
        } else if (buttonLocation === "home") {
          logEvent({
            eventValue: window.location.href,
            eventName: "web.school_leader.external_page.from_homepage.user_signup.start.tap ",
            metadata: featureFlags,
          });
        }
        modalContext.showModal(ModalType.SchoolLeaderSignup);
      }
    }
  }

  function districtLeaderButtonClick() {
    if (type === ConstituentButtonsType.SIGNUP) {
      if (buttonLocation === "header") {
        logEvent({
          eventValue: window.location.href,
          eventName: "web.district_leader.external_page.from_header_link.user_signup.start.tap",
          metadata: featureFlags,
        });
      } else if (buttonLocation === "home") {
        logEvent({
          eventValue: window.location.href,
          eventName: "web.district_leader.external_page.from_homepage.user_signup.start.tap ",
          metadata: featureFlags,
        });
      }
    }
    closeModal && closeModal();
    navigate("/districts");
  }

  return (
    <Flex
      width="100%"
      ml="-15px"
      flexDirection={[responsive ? "column" : "row", "row"]}
      data-test-name={`constituent-button-container-${type}`}
      justifyContent="center"
    >
      <SelectorBadge
        as="button"
        responsive={responsive}
        onClick={teachersButtonClick}
        data-test-name="constituent-button-teacher"
        aria-label="Teacher sign up"
        key={"constituent-button-teacher"}
      >
        <ResponsiveIcon image={teacherBadge.childImageSharp.gatsbyImageData} alt="" />
        <Translate path="pages.home.teacher_signup" />
        {arrow && <MaterialArrow />}
      </SelectorBadge>
      <SelectorBadge
        as="button"
        responsive={responsive}
        onClick={parentsButtonClick}
        data-test-name="constituent-button-parent"
        aria-label="Parent sign up"
        key={"constituent-button-parent"}
      >
        <ResponsiveIcon image={parentBadge.childImageSharp.gatsbyImageData} alt="" />
        <Translate path="pages.home.parent_signup" />
        {arrow && <MaterialArrow />}
      </SelectorBadge>
      <SelectorBadge
        as="button"
        responsive={responsive}
        onClick={studentsButtonClick}
        data-test-name="constituent-button-student"
        aria-label="Student sign up"
      >
        <ResponsiveIcon image={studentBadge.childImageSharp.gatsbyImageData} alt="" />
        <Translate path="pages.home.student_signup" />
        {arrow && <MaterialArrow />}
      </SelectorBadge>
      <SelectorBadge
        as="button"
        responsive={responsive}
        onClick={schoolLeaderButtonClick}
        data-test-name="constituent-button-school-leader"
        aria-label="School leader sign up"
      >
        <ResponsiveIcon image={schoolLeaderBadge.childImageSharp.gatsbyImageData} alt="" />
        <Translate path="pages.home.administrator_signup" />
        {arrow && <MaterialArrow />}
      </SelectorBadge>
      {shouldShowDistrictButtons && (
        <SelectorBadge
          as="a"
          responsive={responsive}
          onClick={districtLeaderButtonClick}
          data-test-name="constituent-button-districts"
          aria-label="District leader page"
        >
          <ResponsiveIcon image={districtBadge.childImageSharp.gatsbyImageData} alt="" />
          <Translate path="layouts.main.district_leader" />
          {arrow && <MaterialArrow />}
        </SelectorBadge>
      )}
    </Flex>
  );
};

export default ConstituentButtons;
