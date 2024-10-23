import React, { ReactNode, useEffect, useState } from "react";
import { useVideoGrid } from "./VideoGridContext";
import window from "global/window";
import playSVg from "@src/assets/images/olympics/play-button.svg";
import * as S from "./activeVideoStyles";

type Props = {
  children: ReactNode;
  blocked?: boolean;
};

const ActiveVideoContainer = ({ children, blocked }: Props) => {
  const { closeVideoContainer, activeVideoData, isVideoContainerShow } =
    useVideoGrid();
  const [isAppleWebView, setIsAppleWebView] = useState(false);

  const { image, order, url } = activeVideoData;
  const gridOrder = parseInt(order);

  useEffect(() => {
    setIsAppleWebView(
      /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
        window.navigator.userAgent
      )
    );
  }, []);

  return isVideoContainerShow ? (
    <S.Wrapper active={gridOrder} backgroundColor="#ffffff">
      <S.Content>
        <S.ButtonClose onClick={closeVideoContainer}>&#x2715;</S.ButtonClose>
        <S.TextWrapper paddingY="60px">{children}</S.TextWrapper>
        <S.VideoCta imageUrl={image}>
          {blocked ? (
            <S.GeoFenceMessage>
              Due to copyright restrictions, this video is only available within
              the United States
            </S.GeoFenceMessage>
          ) : (
            <S.PlayButton
              href={url}
              target={isAppleWebView ? "_self" : "_blank"}
            >
              <img src={playSVg} width="100%" height="auto" alt="Play button" />
            </S.PlayButton>
          )}
        </S.VideoCta>
      </S.Content>
    </S.Wrapper>
  ) : null;
};

export default ActiveVideoContainer;
