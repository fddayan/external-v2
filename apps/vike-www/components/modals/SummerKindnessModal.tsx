import React, { useContext } from "react";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import Modal from "react-modal";
import { ClassNames, css } from "@emotion/react";
import styled from "@emotion/styled";
import { Flex } from "../Boxes";
import { mediaQueries } from "@src/styles/theme";

const defaultModalDialogStyle = css`
  position: relative;
  margin: 30px 15px;
  ${mediaQueries[0]} {
    margin: 30px auto;
    max-width: 75vw;
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
  position: absolute;
  top: 0;
  right: 0;
  font-size: 14px;
  font-weight: 800;
  color: black;
  opacity: 1;
  z-index: 999;
  background: transparent;
  outline: 0;
  border: 0;
  cursor: pointer;
`;

type SummerKindnessModalProps = {
  content?: any;
  closeModal: () => void;
};

const SummerKindnessModal = ({ content, closeModal }: SummerKindnessModalProps) => {
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
            <Flex flexDirection="column" alignItems="center" width="100%" mx="auto" position="relative">
              <CloseButton aria-label={t.translate("layouts.main.close_dialog") as string} onClick={closeModal}>
                close
              </CloseButton>
              {content}
            </Flex>
          </Modal>
        );
      }}
    </ClassNames>
  );
};

export default SummerKindnessModal;
