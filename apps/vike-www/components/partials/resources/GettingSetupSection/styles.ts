import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";
import { theme } from "@src/components/nessie-web";

import GetStartedCurveTop from "@src/assets/images/resources/curves/gs-top.svg";
import GetStartedCurveBottom from "@src/assets/images/resources/curves/gs-bottom.svg";

// Curved lines
import MascotLineDesktop from "@src/assets/images/resources/lines/mascot-desktop.svg";
import MascotLineMobile from "@src/assets/images/resources/lines/mascot-mobile.svg";
import HomeLineDesktop from "@src/assets/images/resources/lines/getting-setup/home-desktop.svg";
import HomeLineMobile from "@src/assets/images/resources/lines/getting-setup/home-mobile.svg";
import ClassroomLineDesktop from "@src/assets/images/resources/lines/getting-setup/classroom-desktop.svg";
import ClassroomLineMobile from "@src/assets/images/resources/lines/getting-setup/classroom-mobile.svg";
import VideoLineDesktop from "@src/assets/images/resources/lines/getting-setup/video-desktop.svg";
import VideoLineMobile from "@src/assets/images/resources/lines/getting-setup/video-mobile.svg";
import MailLineDesktop from "@src/assets/images/resources/lines/getting-setup/mail-desktop.svg";
import MailLineMobile from "@src/assets/images/resources/lines/getting-setup/mail-mobile.svg";
import LightbulbLineDesktop from "@src/assets/images/resources/lines/getting-setup/lightbulb-desktop.svg";
import LightbulbLineMobile from "@src/assets/images/resources/lines/getting-setup/lightbulb-mobile.svg";
import LightbulbLineMobileTrail from "@src/assets/images/resources/lines/getting-setup/lightbulb-mobile-trail.svg";

export const GettingSetupHolder = styled("section")`
  overflow: hidden;
  background-image: url("${GetStartedCurveBottom}");
  background-repeat: no-repeat;
  background-color: ${theme.colors.dt_blueberry20};
  background-position: center calc(100% + 2px);
  position: relative;
  padding-bottom: 200px;
  ${mediaQueries[1]} {
    padding-bottom: calc(${theme.space.xl}px * 2);
  }
  z-index: 1;
  ::before {
    content: "";
    position: relative;
    display: block;
    height: 116px;
    width: 100%;
    background-image: url("${GetStartedCurveTop}");
    background-repeat: no-repeat;
    background-size: 102% auto;
    z-index: 2;
  }
`;

export const GSTitleWrapper = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
  max-width: 350px;
  margin: 0 auto;
  ${mediaQueries[0]} {
    padding: 0;
  }
`;

export const MascotHolder = styled("div")`
  text-align: center;
  position: relative;
  &:before {
    content: "";
    display: block;
    background-image: url("${MascotLineMobile}");
    background-repeat: no-repeat;
    width: 1209px;
    height: 540px;
    position: absolute;
    bottom: 20%;
    left: -50%;
  }
  ${mediaQueries[1]} {
    position: absolute;
    top: -48px;
    right: 48px;
    &:before {
      content: "";
      display: block;
      width: 607px;
      height: 239px;
      position: absolute;
      right: -100px;
      top: -170px;
      background-image: url("${MascotLineDesktop}");
      background-repeat: no-repeat;
    }
  }
`;

export const SetupSteps = styled("div")`
  display: flex;
  flex-direction: column;
`;

export const Step = styled("div")`
  display: flex;
  flex-direction: row;
  margin-top: ${theme.space.xl}px;
  gap: ${theme.space.m}px;
  .step-content {
    & > a {
      margin: 0 !important;
    }
    text-align: left;
    justify-items: start;
  }
  ${mediaQueries[1]} {
    margin-top: -64px;
    &:first-of-type {
      margin-top: 0;
    }
    flex-direction: row-reverse;
    width: calc(calc(5 / 12) * 100%);

    .step-content {
      text-align: right;
      justify-items: end;
    }
    &:nth-of-type(even) {
      .step-content {
        text-align: left;
        justify-items: start;
      }
      flex-direction: row;
      margin-left: calc(calc(7 / 12) * 100%);
    }
  }
  padding-bottom: ${theme.space.xl}px;
  &:nth-of-type(1) .step-icon {
    &:before {
      content: "";
      display: block;
      width: 183px;
      height: 489px;
      position: absolute;
      z-index: -1;
      bottom: 40px;
      left: -150px;
      background-image: url("${HomeLineMobile}");
      background-repeat: no-repeat;
    }
  }
  &:nth-of-type(2) .step-icon {
    &:before {
      content: "";
      width: 50px;
      height: 204px;
      position: absolute;
      display: block;
      bottom: 24px;
      background-image: url("${ClassroomLineMobile}");
      background-repeat: no-repeat;
      z-index: -2;
    }
  }
  &:nth-of-type(3) .step-icon {
    &:before {
      content: "";
      width: 22px;
      height: 240px;
      background-image: url("${MailLineMobile}");
      background-repeat: no-repeat;
      position: absolute;
      bottom: 50px;
      left: 10px;
      z-index: -2;
    }
  }
  &:nth-of-type(4) .step-icon {
    &:before {
      content: "";
      width: 24px;
      height: 200px;
      background-image: url("${VideoLineMobile}");
      background-repeat: no-repeat;
      position: absolute;
      bottom: 44px;
      left: 20px;
      z-index: -2;
    }
  }
  &:nth-of-type(5) .step-icon {
    &:before {
      width: 18px;
      height: 216px;
      content: "";
      position: absolute;
      bottom: 20px;
      left: 30px;
      z-index: -2;
      background-image: url("${LightbulbLineMobile}");
      background-repeat: no-repeat;
    }
    &:after {
      content: "";
      display: block;
      background-image: url("${LightbulbLineMobileTrail}");
      background-repeat: no-repeat;
      width: 916px;
      height: 232px;
      position: absolute;
      left: 0;
      bottom: -210px;
      z-index: -2;
    }
  }
  ${mediaQueries[0]} {
    &:nth-of-type(3) .step-icon:before {
      height: 210px;
    }
  }
  ${mediaQueries[1]} {
    &:nth-of-type(1) .step-icon {
      &:before {
        height: 421px;
        width: 323px;
        bottom: 39px;
        left: -80px;
        background-image: url("${HomeLineDesktop}");
        background-repeat: no-repeat;
      }
    }
    &:nth-of-type(2) .step-icon {
      &:before {
        background-image: url("${ClassroomLineDesktop}");
        background-repeat: no-repeat;
        content: "";
        display: block;
        width: 218px;
        height: 128px;
        position: absolute;
        right: 35px;
        bottom: 26px;
        z-index: -2;
      }
    }
    &:nth-of-type(3) .step-icon {
      &:before {
        content: "";
        display: block;
        width: 233px;
        height: 124px;
        position: absolute;
        left: 37px;
        top: -97px;
        z-index: -2;
        background-image: url("${MailLineDesktop}");
        background-repeat: no-repeat;
      }
    }
    &:nth-of-type(4) .step-icon {
      &:before {
        content: "";
        display: block;
        background-image: url("${VideoLineDesktop}");
        background-repeat: no-repeat;
        width: 233px;
        height: 123px;
        position: absolute;
        right: 40px;
        left: unset;
        top: -90px;
        z-index: -2;
      }
    }
    &:nth-of-type(5) .step-icon {
      &:before {
        background-image: url("${LightbulbLineDesktop}");
        background-repeat: no-repeat;
        width: 218px;
        height: 127px;
        position: absolute;
        content: "";
        display: block;
        left: 50px;
        top: -90px;
        z-index: -2;
      }
      &:after {
        display: none;
      }
    }
  }
`;

export const StepContent = styled("div")`
  display: grid;
  order: 1;
  &:nth-of-type(odd) {
    order: 2;
  }
`;

export const StepIcon = styled("div")<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  height: 60px;
  width: 60px;
  border-radius: 100%;
  flex-grow: 0;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  span {
    display: flex;
  }
`;

export const StepButtonHolder = styled("div")`
  display: flex;
`;
