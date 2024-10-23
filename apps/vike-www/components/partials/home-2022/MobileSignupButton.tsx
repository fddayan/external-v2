import styled from "@emotion/styled";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import { Button } from "@src/components/nessie-web";
import Translate from "@src/components/translation/Translate";
import { mediaQueries } from "@src/styles/theme";
import { ExternalSwitches } from "@src/utils/experiments/constants";
import { logEvent } from "@src/utils/logClient";
import React, { useContext } from "react";

type MobileSignupButtonProps = {
  showButton: boolean;
};

const FixedButton = styled(Button)<MobileSignupButtonProps>`
  width: 240px;
  position: fixed;
  bottom: ${(p) => (p.showButton ? "36px" : "-60px")};
  left: 50%;
  transform: translateX(-50%);
  z-index: 99;
  cursor: pointer;
  transition: all cubic-bezier(0, 0.4, 0.57, 1.37) 0.2s;
  ${mediaQueries[0]} {
    bottom: -60px;
  }
`;

const MobileSignupButton: React.FC<MobileSignupButtonProps> = (props) => {
  const { showModal } = useContext(ModalContext);
  const openSignupModal = () => {
    logEvent({
      eventValue: window.location.href,
      eventName: "web.external_page.mobile.signup.tap",
      experiments: [ExternalSwitches.WEB_EXTERNAL_HOMEPAGE_EXPERIMENT_2024],
    });
    showModal(ModalType.SignupCombinedModal);
  };
  return (
    <FixedButton {...props} onClick={openSignupModal}>
      <Translate path="layouts.main.signup" />
    </FixedButton>
  );
};

export default MobileSignupButton;
