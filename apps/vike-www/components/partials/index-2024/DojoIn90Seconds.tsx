import * as React from "react";
import styled from "@emotion/styled";
import { mediaQueriesMax } from "@src/styles/theme";
import Translate from "@src/components/translation/Translate";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import { logEvent } from "@src/utils/logClient";

const CTAText = styled.span`
  color: var(--Black, #2c2a50);
  font-feature-settings: "clig" off, "liga" off;
  font-family: "DojoText";
  font-size: 20px;
  font-style: normal;
  font-weight: 800;
  line-height: 110%; /* 22px */
  letter-spacing: -0.1px;
  em {
    color: var(--Brand, #8047ff);
    font-style: normal;
  }
`;

const PlayIcon = () => {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.16107 1.12763C1.17878 0.980662 1.2313 0.839772 1.31444 0.716185C1.39757 0.592599 1.50903 0.48973 1.63994 0.415772C1.77085 0.341814 1.91758 0.298812 2.06846 0.290189C2.21933 0.281566 2.37018 0.307562 2.50899 0.366106C3.21069 0.659847 4.78326 1.35797 6.77871 2.4857C8.77482 3.61408 10.1789 4.59947 10.7888 5.04655C11.3094 5.42893 11.3107 6.18722 10.7894 6.57089C10.1855 7.01539 8.7986 7.98784 6.77871 9.13045C4.75683 10.2731 3.20277 10.9628 2.50766 11.2526C1.90903 11.503 1.23904 11.1232 1.16107 10.4911C1.06989 9.75222 0.899414 8.07454 0.899414 5.80872C0.899414 3.5442 1.06923 1.86716 1.16107 1.12763Z"
        fill="white"
      />
    </svg>
  );
};

const PlayButton = styled.button`
  background-color: rgba(13, 38, 68, 0.8);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0px;
  &:hover {
    background-color: rgba(13, 38, 68, 1);
  }
`;

const Content = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: row;
  text-align: center;
  border-radius: 24px;
  padding: 18px;
  width: 270px;
  position: sticky;
  top: 700px;
  left: calc(50% + 300px);
  align-self: flex-end;
  margin-top: -500px;
  margin-bottom: 500px;
  ${mediaQueriesMax[1]} {
    background: var(--Grape-20, #f0e7ff);
    position: static;
    margin-top: 0;
    width: 320px;
    margin-inline: auto;
    margin-block: 36px;
    font-size: 26px;
  }
  span {
    color: var(--Black, #2c2a50);
    font-feature-settings: "clig" off, "liga" off;
    font-family: "DojoText";
    font-size: 20px;
    font-style: normal;
    font-weight: 800;
    line-height: 110%; /* 22px */
    letter-spacing: -0.1px;
    ${mediaQueriesMax[1]} {
      font-size: 26px;
    }
    em {
      color: var(--Brand, #8047ff);
      font-style: normal;
    }
  }
`;

const DojoIn90Seconds = () => {
  const modalContext = React.useContext(ModalContext);
  const onPlayButtonClicked = () => {
    logEvent({
      eventName: "web.external_page.homepage-2024.dojo_in_90_seconds.play_video.click",
      eventValue: window.location.href,
    });
    modalContext.showModal(ModalType.VideoModal, { youtubeID: "ifOt8Pjs93g" });
  };

  return (
    <Content>
      <div css={{ flexGrow: 1, textAlign: "left", gap: 12, display: "flex", flexDirection: "column" }}>
        <CTAText>
          <Translate path="directus.page_homepage_2024.hero_classdojo_90_minutes" />
        </CTAText>
        <PlayButton onClick={onPlayButtonClicked}>
          <PlayIcon />
        </PlayButton>
      </div>
      <img
        src="https://static.classdojo.com/uploads/f4dfa591-705f-4822-a954-01d42854c4f0.svg"
        css={{ marginBlock: -24, marginRight: -36, marginLeft: -12 }}
        alt=""
      />
    </Content>
  );
};

export default DojoIn90Seconds;
