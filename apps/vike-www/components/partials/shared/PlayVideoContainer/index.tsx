import React, { useState } from "react";
import styled from "@emotion/styled";
import { mediaQueriesMax } from "@src/styles/theme";
import { logEvent } from "@src/utils/logClient";

const PlayIcon = () => {
  return (
    <svg width="88" height="99" viewBox="0 0 88 99" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M85.173 42.6553C64.49 23.6648 40.9915 9.51163 15.9169 0.956399C10.5691 -0.860267 5.06191 3.15342 4.01713 9.65961C-0.250503 35.8745 -0.250503 62.8287 4.01713 89.0436C5.07962 95.5498 10.5868 99.5845 15.9169 97.7467C41.0092 89.1703 64.5077 75.0172 85.173 56.0479C88.8563 52.668 88.8563 46.0352 85.173 42.6553Z"
        fill="white"
      />
    </svg>
  );
};

interface PlayVideoContainerProps {
  videoId: string;
  eventName: string;
  borderRadius?: number;
}

const PlayVideoContainerWrapper = styled.div`
  position: relative;
  width: 100%;

  &::before {
    display: block;
    content: "";
    width: 100%;
    padding-top: 56.17%; // Calculated as (height / width) * 100%
  }
  img {
    opacity: 0.9;
    filter: brightness(80%);
    border-radius: ${({ borderRadius }: { borderRadius: number }) => borderRadius}px;
    ${mediaQueriesMax[0]} {
      border-radius: 16px;
    }
  }
  iframe,
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  button {
    position: absolute;
    background: transparent;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    border: none;
    cursor: pointer;
    &:hover {
      svg path {
        fill: #d3d7ec;
      }
    }
    ${mediaQueriesMax[0]} {
      svg {
        transform: scale(0.7);
      }
    }
  }
`;

const PlayVideoContainer = ({ videoId, eventName, borderRadius = 46 }: PlayVideoContainerProps) => {
  const [showVideo, setShowVideo] = useState(false);

  const handlePlayVideo = () => {
    logEvent({ eventName });
    setShowVideo(true);
  };

  return (
    <PlayVideoContainerWrapper className="inline-video-player" borderRadius={borderRadius}>
      {showVideo ? (
        <iframe
          width="100%"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <>
          <button onClick={handlePlayVideo}>
            <PlayIcon />
          </button>
          <img src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} alt="" />
        </>
      )}
    </PlayVideoContainerWrapper>
  );
};

export default PlayVideoContainer;
