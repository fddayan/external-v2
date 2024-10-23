import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { Button } from "../../nessie-web";
import Translate from "../../translation/Translate";
import ClassDojoLogo from "@src/assets/images/classdojo-light.svg";
import * as S from "@src/components/Header/styles";
import { getRelativePath } from "@src/utils/routes";
import { Flex } from "../../Boxes";
import { ModalContext, ModalType } from "../../modals/ModalController";
import CalendlyModal from "../../CalendlyModal";
import { logEvent } from "@src/utils/logClient";
import { css } from "@emotion/react";
import { mediaQueriesMax } from "@src/styles/theme";
import { ShareButton } from "./ShareButton";
import { useDojoGlow } from "./context";

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

interface StickyHeaderProps {
  scrollY: number;
  language: string;
  slug: string;
}

const StickyHeader = ({ scrollY, slug, language }: StickyHeaderProps) => {
  const { stickyHeader } = useDojoGlow();
  const [isSticky, setIsSticky] = useState(false);
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

  return (
    <>
      <StickyNav role="navigation" unpinHeader={false} isSticky={isSticky}>
        <S.HeaderContainer height="100%" css={{ gridTemplateColumns: "1fr 1fr" }}>
          <a href={getRelativePath("/")}>
            <S.Logo src={ClassDojoLogo} alt="ClassDojo logo" />
          </a>
          <Flex flexDirection="row" width="100%" flex={1} justifyContent="flex-end" css={{ gap: 20 }}>
            <Heading css={{ alignSelf: "center" }}>
              <Translate path="directus.page_whats_new_2024_sl.header_heading" />
            </Heading>
            <ShareButton
              label={stickyHeader.share_button_text}
              slug={slug}
              language={language}
              url={stickyHeader.share_url}
            />
          </Flex>
        </S.HeaderContainer>
      </StickyNav>
    </>
  );
};

export default StickyHeader;
