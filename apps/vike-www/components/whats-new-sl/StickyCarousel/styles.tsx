import React from "react";
import styled from "@emotion/styled";
import { mediaQueriesMax } from "@src/styles/theme";
import { Button } from "@src/components/nessie-web";

export const StickyCarouselWrapper = styled.div`
  display: block;
  ${mediaQueriesMax[1]} {
    display: none;
  }
`;

export const Display1 = styled.h1`
  font-family: DojoDisplay !important;
  font-size: 69px;
  font-style: normal;
  font-weight: 800;
  line-height: 110%; /* 75.9px */
  letter-spacing: -0.9px;
  // color: #2c2a50;
  color: black;
  margin-block: 0;
  ${mediaQueriesMax[0]} {
    font-size: 35px;
    line-height: 120%; /* 42px */
    letter-spacing: -0.3px;
  }
  em {
    position: relative;

    &:after {
      position: absolute;
      bottom: 0;
      left: 0;
      content: "";
      background-image: url(https://static.classdojo.com/uploads/41f6d170-008b-4c24-a33f-c33037e46ebf.png);
      width: 100%;
      height: 20%;
      background-repeat: no-repeat;
      background-size: 100%;
    }
  }
`;
export const Display3 = styled.h3`
  font-size: 44px;
  font-style: normal;
  font-weight: 800;
  line-height: 120%; /* 52.8px */
  letter-spacing: -0.3px;
  margin-block: 0;
  ${mediaQueriesMax[0]} {
    font-size: 35px;
    line-height: 120%; /* 42px */
    letter-spacing: -0.3px;
  }
`;

export const Headline3 = styled.p`
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  margin-block: 0;
`;

export const Headline2 = styled.p`
  font-size: 23px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  letter-spacing: -0.1px;
  margin-block: 0;
  ${mediaQueriesMax[0]} {
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%; /* 21.6px */
  }
`;

export const Headline1 = styled.p`
  font-size: 28px;
  font-style: normal;
  font-weight: 800;
  line-height: 120%; /* 33.6px */
  letter-spacing: -0.1px;
  margin-block: 0;
  // color: #2c2a50;
  color: black;
`;

export const Display2 = styled.h2`
  font-family: DojoDisplay !important;
  font-size: 55px;
  font-style: normal;
  font-weight: 800;
  line-height: 110%; /* 66px */
  letter-spacing: -0.6px;
  margin-block: 0;
  ${mediaQueriesMax[0]} {
    font-size: 35px;
    line-height: 120%; /* 42px */
    letter-spacing: -0.3px;
  }
`;

export const Display4 = styled.h4`
  font-family: DojoDisplay !important;
  margin-block: 0;
  font-size: 35px;
  font-style: normal;
  font-weight: 800;
  line-height: 120%;
  letter-spacing: -0.3px;
  ${mediaQueriesMax[0]} {
    font-size: 18px;
    letter-spacing: -0.1px;
  }
`;

export const GradientContainer = styled.div`
  background: url(https://static.classdojo.com/img/2024/03/mojo-wand.svg) no-repeat calc(50% + 270px) calc(100% - 20px),
    linear-gradient(227deg, #d1ebff 3.15%, #f0e7ff 96.2%);
  border-radius: 48px;
  padding: 72px;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  overflow: hidden;
  ${mediaQueriesMax[0]} {
    padding-inline: 12px;
    background: linear-gradient(227deg, #d1ebff 3.15%, #f0e7ff 96.2%);
    padding-top: 48px;
  }
`;

export const BlobBackground = styled.div`
  background-image: url('data:image/svg+xml,<svg width="823" height="823" viewBox="0 0 823 823" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(%23clip0_2162_3461)"><path fill-rule="evenodd" clip-rule="evenodd" d="M410.484 57.4283C510.028 62.0815 623.158 36.3238 693.824 106.63C768.51 180.937 790.908 303.465 758.629 403.804C729.588 494.08 616.124 511.885 543.755 573.121C465.924 638.98 427.146 764.069 325.425 770.368C217.959 777.022 113.709 698.254 63.6832 602.846C18.635 516.932 74.338 419.715 91.4887 324.209C106.888 238.456 90.4879 137.423 157.296 81.5502C224.928 24.9883 322.451 53.3131 410.484 57.4283Z" fill="%23F0E7FF"/></g><defs><clipPath id="clip0_2162_3461"><rect width="740.168" height="740.168" fill="white" transform="translate(87.6851) rotate(6.80362)"/></clipPath></defs></svg>');
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;
  max-width: 800px;
  min-height: 850px;
  justify-content: center;
  margin: auto;
  img {
    border-radius: 50%;
    width: 250px;
  }
  ${mediaQueriesMax[0]} {
    background-size: 150px;
    background-position: center 10px;
    min-height: auto;
    padding-bottom: 100px;
    padding-inline: 25px;
    img {
      width: 105px;
    }
    .author {
      font-size: 18px;
    }
  }
`;

export const Blockquote = styled.p`
  // color: #2c2a50;
  color: black;
  font-size: 35px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 42px */
  letter-spacing: -0.3px;
  margin-block: 0;
  ${mediaQueriesMax[0]} {
    font-size: 18px;
  }
`;

export const Overline = styled.p`
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 14.4px */
  letter-spacing: 0.7px;
  text-transform: uppercase;
  margin-block: 0;
`;

export const Caption = styled.p`
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 21.6px */
  letter-spacing: 0.7px;
  text-transform: uppercase;
  margin-block: 0;

  ${mediaQueriesMax[0]} {
    font-size: 12px;
  }
`;

export const PurpleBox = styled.div`
  background-color: #8047ff;
  border-radius: 30px;
  padding-bottom: 70px;
  gap: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  img {
    margin-top: -130px;
    margin-bottom: 20px;
  }
  ${mediaQueriesMax[0]} {
    padding-bottom: 40px;
    img {
      margin-bottom: 0px;
    }
  }
`;

export const Card = styled.a`
  background-color: #f6f2ff;
  border-radius: 30px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  padding-block: 24px;
  padding-inline: 30px;
  gap: 30px;
  max-width: 430px;
  &:not(.interactive) {
    pointer-events: none;
  }
  transition: transform ease-in 0.2s;
  ${mediaQueriesMax[1]} {
    min-height: 300px;
  }
  &.interactive:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition: transform ease-in 0.2s;
    .carret {
      &::before {
        transition: width 0.2s ease-in;
        width: 30px;
      }
    }
  }
  .carret {
    display: block;
    &::before {
      transition: width 0.2s ease-in;
      position: absolute;
      content: "";
      top: 50%;
      right: 3px;
      margin-top: -4px;
      width: 1px;
      height: 3px;
      background: #8047ff;
    }
  }
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  span {
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 23px; /* 127.778% */
    color: #8047ff;
    padding-block: 12px;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 36px;
  margin-top: 78px;
  min-height: 400px;
  margin: auto;
  ${mediaQueriesMax[2]} {
    margin-top: 48px;
    gap: 24px;
    flex-direction: column;
    align-items: center;
  }
`;

export const Icon = ({ icon }) => {
  if (icon === "apple") {
    return (
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M31.1167 17.4688C39.187 17.4688 42.2964 22.4532 42.2964 28.125C42.2964 37.875 35.6636 46.3438 30.6245 46.3438C28.5464 46.3438 26.7886 45.5469 25.812 44.9844C25.312 44.6954 24.687 44.6954 24.187 44.9844C23.2183 45.5391 21.4526 46.3438 19.3745 46.3438C14.3355 46.3438 7.70264 37.875 7.70264 28.125C7.70264 22.4532 10.812 17.4688 18.8823 17.4688C20.2808 17.4688 21.4292 17.7109 22.3276 18.0391C24.0386 18.6563 25.9526 18.6563 27.6636 18.0391C28.5698 17.7109 29.7105 17.4688 31.1089 17.4688H31.1167ZM14.4604 4.34378C13.8511 4.25003 13.3276 4.77348 13.4214 5.38286C14.2573 10.6719 18.4058 14.8125 23.687 15.6484C24.2964 15.7422 24.8198 15.2188 24.7261 14.6094C23.8901 9.32035 19.7417 5.17972 14.4604 4.34378Z"
          fill="#8047FF"
        />
      </svg>
    );
  }
  if (icon === "check") {
    return (
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M25 5.46875C14.2109 5.46875 5.46875 14.2109 5.46875 25C5.46875 35.7891 14.2109 44.5312 25 44.5312C35.7891 44.5312 44.5312 35.7891 44.5312 25C44.5312 14.2109 35.7812 5.46875 25 5.46875ZM33.3438 19.3203C26.9219 27.1328 23.6406 33.9063 23.6094 33.9766C23.3203 34.5781 22.75 34.9844 22.0938 35.0703C22.0078 35.0781 21.9298 35.0859 21.8438 35.0859C21.2735 35.0859 20.7266 34.836 20.3516 34.3906L15.3829 28.5C14.6875 27.6719 14.7891 26.4453 15.6172 25.75C16.4453 25.0547 17.6719 25.1563 18.3672 25.9844L21.4766 29.6719C23.0625 26.8672 25.9922 22.1172 30.3282 16.8438C31.0157 16.0078 32.2501 15.8906 33.0782 16.5781C33.9063 17.2578 34.0235 18.4844 33.3438 19.3203Z"
          fill="#8047FF"
        />
      </svg>
    );
  }
  if (icon === "chat") {
    return (
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M33.3133 16.453C25.2365 16.453 18.667 23.0212 18.6649 31.0975C18.6653 32.6586 18.9231 34.1651 19.3914 35.5936C19.4696 35.828 19.3211 36.078 19.0711 36.1092C14.5008 36.6561 9.8758 36.7108 5.28987 36.1796C4.61018 36.1014 4.39924 35.2342 4.95393 34.8436C6.44612 33.8124 7.50862 32.2655 7.93831 30.4999C7.96956 30.3671 7.9383 30.2264 7.85237 30.1171C5.41487 27.1249 4.07112 23.2186 4.43831 18.9842C5.08674 11.4296 11.4071 5.36705 18.868 4.90612C26.3289 4.44518 32.7117 9.2733 34.6883 15.9921C34.7664 16.2499 34.5555 16.4999 34.2821 16.4842C33.9617 16.4608 33.6414 16.453 33.3133 16.453ZM42.8602 39.414C43.1883 40.7577 44.118 41.789 45.2039 42.6405V42.6483C45.6102 42.9608 45.4305 43.6249 44.9071 43.6874C42.8836 43.9218 41.0086 44.0702 39.0946 44.0702C36.618 44.0702 34.0633 43.8202 30.9852 43.1796C25.5243 42.0468 21.0164 37.1015 21.0164 31.1015C21.0164 24.1015 26.8602 18.4608 33.9305 18.8046C40.2039 19.1015 45.3446 24.2733 45.618 30.5468C45.7508 33.6093 44.7586 36.4374 43.0321 38.6562C42.8602 38.8749 42.7977 39.1483 42.8602 39.414Z"
          fill="#8047FF"
        />
      </svg>
    );
  }
};

export const Body1 = styled.p`
  font-size: 21px;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
  ${mediaQueriesMax[0]} {
    font-size: 18px;
    line-height: 120%;
  }
`;

export const Body2 = styled.span`
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
`;

export const CurvedContainer = styled("div")`
  border-radius: 20px;
  background-color: rgba(242, 244, 255, 0.7);
  background-repeat: no-repeat;
  color: black;
  .secondary-cta {
    display: none;
    ${mediaQueriesMax[0]} {
      display: block;
      margin: auto;
    }
  }
`;

export const BlackButton = styled(Button)`
  background-color: #2c2a50;
  &:hover {
    background-color: #1a192d;
  }
`;

export const SecondaryButton = styled(Button)`
  background-color: #fff;
`;

export const LinkButton = styled(Button)`
  background-color: #6835d6;
  &:hover {
    background-color: #462699;
  }
`;

export const BlackButtonLink = styled(Button)`
  span {
    color: #2c2a50;
  }
  &:hover span {
    color: #1a192d;
    text-decoration: none;
  }
`;

export const PlayIcon = () => {
  return (
    <svg width="88" height="99" viewBox="0 0 88 99" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M85.173 42.6553C64.49 23.6648 40.9915 9.51163 15.9169 0.956399C10.5691 -0.860267 5.06191 3.15342 4.01713 9.65961C-0.250503 35.8745 -0.250503 62.8287 4.01713 89.0436C5.07962 95.5498 10.5868 99.5845 15.9169 97.7467C41.0092 89.1703 64.5077 75.0172 85.173 56.0479C88.8563 52.668 88.8563 46.0352 85.173 42.6553Z"
        fill="white"
      />
    </svg>
  );
};

interface UnderlineProps {
  backgroundImageUrl: string;
}

export const Underline = styled("span")<UnderlineProps>`
  position: relative;

  &:after {
    position: absolute;
    bottom: 0;
    left: 0;
    content: "";
    background-image: url("data:image/png;base64,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")
    width: 100%;
    height: 15%;
    background-repeat: no-repeat;
    background-size: 100%;
  }
`;

export const Carret = () => {
  return (
    <div css={{ position: "relative" }} className="carret">
      <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M3.51476 1.39344L13.0607 10.9394C13.6465 11.5252 13.6465 12.4749 13.0607 13.0607L3.51476 22.6066C2.92898 23.1924 1.97923 23.1924 1.39344 22.6066C0.807657 22.0209 0.807657 21.0711 1.39344 20.4853L9.87872 12L1.39344 3.51476C0.807655 2.92898 0.807655 1.97923 1.39344 1.39344C1.97923 0.807655 2.92898 0.807655 3.51476 1.39344Z"
          fill="#8047FF"
        />
      </svg>
    </div>
  );
};

export const NavButtons = styled.button`
  width: 50px;
  height: 50px;
  border: solid 1px #8047ff;
  box-shadow: 0px -1px 1px 0px rgba(0, 0, 0, 0.1) inset;
  filter: drop-shadow(0px 3px 3px rgba(83, 88, 135, 0.3)) drop-shadow(0px 1px 0px #ebebeb);
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 50px;
  cursor: pointer;
  svg {
    fill: #8047ff;
  }
  &:disabled {
    border: solid 1px #d3d7ec;
    svg {
      fill: #d3d7ec;
    }
  }
`;
