import React, { useContext, useState, useEffect } from "react";
import { Flex } from "@src/components/Boxes";
import styled from "@emotion/styled";
import Link from "@src/components/UTMLink";
import Translate from "@src/components/translation/Translate";
import { CloseIcon } from "@src/components/nessie-web";
import { getRelativePath } from "@src/utils/routes";
import { mediaQueries } from "@src/styles/theme";
import Container from "@src/components/Container";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { logEvent } from "@src/utils/logClient";
import UTMLink from "@src/components/UTMLink";
import { mediaQueriesMax } from "@src/styles/theme";

const Header = styled("h2")`
  font-size: 23px;
  font-weight: 700;
  line-height: 14.962px; /* 65.012% */
  letter-spacing: -0.46px;
  color: #fff;
  font-family: DojoDisplay !important;
  z-index: 3;
  text-align: center;
  margin-bottom: 0;
  margin-top: 0px;
  padding-block: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  img {
    padding-inline: 20px;
    vertical-align: middle;
  }
  &.mobile {
    display: none;
  }
  ${mediaQueriesMax[1]} {
    &.mobile {
      display: flex;
      justify-content: center;
    }
    &.desktop {
      display: none;
    }
  }
  ${mediaQueriesMax[1]} {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: left;
    font-size: 16px;
    line-height: 100%;
    padding-bottom: 12px;
    gap: 12px;
    u {
      display: block;
      margin-top: 6px;
    }
    img {
      padding-inline: 0px;
    }
  }
  em {
    color: #dfbdff;
    font-style: normal;
  }
  u {
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    font-family: DojoText !important;
    line-height: 17.247px; /* 94.205% */
    letter-spacing: -0.366px;
    text-decoration-line: underline;
    padding-inline: 10px;
    color: #f0d9ff;
    ${mediaQueriesMax[1]} {
      padding-inline: 0px;
      font-size: 16px;
    }
  }
`;
const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  color: #fff;
  font-size: 24px;
  z-index: 999;
  transition: opacity 0.4s;
  background: transparent;
  outline: 0;
  border: 0;
  cursor: pointer;
  ${mediaQueries[1]} {
    font-size: 40px;
    width: 55px;
    height: 55px;
  }
`;

type SchoolClosureBannerSectionProps = {
  closeFunction: () => void;
};

const SchoolClosureBannerSection: React.FC<SchoolClosureBannerSectionProps> = ({ closeFunction }) => {
  useEffect(() => {
    logEvent({ eventName: "web.external_page.sayhello_banner.show", eventValue: location.href });
  }, []);

  const t = useContext(TranslationContext);
  function getEncodedPathname() {
    const pathname = window.location.pathname;
    let trimmedPathname = pathname.replace(/^\/+|\/+$/g, "");

    if (trimmedPathname === "") {
      trimmedPathname = "homepage";
    }

    return encodeURIComponent(trimmedPathname);
  }
  const encodedPath = getEncodedPathname();

  return (
    <Flex
      position="relative"
      justifyContent="center"
      alignItems="center"
      backgroundColor={"#1F1551"}
      width="100%"
      overflow="hidden"
      paddingX={15}
    >
      <Link
        to={getRelativePath(`/sayhello?utm_source=${encodedPath}`)}
        onClick={() => {
          logEvent({
            eventName: "web.external_page.sayhello_banner.click",
            eventValue: location.href,
          });
          closeFunction();
        }}
        css={{ flexGrow: 1 }}
      >
        <Header className="desktop">
          <span>
            <em>Say Hello</em> to the new ClassDojo.
          </span>
          <img src="https://static.classdojo.com/img/2024/07/mojo-flipping.svg" alt="" />
          <span>Now for your whole school.</span>
          <u>See what's new</u>
        </Header>
        <Header className="mobile">
          <img src="https://static.classdojo.com/img/2024/07/mojo-flipping.svg" alt="" />
          <div css={{ display: "flex", flexDirection: "column", paddingTop: 12 }}>
            <span>
              <em>Say Hello</em> to the new ClassDojo.
            </span>
            <span>Now for your whole school.</span>
            <u>See what's new</u>
          </div>
        </Header>
      </Link>
      <CloseButton aria-label={t.translate("layouts.main.close")?.toString() ?? ""} onClick={() => closeFunction()}>
        <CloseIcon color="dt_white" />
      </CloseButton>
    </Flex>
  );
};

export default SchoolClosureBannerSection;
