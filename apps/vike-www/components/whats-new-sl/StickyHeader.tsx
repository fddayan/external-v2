import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { Button } from "../nessie-web";
import Translate from "../translation/Translate";
import ClassDojoLogo from "@src/assets/images/classdojo-light.svg";
import * as S from "@src/components/Header/styles";
import { getRelativePath } from "@src/utils/routes";
import { Flex } from "../Boxes";
import { ModalContext, ModalType } from "../modals/ModalController";
import CalendlyModal from "../CalendlyModal";
import { logEvent } from "@src/utils/logClient";
import { css } from "@emotion/react";
import { mediaQueriesMax } from "@src/styles/theme";

const animateInHeaderStyle = css`
  transform: translateY(-100%);
  transition: transform 0.5s ease-in-out;
`;

const animateOutHeaderStyle = css`
  transform: translateY(0);
  transition: transform 0.5s ease-in-out;
`;

const StickyNav = styled(S.Nav)<{ isSticky: boolean }>`
  ${(props) => (props.isSticky ? animateOutHeaderStyle : animateInHeaderStyle)}
  ${mediaQueriesMax[1]} {
    display: none;
  }
`;

const Heading = styled.h1`
  font-size: 24px;
`;

const SecondaryButton = styled(Button)`
  background: #f5ebff;
  :hover,
  :focus,
  :active {
    background: #f5ebff;
  }
  span {
    color: #7d40ff;
  }
`;

const PrimaryButton = styled(Button)`
  background: #7d40ff;
  :hover,
  :focus,
  :active {
    background: #7d40ff;
  }
  span {
    color: white;
  }
`;

const StickyHeader = ({ scrollY, utmParams }) => {
  const [showCalendly, setShowCalendly] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const modalContext = React.useContext(ModalContext);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > scrollY) {
        // Change this value to the desired scroll position in pixels
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  const openCalendly = () => {
    setShowCalendly(true);
    logEvent({
      eventName: "web.external.page_whats_new_2024_sl.sticky.open_calendly_captcha",
      eventValue: window.location.href,
    });
  };

  const openSignUpModal = () => {
    logEvent({
      eventValue: window.location.href,
      eventName: "web.external.page_whats_new_2024_sl.sticky.sign_up.tap",
    });
    modalContext.showModal(ModalType.Signup);
  };
  const closeCalendly = () => {
    setShowCalendly(false);
  };

  const buildCalendlyLink = () => {
    const baseLink = "https://calendly.com/d/cn96-2ws-fxy?utm_source=sayhelloLPsticky";
    const utmString = new URLSearchParams(utmParams).toString();
    return `${baseLink}&${utmString}`;
  };

  // if (!isSticky) return null;

  return (
    <>
      <StickyNav role="navigation" unpinHeader={false} isSticky={isSticky}>
        <S.HeaderContainer height="100%" css={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
          <a href={getRelativePath("/")}>
            <S.Logo src={ClassDojoLogo} alt="ClassDojo logo" />
          </a>
          <Heading>
            <Translate path="directus.page_whats_new_2024_sl.header_heading" />
          </Heading>
          <Flex flexDirection="row" css={{ gap: 10, alignItems: "flex-end" }}>
            <SecondaryButton onClick={openCalendly}>
              <Translate path="directus.page_whats_new_2024_sl.header_secondary_button" />
            </SecondaryButton>
            <PrimaryButton onClick={openSignUpModal}>
              <Translate path="directus.page_whats_new_2024_sl.header_primary_button" />
            </PrimaryButton>
          </Flex>
        </S.HeaderContainer>
      </StickyNav>
      {showCalendly && (
        <CalendlyModal
          logEventContext="page_whats_new_2024_sl"
          calendlyLink={buildCalendlyLink()}
          closeModal={closeCalendly}
        />
      )}
    </>
  );
};

export default StickyHeader;
