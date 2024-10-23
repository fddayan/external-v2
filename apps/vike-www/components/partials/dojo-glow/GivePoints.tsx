import React, { useContext } from "react";
import { Typography } from "../../Typography";
import { GImage } from "../../GImage";
import { useDojoGlow } from "./context";
import { Flex } from "@src/components/Boxes";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { logEvent } from "@src/utils/logClient";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import theme from "@src/styles/theme-v2";
import { alignSelf, justifyContent, textAlign } from "styled-system";
import { mediaQueriesMax } from "@src/styles/theme";
import { PlayIcon } from "@src/components/nessie-web";
import { Headline } from "./styles";

const Banner = styled(Flex)`
  border-radius: var(--24, 24px);
  background: var(--Palette-TARO-10, #f1f3f8);
  padding-inline: ${(props) => props.theme.__new.spacing[60]};
  position: relative;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  > img {
    align-self: flex-end;
    display: block;
  }
  ${mediaQueriesMax[1]} {
    align-items: center;
    flex-direction: column;
    padding-inline: ${(props) => props.theme.__new.spacing[30]};
    img {
      align-self: center;
    }
  }
`;

const videoCardStyle = css`
  border-radius: 20px;
  padding: 16px;
  background: #210b51;
`;

const VideoSubTitle = styled.div`
  color: var(--Content-Disabled, #aab0d8);
  font-feature-settings: "clig" off, "liga" off;
  font-family: "DojoText";
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 110%; /* 11px */
  letter-spacing: -0.091px;
  text-transform: uppercase;
`;

const VideoPrimaryText = styled.div`
  color: var(--Content-Light, #fff);
  font-feature-settings: "clig" off, "liga" off;
  font-family: "DojoText";
  font-size: 16.441px;
  font-style: normal;
  font-weight: 800;
  line-height: 110%;
  letter-spacing: -0.091px;
`;

const VideoSecondaryText = styled.div`
  color: var(--Grape-30, #dfbdff);
  font-feature-settings: "clig" off, "liga" off;
  font-family: "DojoText";
  font-size: 16.441px;
  font-style: normal;
  font-weight: 800;
  line-height: 110%;
  letter-spacing: -0.091px;
`;

interface VideSectionProps {
  youtubeID: string;
}

const VideoButton = styled.button`
  border-radius: 50%;
  width: 25px;
  height: 25px;
  background-color: #6435d8;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  cursor: pointer;
  margin-top: 6px;
  padding: 0;
`;

const VideoSection = () => {
  return (
    <VideoButton>
      <PlayIcon size="xs" color="white" />
    </VideoButton>
  );
};

const VideoCard = () => {
  const youtubeID = "sexbHSq2MnM";
  const modalContext = useContext(ModalContext);

  const openVideoModal = () => {
    logEvent({
      eventName: "web.external.dojo_glow.video-play",
      eventValue: window.location.href,
    });
    modalContext.showModal(ModalType.VideoModal, { youtubeID });
  };

  const { givePoints } = useDojoGlow();
  return (
    //eslint-disable-next-line
    <div onClick={openVideoModal} css={{ cursor: "pointer" }}>
      <Flex flexDirection="row" css={videoCardStyle}>
        <Flex flexDirection="column" flex={1} css={{ gap: 2 }}>
          <VideoSubTitle>{givePoints.card_sub_title}</VideoSubTitle>
          <VideoPrimaryText>{givePoints.card_primary_text}</VideoPrimaryText>
          <VideoSecondaryText>{givePoints.card_secondary_text}</VideoSecondaryText>
          <Flex flexDirection="column">
            <VideoSection />
          </Flex>
        </Flex>
        <GImage img={givePoints.card_image} alt="" css={{ borderRadius: 8 }} />
      </Flex>
    </div>
  );
};

export const GivePoints = () => {
  const { givePoints: values } = useDojoGlow();
  return (
    <Banner>
      <Flex
        flexDirection="column"
        flex={1}
        gap={12}
        css={{ maxWidth: 300, paddingBlock: theme.spacing[30], color: theme.colors.contentPrimary }}
      >
        <Headline variant={["Display5ExtraBold", "Display3ExtraBold", "Display3ExtraBold"]} css={{ textAlign: "left" }}>
          {values.title}
        </Headline>
        <Typography variant="Body2" css={{ textAlign: "left" }}>
          {values.text}
        </Typography>
        <VideoCard />
      </Flex>
      <GImage img={values.image_b} alt="" css={{ alignSelf: "flex-end", maxWidth: 500, width: "100%" }} />
    </Banner>
  );
};
