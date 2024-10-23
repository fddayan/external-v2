/* eslint-disable jsx-a11y/media-has-caption */
import React, { useContext } from "react";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import Modal from "react-modal";
import { ClassNames, css } from "@emotion/react";
import styled from "@emotion/styled";
import { Flex } from "../Boxes";

const defaultModalDialogStyle = css`
  position: relative;
  top: 89px;
  width: 100%;
  background: #fff;
  z-index: 1000;
  background: #000;
  background-clip: padding-box;
  outline: 0;
`;
const defaultOverlayStyle = css`
  background: rgba(0, 0, 0, 0.9);
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
  top: -45px;
  right: 0;
  width: 55px;
  height: 55px;
  color: #fff;
  font-size: 40px;
  z-index: 999;
  opacity: 0.25;
  transition: opacity 0.4s;
  background: transparent;
  outline: 0;
  border: 0;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

type SelfHostedVideoModalProps = {
  url: string;
  subtitles?: {
    src: string;
    lang: string;
    isDefault?: boolean;
  }[];
  closeModal: () => void;
};

const SelfHostedVideoModal = ({ url, closeModal, subtitles }: SelfHostedVideoModalProps) => {
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
              <CloseButton aria-label={t.translate("layouts.main.close_dialog") as string} onClick={closeModal}>
                ×
              </CloseButton>
              {/* I'm disabling jsx-a11y/media-has-caption rule for now since we need to find how to fix this */}
              <video width="100%" max-height="500px" controls>
                <source src={url} type="video/mp4" />
                {subtitles?.map(({ src, lang, isDefault }, i) => (
                  <track src={src} srcLang={lang} kind="captions" default={isDefault} key={i} />
                )) ?? null}
              </video>
            </Flex>
          </Modal>
        );
      }}
    </ClassNames>
  );
};

export default SelfHostedVideoModal;
