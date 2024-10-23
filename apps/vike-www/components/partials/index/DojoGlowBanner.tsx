import React, { useEffect, useContext } from "react";
import { useTheme } from "@emotion/react";
import Container from "@src/components/Container";
import { Link } from "gatsby";
import teacher from "@src/assets/images/index/glow-teacher.svg";
import mojo from "@src/assets/images/index/glow-mojo.svg";
import sparkles from "@src/assets/images/index/glow-sparkles.svg";
import sparkles2 from "@src/assets/images/index/glow-sparkles-2.svg";
import { logEvent } from "@src/utils/logClient";
import { getRelativePath } from "@src/utils/routes";
import { CloseIcon } from "@src/components/nessie-web";
import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";
import { TranslationContext } from "@src/components/translation/TranslationContext";

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
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  ${mediaQueries[1]} {
    font-size: 40px;
    width: 55px;
    height: 55px;
  }
`;

const DojoGlowBanner = ({ closeFunction }) => {
  const theme = useTheme();
  const t = useContext(TranslationContext);

  const backgroundCss = {
    background: `radial-gradient(circle, ${theme.__new.colors.grape50} 0%, ${theme.__new.colors.grape60} 40%);`,
    overflow: "hidden",
    position: "relative",
  };

  const containerCss = {
    height: 80,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    [mediaQueries[2]]: {
      height: 66,
    },
  };

  const textContainerCss = {
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    gap: 8,
    flexWrap: "wrap",
  };

  const textCss = {
    ...theme.__new.typography.Display4ExtraBold,
    fontWeight: 700,
    color: "white",
    gridColumnStart: 2,
    fontSize: 16,
    lineHeight: 1,
    [mediaQueries[2]]: {
      fontSize: 20,
    },
  };

  const linkCss = {
    color: "white",
    fontSize: 18,
    lineHeight: 1,
    fontWeight: 500,
    textDecoration: "underline",
  };

  const teacherCss = {
    height: 80,
    marginLeft: -40,
    [mediaQueries[2]]: {
      marginLeft: 0,
      height: 66,
    },
  };

  const sparklesCss = {
    order: 3,
    [mediaQueries[2]]: {
      order: 2,
    },
  };

  const mojoCss = {
    display: "none",
    height: 80,
    [mediaQueries[2]]: {
      height: 66,
    },
  };

  const sparkles2Css = {
    display: "none",
    height: 80,
    [mediaQueries[2]]: {
      height: 66,
    },
  };

  const logClickEvent = () => {
    logEvent({ eventName: "web.external_page.dojo_glow_banner.click", eventValue: location.href });
  };

  useEffect(() => {
    logEvent({ eventName: "web.external_page.dojo_glow_banner.show", eventValue: location.href });
  }, []);

  return (
    <div css={backgroundCss}>
      <Container css={containerCss}>
        <img src={teacher} css={teacherCss} alt="" />
        <img src={sparkles} css={sparklesCss} alt="" />
        <div css={textContainerCss}>
          <span css={textCss}>Dive into the new ClassDojo and get your Dojo Glow!</span>
          <Link to={getRelativePath("/dojoglow")} onClick={logClickEvent} css={linkCss}>
            See what's new
          </Link>
        </div>
        <img src={mojo} css={mojoCss} alt="" />
        <img src={sparkles2} css={sparkles2Css} alt="" />
      </Container>
      <CloseButton aria-label={t.translate("layouts.main.close")?.toString() ?? ""} onClick={() => closeFunction()}>
        <CloseIcon color="dt_white" />
      </CloseButton>
    </div>
  );
};

export default DojoGlowBanner;
