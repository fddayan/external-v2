import React, { useContext } from "react";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import Modal from "react-modal";
import { ClassNames, css } from "@emotion/react";
import { mediaQueries } from "@src/styles/theme";
import styled from "@emotion/styled";
import { Flex } from "../Boxes";
import { theme } from "@src/components/nessie-web";

const defaultModalDialogStyle = css`
  position: relative;
  margin: 30px 15px;
  height: 90vh;
  ${mediaQueries[0]} {
    margin: 30px auto;
    max-width: 90vw;
  }
  background: #fff;
  z-index: 1000;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background-clip: padding-box;
  outline: 0;
`;
const defaultOverlayStyle = css`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: opacity 0.15s linear;
  overflow-y: scroll;
  z-index: 99999;
`;

const CloseButton = styled.button`
  align-self: flex-end;
  background: transparent;
  border: 0;
  font-size: 2.5em;
  color: ${theme.colors.taro40};
  position: absolute;
  top: 12px;
  right: 12px;
  color: #959dad;
  font-weight: bold;
  cursor: pointer;
  z-index: 999;
`;

const IdeasFrame = styled.iframe`
  width: 100%;
  height: 100%;
`;

type IdeasSlideModalProps = {
  url: string;
  closeModal: () => void;
};

const IdeasSlideModal = ({ url, closeModal }: IdeasSlideModalProps) => {
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
            <Flex flexDirection="column" alignItems="center" width="100%" height="100%" mx="auto" position="relative">
              <CloseButton aria-label={t.translate("layouts.main.close_dialog") as string} onClick={closeModal}>
                &#x2715;
              </CloseButton>
              <IdeasFrame src={url}></IdeasFrame>
            </Flex>
          </Modal>
        );
      }}
    </ClassNames>
  );
};

export default IdeasSlideModal;
