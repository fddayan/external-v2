import React, { useState, useContext } from "react";
import LoginModal from "@src/components/modals/LoginModal";
import TeacherLoginModal from "@src/components/modals/TeacherLoginModal";
import SignupModal from "@src/components/modals/SignupModal";
import LanguageChooserModal from "@src/components/modals/LanguageChooserModal";
import ResetPasswordModal from "@src/components/modals/ResetPasswordModal";
import ParentLoginModal from "@src/components/modals/ParentLoginModal";
import ParentSignupModal from "@src/components/modals/ParentSignupModal";
import WhatIsACodeModal from "@src/components/modals/WhatIsACodeModal";
import SchoolLeaderLoginModal from "./SchoolLeaderLoginModal";
import VideoModal from "./VideoModal";
import VimeoModal from "./VimeoModal";
import SelfHostedVideoModal from "./SelfHostedVideoModal";
import SendgridModal from "./SendgridModal";
import SummerKindnessModal from "@src/components/modals/SummerKindnessModal";
import IdeasSlideModal from "@src/components/modals/IdeasSlideModal";
import ConundrumsPrizeModal from "@src/components/modals/ConundrumsPrizeModal";
import BadgesModal from "@src/components/modals/BadgesModal";
import JoinTheClubModal from "@src/components/modals/MentorsSurveys/JoinTheClubModal";
import AcceptMissionModal from "@src/components/modals/MentorsSurveys/AcceptMissionModal";
import MissionCompleteModal from "./MentorsSurveys/MissionCompleteModal";
import TeacherSignupModal from "./TeacherSignup/TeacherSignupModal";
import SchoolLeaderSignupModal from "./SchoolLeaderSignup/SchoolLeaderSignupModal";
import DistrictsDownloadModal from "@src/components/modals/DistrictsDownloadModal";
import SchoolsPageLeadGen from "./SchoolsLeadGenModal";
import SignupCombinedModal from "./SignupCombinedModal";
import { ActivationRedirectionContext } from "@src/contexts/ActivationRedirectionContext";

enum ModalType {
  LanguageChooser,
  Login,
  Signup,
  ResetPassword,
  TeacherLogin,
  TeacherSignup,
  ParentLogin,
  ParentSignup,
  SchoolLeaderLogin,
  SchoolLeaderSignup,
  WhatIsACode,
  VideoModal,
  SelfHostedVideoModal,
  SummerKindnessModal,
  IdeasSlideModal,
  SendgridModal,
  ConundrumsPrizeModal,
  BadgesModal,
  JoinTheClubModal,
  AcceptMissionModal,
  MissionCompleteModal,
  SchoolLeaderSignupFullScreen,
  DistrictsDownloadModal,
  TeacherSignupForm,
  SchoolLeaderSignupForm,
  SignupCombinedModal,
  SchoolsLeadGenModal,
  VimeoModal,
}

type ModalsState = {
  modal?: ModalType | null;
  props?: any;
};

type ModalContextType = ModalsState & {
  showModal: (arg0: ModalType, arg1?: any) => void;
  hideModal: () => void;
};

const ModalContext = React.createContext<ModalContextType>({
  showModal: () => null,
  hideModal: () => null,
});

const ModalProvider = ({ children }: { children: JSX.Element }) => {
  const [modalsState, setModalsState] = useState<ModalsState>({});
  const { setDefaultRedirection } = useContext(ActivationRedirectionContext);
  return (
    <ModalContext.Provider
      value={{
        ...modalsState,
        showModal: (modal, props = {}) => {
          setModalsState({
            props,
            modal,
          });
        },
        hideModal: () => {
          setDefaultRedirection?.();
          setModalsState({
            modal: null,
            props: {},
          });
        },
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

const ModalRoot = () => (
  <ModalContext.Consumer>
    {({ modal, props, hideModal }) => (
      <div>
        {modal === ModalType.TeacherLogin && <TeacherLoginModal {...props} closeModal={hideModal} />}
        {modal === ModalType.TeacherSignup && <SignupCombinedModal {...props} closeModal={hideModal} />}
        {modal === ModalType.TeacherSignupForm && <TeacherSignupModal {...props} closeModal={hideModal} />}
        {modal === ModalType.ParentLogin && <ParentLoginModal {...props} closeModal={hideModal} />}
        {modal === ModalType.ParentSignup && <ParentSignupModal {...props} closeModal={hideModal} />}
        {modal === ModalType.Login && <LoginModal {...props} closeModal={hideModal} />}
        {modal === ModalType.Signup && <SignupModal {...props} closeModal={hideModal} />}
        {modal === ModalType.SchoolLeaderSignup && (
          <SignupCombinedModal {...props} schoolLeader closeModal={hideModal} />
        )}
        {modal === ModalType.SchoolLeaderSignupForm && <SchoolLeaderSignupModal {...props} closeModal={hideModal} />}
        {modal === ModalType.ResetPassword && <ResetPasswordModal {...props} closeModal={hideModal} />}
        {modal === ModalType.LanguageChooser && <LanguageChooserModal {...props} closeModal={hideModal} />}
        {modal === ModalType.WhatIsACode && <WhatIsACodeModal {...props} closeModal={hideModal} />}
        {modal === ModalType.SchoolLeaderLogin && <SchoolLeaderLoginModal {...props} closeModal={hideModal} />}
        {modal === ModalType.VideoModal && <VideoModal {...props} closeModal={hideModal} />}
        {modal === ModalType.SelfHostedVideoModal && <SelfHostedVideoModal {...props} closeModal={hideModal} />}
        {modal === ModalType.SummerKindnessModal && <SummerKindnessModal {...props} closeModal={hideModal} />}
        {modal === ModalType.IdeasSlideModal && <IdeasSlideModal {...props} closeModal={hideModal} />}
        {modal === ModalType.SendgridModal && <SendgridModal {...props} closeModal={hideModal} />}
        {modal === ModalType.ConundrumsPrizeModal && <ConundrumsPrizeModal {...props} closeModal={hideModal} />}
        {modal === ModalType.BadgesModal && <BadgesModal {...props} closeModal={hideModal} />}
        {modal === ModalType.JoinTheClubModal && <JoinTheClubModal {...props} closeModal={hideModal} />}
        {modal === ModalType.AcceptMissionModal && <AcceptMissionModal {...props} closeModal={hideModal} />}
        {modal === ModalType.MissionCompleteModal && <MissionCompleteModal {...props} closeModal={hideModal} />}
        {modal === ModalType.DistrictsDownloadModal && <DistrictsDownloadModal {...props} closeModal={hideModal} />}
        {modal === ModalType.SchoolsLeadGenModal && <SchoolsPageLeadGen {...props} closeModal={hideModal} />}
        {modal === ModalType.SignupCombinedModal && <SignupCombinedModal {...props} closeModal={hideModal} />}
        {modal === ModalType.VimeoModal && <VimeoModal {...props} closeModal={hideModal} />}
      </div>
    )}
  </ModalContext.Consumer>
);

export { ModalProvider, ModalRoot, ModalContext, ModalType };
