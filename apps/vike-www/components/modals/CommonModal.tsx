import React, { useContext } from "react";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import Modal from "react-modal";
import { ClassNames, css, SerializedStyles } from "@emotion/react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import styled, { CSSObject } from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";
import { Flex } from "../Boxes";
import { FaChevronLeft } from "react-icons/fa";
import { CloseIcon, Heading, theme } from "@src/components/nessie-web";

const defaultModalDialogStyle = css`
  position: relative;
  margin: 30px 15px;
  ${mediaQueries[0]} {
    max-width: 620px;
    margin: 30px auto;
  }
  background: #fff;
  z-index: 1000;
  padding: 30px;
  border-radius: 48px;
  background-clip: padding-box;
  outline: 0;
`;
const defaultOverlayStyle = css`
  background-color: rgba(66, 62, 93, 0.9);
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  overflow-y: scroll;
  z-index: 99999;
`;

const fullScreenStyle = css`
  width: 100vw !important;
  height: 100% !important;
  max-width: 100vw !important;
  margin: 0 !important;
  overflow-y: auto !important;
`;

const fullPageStyle = css`
  ${fullScreenStyle};
  border-radius: 0;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 60px;
  height: 60px;
  cursor: pointer;
  background-color: transparent;
  border: 0;
`;

const ModalHeader = styled(Heading)`
  margin: ${theme.space.l}px 0;
`;

const CloseFullScreenButton = styled.button`
  display: flex;
  align-items: center;
  color: #adadad;
  border: 0;
  float: left;
  height: 50px;
  margin: 12px 16px;
  position: absolute;
  width: auto;
  font-size: 20px;
  background: transparent;
  text-shadow: 0 1px 0 #fff;
  z-index: 100;
  font-weight: 700;
  line-height: 1;
  top: 0;
  left: 0;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
`;

export type CommonModalProps = {
  closeModal?: () => void;
  children?: any;
  headerText?: string | React.ReactNode;
  noHeader?: boolean;
  noHeaderText?: boolean;
  fullScreen?: boolean;
  fullPage?: boolean;
  modalDialogStyle?: CSSObject | SerializedStyles;
  closeModalAction?: () => void;
  forceShowClose?: boolean;
};

const CommonModal = ({
  closeModal,
  closeModalAction,
  headerText,
  modalDialogStyle,
  noHeader,
  noHeaderText,
  fullScreen, // The modal will take up the full page but still have a border radius of the modal and a go back button instead of an x.
  children,
  fullPage, // The modal will look like a page with no border radius.
}: CommonModalProps) => {
  const data = useStaticQuery(graphql`
    {
      logo: file(name: { eq: "classdojo-logo-round-120x120" }) {
        childImageSharp {
          gatsbyImageData(width: 60, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
    }
  `);

  const { logo } = data;
  const t = useContext(TranslationContext);

  const showCloseButton = () => {
    if (fullScreen) {
      return (
        <CloseFullScreenButton onClick={closeModal}>
          <FaChevronLeft /> <span> Go Back</span>
        </CloseFullScreenButton>
      );
    } else {
      return (
        <CloseButton aria-label={t.translate("layouts.main.close_dialog") as string} onClick={closeModal}>
          <CloseIcon />
        </CloseButton>
      );
    }
  };

  return (
    <ClassNames>
      {({ css: classCSS }) => {
        const modalClass = () => {
          if (fullPage) {
            return classCSS`${defaultModalDialogStyle}; ${modalDialogStyle}; ${fullPageStyle}`;
          } else if (fullScreen) {
            return classCSS`${defaultModalDialogStyle}; ${modalDialogStyle}; ${fullScreenStyle}`;
          } else {
            return classCSS`${defaultModalDialogStyle}; ${modalDialogStyle}`;
          }
        };
        return (
          <Modal
            isOpen={true}
            className={modalClass()}
            overlayClassName={classCSS`${defaultOverlayStyle}; ${
              fullPage ? "overflow: hidden" : "transition: opacity 0.15s linear;"
            }`}
            onRequestClose={closeModal}
            onAfterClose={closeModalAction}
            style={{ content: fullPage ? { transform: "none" } : undefined }}
          >
            {showCloseButton()}
            <Flex flexDirection="column" alignItems="center">
              {!noHeader && <GatsbyImage image={logo.childImageSharp.gatsbyImageData} loading="eager" alt="" />}
              {!noHeader && !noHeaderText && <ModalHeader as="h1">{headerText}</ModalHeader>}
              {children}
            </Flex>
          </Modal>
        );
      }}
    </ClassNames>
  );
};

export { ModalHeader };
export default CommonModal;
