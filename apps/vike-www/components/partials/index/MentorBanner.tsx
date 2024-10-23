import React, { useEffect, useContext } from "react";
import { useTheme } from "@emotion/react";
import Container from "@src/components/Container";
import { Link } from "gatsby";
import mojoStar from "@src/assets/images/index/MojoStar.svg";
import { getRelativePath } from "@src/utils/routes";
import { logEvent } from "@src/utils/logClient";
import { CloseIcon } from "@src/components/nessie-web";
import styled from "@emotion/styled";
import { mediaQueries, mediaQueriesMax } from "@src/styles/theme";
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
  ${mediaQueries[2]} {
    font-size: 40px;
    width: 55px;
    height: 55px;
  }
`;

const MentorBanner = ({ closeFunction }) => {
  const theme = useTheme();
  const t = useContext(TranslationContext);

  const backgroundCss = {
    backgroundColor: theme.__new.colors.grape60,
    overflow: "hidden",
    position: "relative",
  };

  const containerCss = {
    display: "grid",
    height: 80,
    gridTemplateColumns: "100px auto",
    gridTemplateRows: "auto 12px auto",
    alignItems: "center",
    gap: "0 4px",
    [mediaQueries[2]]: {
      display: "flex",
      justifyContent: "center",
      height: 66,
      gap: 12,
    },
  };

  const textCss = {
    ...theme.__new.typography.Display4ExtraBold,
    fontWeight: 700,
    color: "white",
    gridColumnStart: 2,
    fontSize: 16,
    lineHeight: 1,
    [mediaQueries[2]]: {
      fontSize: 24,
    },
  };

  const starCss = {
    width: 99,
    gridRow: "1 / 4",
    margin: "-6px 0",
  };

  const buttonCss = {
    backgroundColor: theme.__new.colors.grape10,
    color: theme.__new.colors.grape60,
    fontSize: 12,
    lineHeight: 1,
    fontWeight: 700,
    borderRadius: 99,
    padding: "2px 34px",
    justifySelf: "baseline",
    [mediaQueries[2]]: {
      fontSize: 14,
      padding: "10px 30px",
    },
  };

  const logClickEvent = () => {
    logEvent("web.external_page.mentor_bts_banner.click");
  };

  useEffect(() => {
    logEvent("web.external_page.mentor_bts_banner.show");
  }, []);

  return (
    <div css={backgroundCss}>
      <Container css={containerCss}>
        <span css={textCss}>Mentors, it's time to shine!</span>
        <img src={mojoStar} css={starCss} alt="" />
        <span css={textCss}>Grab your exclusive back to school kit</span>
        <Link to={getRelativePath("/mentor-bts-2024")} onClick={logClickEvent} css={buttonCss}>
          Check it out
        </Link>
      </Container>
      <CloseButton aria-label={t.translate("layouts.main.close")?.toString() ?? ""} onClick={() => closeFunction()}>
        <CloseIcon color="dt_white" />
      </CloseButton>
    </div>
  );
};

export default MentorBanner;
