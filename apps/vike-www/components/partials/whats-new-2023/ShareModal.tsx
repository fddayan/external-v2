import React, { useContext, useState } from "react";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import Modal from "react-modal";
import { ClassNames, css } from "@emotion/react";
import styled from "@emotion/styled";
import { useLocation } from "@reach/router";
import { logEvent } from "@src/utils/logClient";
import { BodyText, Button } from "@src/components/new-nessie";
import Translate from "@src/components/translation/Translate";
import SvgIcon from "@src/utils/SvgIcon";
import { mediaQueries } from "@src/styles/theme";

const defaultModalDialogStyle = css`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 460px;
  width: 100%;
  display: grid;
  gap: 24px;
  border-radius: 24px;
  padding: 36px;
  background: #fff;
  z-index: 1000;
  background-clip: padding-box;
  outline: 0;
  text-align: center;
  & > a,
  & > button {
    width: 100%;
  }
  & > p {
    font-weight: 800;
    margin-bottom: 0;
  }
`;
const defaultOverlayStyle = css`
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  transition: opacity 0.15s linear;
  overflow-y: scroll;
  z-index: 99999;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 14px;
  width: 30px;
  height: 30px;
  color: #000;
  font-size: 40px;
  z-index: 999;
  transition: opacity 0.4s;
  background: transparent;
  outline: 0;
  border: 0;
  cursor: pointer;
  width: auto !important;
  &:hover {
    opacity: 1;
  }
`;

const ShareButton = styled(Button)`
  position: fixed;
  z-index: 99;
  right: 12px;
  top: 112px;
  ${mediaQueries[0]} {
    top: auto;
    bottom: 48px;
    right: 48px;
  }
`;

const ShareModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [clipboardText, setClipboardText] = useState("directus.page_whats_new_2023.share_modal_clipboard_label");
  const closeModal = () => setShowModal(false);
  const openModal = () => {
    logEvent("web.external_page.whatsnew.share.open_modal");
    setShowModal(true);
  };

  const location = useLocation();
  const { translate } = useContext(TranslationContext);
  const url = typeof window !== "undefined" ? location.href : "";

  const copyToClipboard = () => {
    if (navigator && navigator.clipboard) {
      logEvent("web.external_page.whatsnew.share.copy_link");
      navigator.clipboard.writeText(url).then(
        () => {
          setClipboardText("directus.page_whats_new_2023.share_modal_clipboard_success");
          setTimeout(() => setClipboardText("directus.page_whats_new_2023.share_modal_clipboard_label"), 1200);
        },
        (error) => {
          console.log(error);
        },
      );
    }
  };

  return (
    <ClassNames>
      {({ css: classCSS }) => {
        return (
          <>
            <ShareButton noIcon kind="tertiary" onClick={openModal}>
              <SvgIcon name="Share" size={24} iconColor="#884DFF" />
              <Translate path="layouts.main.share" />
            </ShareButton>
            <Modal
              isOpen={showModal}
              className={classCSS`${defaultModalDialogStyle}`}
              overlayClassName={classCSS`${defaultOverlayStyle}`}
              onRequestClose={closeModal}
            >
              <CloseButton onClick={closeModal}>×</CloseButton>
              <BodyText>
                <Translate path="directus.page_whats_new_2023.share_modal_heading" />
              </BodyText>
              <Button noIcon onClick={copyToClipboard}>
                <SvgIcon name="Link" size={24} iconColor="white" />
                <Translate path={clipboardText} />
              </Button>
              <Button
                noIcon
                kind="secondary"
                href={`mailto:?body=${encodeURI(
                  translate("directus.page_whats_new_2023.share_modal_email_text") + " " + url,
                )}`}
                onClick={() => logEvent("web.external_page.whatsnew.share.email")}
                as="a"
              >
                <SvgIcon name="Mail" size={24} />
                <Translate path="directus.page_whats_new_2023.share_modal_email_label" />
              </Button>
            </Modal>
          </>
        );
      }}
    </ClassNames>
  );
};

export default ShareModal;
