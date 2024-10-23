import styled from "@emotion/styled";
import { AppDataContext } from "@src/components/AppDataContext";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import Translate from "@src/components/translation/Translate";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { mediaQueriesMax } from "@src/styles/theme";
import { ExternalSwitches } from "@src/utils/experiments/constants";
import { getSubdomainURL } from "@src/utils/getSubdomainURL";
import { logEvent } from "@src/utils/logClient";
import { useFeatureFlagsWithOverrides } from "@src/utils/useFeatureFlag";
import { graphql, navigate, useStaticQuery } from "gatsby";
import window from "global/window";
import * as React from "react";
import { useContext } from "react";

const ArrowRightIcon = () => {
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.23299 13.8535L18.3507 14.1174L14.0893 19.0988C13.5688 19.6973 13.5756 20.5976 14.0986 21.1505C14.3895 21.4594 14.8028 21.6317 15.223 21.6202C15.647 21.6126 16.0479 21.4208 16.3273 21.0994L22.3073 14.1302C23.0231 13.3063 23.0443 12.0915 22.3576 11.2469L16.6984 4.13458C16.4194 3.7884 16.0029 3.5861 15.5567 3.57832C15.223 3.57249 14.8948 3.67928 14.6288 3.88092C14.3133 4.1192 14.1121 4.47199 14.0638 4.87621C14.0114 5.30286 14.135 5.74008 14.3993 6.06724L18.4067 11.1255L3.23648 10.8607C2.81279 10.8533 2.40471 11.0262 2.11426 11.3361C1.8238 11.6461 1.67775 12.0636 1.71534 12.4881C1.77718 13.243 2.44548 13.8473 3.23661 13.8611L3.23299 13.8535Z"
        fill="#8047FF"
      />
    </svg>
  );
};

const SignupButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  width: 100%;
  gap: 12px;
  height: 200px;
  ${mediaQueriesMax[2]} {
    flex-wrap: wrap;
    gap: 20px;
    height: auto;
  }

  a,
  button {
    border-radius: 27px;
    border: 4px solid var(--Taro-30, #d3d7ec);
    background: #fff;
    box-shadow: 2.69px 12.56px 17.94px 0px rgba(0, 0, 0, 0.1);
    width: 230px;
    height: 170px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    font-size: 26px;
    font-style: normal;
    font-weight: 800;
    gap: 6px;
    cursor: pointer;
    color: #000;
    img {
      width: 66px;
    }
    &:hover {
      background-color: #d1ebff;
    }
    span svg {
      display: none;
    }
    ${mediaQueriesMax[2]} {
      border: none;
      background: transparent;
      box-shadow: none;
      width: auto;
      height: auto;
      color: var(--Taro-60, #5d5d8f);
      text-align: center;
      font-feature-settings: "clig" off, "liga" off;
      font-size: 13px;
      font-style: normal;
      font-weight: 700;
      line-height: 120%; /* 15.6px */
      &:hover {
        background-color: transparent;
      }
      > svg {
        display: none;
      }
      span {
        width: 82px;
        height: 82px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        padding: 6px;
        background-color: #fff;
        border-radius: 16px;
        box-shadow: 0px 2.369px 4.738px 0px rgba(83, 88, 135, 0.1);
        svg {
          display: block;
          position: absolute;
          bottom: 5px;
          right: 5px;
          width: 15px;
          height: 15px;
        }
      }
      img {
        width: 55px;
      }
    }
  }
`;

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
const ConstituentButtonsNew: React.FC<ConstituentButtonsProps> = ({
  buttonLocation,
  type = ConstituentButtonsType.LOGIN,
  noRedirect,
  closeModal,
}) => {
  const data = useStaticQuery(graphql`
    {
      apple: file(relativePath: { eq: "plasticines/apple_mentor_01.png" }) {
        publicURL
      }
      backpack: file(relativePath: { eq: "plasticines/backpack.png" }) {
        publicURL
      }
      heart: file(relativePath: { eq: "plasticines/heart_simple_01.png" }) {
        publicURL
      }
      school: file(relativePath: { eq: "plasticines/school_building_2.png" }) {
        publicURL
      }
      studentsHat: file(relativePath: { eq: "plasticines/students_hat.png" }) {
        publicURL
      }
    }
  `);
  const { backpack, studentsHat, school, heart, apple } = data;
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
          experiments: [ExternalSwitches.WEB_EXTERNAL_HOMEPAGE_EXPERIMENT_2024],
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
            experiments: [ExternalSwitches.WEB_EXTERNAL_HOMEPAGE_EXPERIMENT_2024],
          });
        } else if (buttonLocation === "home") {
          logEvent({
            eventValue: window.location.href,
            eventName: "web.teacher.external_page.from_homepage.user_signup.start.tap",
            metadata: featureFlags,
            experiments: [ExternalSwitches.WEB_EXTERNAL_HOMEPAGE_EXPERIMENT_2024],
          });
        }
        modalContext.showModal(ModalType.TeacherSignup);
      }
    }
  }

  function parentsButtonClick() {
    if (appData.data.type && appData.data.type === "parent") {
      logEvent({
        eventName: "web.parent.external_page.from_button_link.user_login.tap",
        experiments: [ExternalSwitches.WEB_EXTERNAL_HOMEPAGE_EXPERIMENT_2024],
      });
      window.location.href = getSubdomainURL("parent");
    } else {
      if (type === ConstituentButtonsType.LOGIN) {
        logEvent({
          eventValue: window.location.href,
          eventName: "web.parent.external_page.from_button_link.user_signup.start.tap",
          experiments: [ExternalSwitches.WEB_EXTERNAL_HOMEPAGE_EXPERIMENT_2024],
        });
        modalContext.showModal(ModalType.ParentLogin);
      } else if (type === ConstituentButtonsType.SIGNUP) {
        if (buttonLocation === "header") {
          logEvent({
            eventValue: window.location.href,
            eventName: "web.parent.external_page.from_header_link.user_signup.start.tap",
            metadata: featureFlags,
            experiments: [ExternalSwitches.WEB_EXTERNAL_HOMEPAGE_EXPERIMENT_2024],
          });
        } else if (buttonLocation === "home") {
          logEvent({
            eventValue: window.location.href,
            eventName: "web.parent.external_page.from_homepage.user_signup.start.tap",
            metadata: featureFlags,
            experiments: [ExternalSwitches.WEB_EXTERNAL_HOMEPAGE_EXPERIMENT_2024],
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
          experiments: [ExternalSwitches.WEB_EXTERNAL_HOMEPAGE_EXPERIMENT_2024],
        });
      } else if (buttonLocation === "home") {
        logEvent({
          eventValue: window.location.href,
          eventName: "web.student.external_page.from_homepage.user_signup.start.tap",
          experiments: [ExternalSwitches.WEB_EXTERNAL_HOMEPAGE_EXPERIMENT_2024],
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
          experiments: [ExternalSwitches.WEB_EXTERNAL_HOMEPAGE_EXPERIMENT_2024],
        });
        modalContext.showModal(ModalType.SchoolLeaderLogin, { noRedirect });
      } else if (type === ConstituentButtonsType.SIGNUP) {
        if (buttonLocation === "header") {
          logEvent({
            eventValue: window.location.href,
            eventName: "web.school_leader.external_page.from_header_link.user_signup.start.tap",
            metadata: featureFlags,
            experiments: [ExternalSwitches.WEB_EXTERNAL_HOMEPAGE_EXPERIMENT_2024],
          });
        } else if (buttonLocation === "home") {
          logEvent({
            eventValue: window.location.href,
            eventName: "web.school_leader.external_page.from_homepage.user_signup.start.tap ",
            metadata: featureFlags,
            experiments: [ExternalSwitches.WEB_EXTERNAL_HOMEPAGE_EXPERIMENT_2024],
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
          experiments: [ExternalSwitches.WEB_EXTERNAL_HOMEPAGE_EXPERIMENT_2024],
        });
      } else if (buttonLocation === "home") {
        logEvent({
          eventValue: window.location.href,
          eventName: "web.district_leader.external_page.from_homepage.user_signup.start.tap ",
          experiments: [ExternalSwitches.WEB_EXTERNAL_HOMEPAGE_EXPERIMENT_2024],
          metadata: featureFlags,
        });
      }
    }
    closeModal && closeModal();
    navigate("/districts");
  }

  return (
    <SignupButtonContainer>
      <button onClick={teachersButtonClick}>
        <span>
          <img src={apple.publicURL} alt="" />
          <ArrowRightIcon />
        </span>
        <Translate path="directus.page_homepage_2024.signup_teachers" />
        <ArrowRightIcon />
      </button>
      <button onClick={parentsButtonClick}>
        <span>
          <img src={heart.publicURL} alt="" />
          <ArrowRightIcon />
        </span>
        <Translate path="directus.page_homepage_2024.signup_families" />
        <ArrowRightIcon />
      </button>
      <button onClick={studentsButtonClick}>
        <span>
          <img src={backpack.publicURL} alt="" />
          <ArrowRightIcon />
        </span>
        <Translate path="directus.page_homepage_2024.signup_kids" />
        <ArrowRightIcon />
      </button>
      <button onClick={schoolLeaderButtonClick}>
        <span>
          <img src={school.publicURL} alt="" />
          <ArrowRightIcon />
        </span>
        <Translate path="directus.page_homepage_2024.signup_school_leaders" />
        <ArrowRightIcon />
      </button>
      {shouldShowDistrictButtons && (
        <button onClick={districtLeaderButtonClick}>
          <span>
            <img src={studentsHat.publicURL} alt="" />
            <ArrowRightIcon />
          </span>
          <Translate path="directus.page_homepage_2024.signup_district_leaders" />
          <ArrowRightIcon />
        </button>
      )}
    </SignupButtonContainer>
  );
};

export default ConstituentButtonsNew;
