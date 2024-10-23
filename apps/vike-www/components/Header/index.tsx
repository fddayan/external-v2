/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useRef, useState, useEffect } from "react";
import BurgerButton from "../BurgerButton";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import SchoolClosureBannerSection from "@src/components/partials/index/SchoolClosureBannerSection";
import { getRelativePath } from "@src/utils/routes";
import { logEvent } from "@src/utils/logClient";
import window from "global/window";
import NavLinks from "../partials/header/NavLinks";
import * as S from "./styles";
import FocusTrap from "focus-trap-react";
import useOnClickOutside from "@src/utils/useClickOutside";
import { useFeatureFlagsWithOverrides } from "@src/utils/useFeatureFlag";
import ClassDojoLogo from "@src/assets/images/classdojo-light.svg";
import useSearchParams from "@src/utils/useSearchParams";
import { AppDataContext } from "@src/components/AppDataContext";
import MentorBanner from "../partials/index/MentorBanner";
import DojoGlowBanner from "../partials/index/DojoGlowBanner";

type HeaderProps = {
  showNavBanner: boolean;
  inSchools: boolean;
  hideNav: boolean;
  unpinHeader: boolean;
  closeBannerFunction: () => void;
  handleIsUserInAudience: (newValue: boolean) => void;
};

const Header: React.FC<HeaderProps> = ({
  showNavBanner,
  inSchools,
  closeBannerFunction,
  hideNav,
  unpinHeader,
  handleIsUserInAudience,
}) => {
  const [headerOpen, setHeaderOpen] = useState<boolean>(false);
  const toggleHeader = () => setHeaderOpen(!headerOpen);
  const { showModal } = useContext(ModalContext);
  const showTeacherSignupModal = () => showModal(ModalType.TeacherSignupForm);
  const showSignupModal = () => showModal(ModalType.Signup);

  const teacherSignupParam = useSearchParams("teacher-signup");
  const generalSignupParam = useSearchParams("create-account");
  const modalContext = useContext(ModalContext);
  const featureFlags = useFeatureFlagsWithOverrides();

  const {
    data: { loadingSession, type, userData },
  } = useContext(AppDataContext);

  // defining audience for banner
  useEffect(() => {
    if (!loadingSession && type === undefined) {
      handleIsUserInAudience(true);
    }
  }, [loadingSession, type]);

  useEffect(() => {
    if (teacherSignupParam[0] !== null) showTeacherSignupModal();
    if (generalSignupParam[0] !== null) showSignupModal();
  }, []);

  function openLoginModal() {
    logEvent({ eventValue: window.location.href, eventName: "web.external_page.navbar.log_in.tap" });
    modalContext.showModal(ModalType.Login);
  }

  function openSignupModal() {
    logEvent({
      eventValue: window.location.href,
      eventName: "web.external_page.navbar.sign_up.tap",
      metadata: featureFlags,
    });
    modalContext.showModal(ModalType.Signup);
  }
  const ref = useRef(null);
  useOnClickOutside(ref, () => setHeaderOpen(false));

  const bannerToShow = () => {
    if (loadingSession || !showNavBanner) return null;
    if (userData && userData.isMentor) return <MentorBanner closeFunction={closeBannerFunction} />;
    if (userData && userData.isSchoolAdmin) return <SchoolClosureBannerSection closeFunction={closeBannerFunction} />;
    if (inSchools) return <SchoolClosureBannerSection closeFunction={closeBannerFunction} />;
    return <DojoGlowBanner closeFunction={closeBannerFunction} />;
  };

  return (
    <S.Nav role="navigation" unpinHeader={unpinHeader}>
      <S.HeaderContainer height="100%">
        <a href={getRelativePath("/")}>
          <S.Logo src="https://static.classdojo.com/img/classdojo-light.svg" alt="ClassDojo" />
        </a>

        {!hideNav && (
          <FocusTrap active={headerOpen}>
            <div role="dialog" aria-modal="true" ref={ref}>
              <BurgerButton onClick={toggleHeader} active={headerOpen} aria-expanded={headerOpen} />
              <NavLinks
                openLoginModal={openLoginModal}
                openSignupModal={openSignupModal}
                closeMenu={() => setHeaderOpen(false)}
                active={headerOpen}
              />
            </div>
          </FocusTrap>
        )}
      </S.HeaderContainer>
      {bannerToShow()}
    </S.Nav>
  );
};

export default Header;
