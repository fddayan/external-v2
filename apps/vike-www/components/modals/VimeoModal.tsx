import React, { useContext } from "react";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import Modal from "react-modal";
import { ClassNames, css } from "@emotion/react";
import styled from "@emotion/styled";
import { Flex } from "../Boxes";
import VimeoEmbed from "../partials/VimeoEmbed";

const defaultModalDialogStyle = css`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background-clip: padding-box;
  outline: 0;
  iframe {
    border-radius: 24px;
    overflow: hidden;
  }
`;
const defaultOverlayStyle = css`
  background: rgba(0, 0, 0, 0.7);
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
  top: -50px;
  right: 0;
  width: 55px;
  height: 55px;
  color: #fff;
  font-size: 40px;
  z-index: 999;
  background: transparent;
  outline: 0;
  border: 0;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

type VideoModalProps = {
  videoUrl: string;
  closeModal: () => void;
};

const VideoModal = ({ videoUrl, closeModal }: VideoModalProps) => {
  const t = useContext(TranslationContext);
  return (
    <ClassNames>
      {({ css: classCSS }) => {
        return (
          <Modal
            isOpen={true}
            className={classCSS`${defaultModalDialogStyle}`}
            overlayClassName={classCSS`${defaultOverlayStyle}`}
            onRequestClose={closeModal}
          >
            <Flex flexDirection="column" alignItems="center" maxWidth="900px" mx="auto" position="relative">
              <CloseButton aria-label={t.translate("layouts.main.close_video") as string} onClick={closeModal}>
                ×
              </CloseButton>
              <div style={{ height: 500, width: "100%" }}>
                <VimeoEmbed url={videoUrl} />
              </div>
            </Flex>
          </Modal>
        );
      }}
    </ClassNames>
  );
};

export default VideoModal;
