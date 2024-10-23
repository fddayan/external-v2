import React from "react";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import Translate from "@src/components/translation/Translate";
import { mediaQueries } from "@src/styles/theme";
import { Title, theme } from "@src/components/nessie-web";

const {
  colors: { dt_white },
} = theme;

const VideoSectionContainer = styled.section`
  width: 100%;
`;

const VideoBackgroundContainer = styled.div`
  width: 100%;
  height: 600px;
  ${mediaQueries[1]} {
    height: 850px;
  }
  position: relative;
`;

const VideoContainer = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;

  &:before {
    content: "";
    display: block;
    width: 100%;
    height: 60%;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(180deg, #2c2a50 0%, rgba(44, 42, 80, 0) 100%);
    z-index: 1;
  }
`;

const EmbedVideo = styled.video`
  object-fit: cover;
  height: 100%;
  width: 100%;
`;

const ContentContainer = styled(Container)`
  z-index: 2;
  padding-top: 32px;
  ${mediaQueries[1]} {
    padding-top: 100px;
    padding-bottom: 100px;
  }
`;

const InnerContent = styled.div`
  width: 85%;
  max-width: 800px;
`;

const VideoOverlayTitle = styled(Title)`
  font-size: 30px;
  ${mediaQueries[1]} {
    font-size: 50px;
  }
`;

type VideoSectionProps = {
  video_section_heading: string;
  video_section_url: string;
};

const VideoSection: React.FC<VideoSectionProps> = ({ video_section_url, video_section_heading }) => {
  return (
    <VideoSectionContainer>
      <VideoBackgroundContainer>
        <VideoContainer>
          <EmbedVideo playsInline autoPlay muted loop>
            <source src={video_section_url} type="video/mp4" />
          </EmbedVideo>
        </VideoContainer>
        <ContentContainer>
          <InnerContent>
            <VideoOverlayTitle color={dt_white} size={2}>
              <Translate path={video_section_heading} />
            </VideoOverlayTitle>
          </InnerContent>
        </ContentContainer>
      </VideoBackgroundContainer>
    </VideoSectionContainer>
  );
};

export default VideoSection;
