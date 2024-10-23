import React, { useContext } from "react";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import { graphql, useStaticQuery } from "gatsby";
import { mediaQueries } from "@src/styles/theme";
import { mediaQueriesMax } from "@src/styles/theme";
import { Button } from "@src/components/nessie-web";
import { PlayIcon } from "./styles";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import { Display3, DarkButton } from "./styles";

const VideoSection = ({ openCalendly }) => {
  const data = useStaticQuery(graphql`
    {
      spark: file(relativePath: { eq: "districts/bg-spark.svg" }) {
        publicURL
      }
      videoStill: file(relativePath: { eq: "districts/video-still.jpg" }) {
        publicURL
      }
      iconPlay: file(relativePath: { eq: "districts/icon-play.svg" }) {
        publicURL
      }
    }
  `);

  const { spark, videoStill } = data;

  const SparkBackground = styled.div`
    background-image: url(${spark.publicURL});
    background-position: -150px center;
    background-repeat: no-repeat;
    padding-block: 80px;
    background-size: contain;
    ${mediaQueriesMax[1]} {
      text-align: center;
    }
  `;

  const VideoContainer = styled(Container)`
    display: grid;
    justify-content: space-between;
    gap: 30px;
    grid-template-columns: 1fr;
    grid-template-areas:
      "a"
      "b"
      "c";
    ${mediaQueries[1]} {
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        "a b"
        "c b";
      }
    }
  `;

  const VideoBox = styled.a`
    overflow: hidden;
    border-radius: 18px;
    position: relative;
    flex: 1;
    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 10;
      width: 90;
      height: 90;
      transform: translate(-50%, -50%);
    }
    img {
      display: block;
    }
  `;

  const ButtonContainer = styled.div`
    display: flex;
    grid-area: "c";
    align-self: start;
    ${mediaQueriesMax[1]} {
      button {
        width: 100%;
      }
    }
  `;
  const modalContext = useContext(ModalContext);

  const openVideoModal = () => {
    modalContext.showModal(ModalType.VideoModal, { youtubeID: "4w--beUgSlA" });
  };

  return (
    <SparkBackground>
      <VideoContainer>
        <Display3 css={{ gridArea: "a", alignSelf: "end" }}>See what's possible</Display3>
        <ButtonContainer>
          <DarkButton onClick={openCalendly}>Apply for partnership</DarkButton>
        </ButtonContainer>
        <VideoBox onClick={openVideoModal} css={{ gridArea: "b" }}>
          <PlayIcon />
          <img src={videoStill.publicURL} alt="" />
        </VideoBox>
      </VideoContainer>
    </SparkBackground>
  );
};

export default VideoSection;
