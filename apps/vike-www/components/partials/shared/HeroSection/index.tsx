import React, { ReactNode, useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { css } from "@emotion/react";
import { BodyText, Title, Button, Space, TextField, DetailText } from "@src/components/nessie-web";
import { Flex, Box } from "@src/components/Boxes";
import Container from "@src/components/Container";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import PlayButtonImage from "@src/assets/images/header-video-btn.svg";
import SubscriptionForm, { SubscriptionFormProps } from "@src/components/partials/shared/SubscriptionForm";
import * as S from "./styles";
import { BooleanLiteral } from "typescript";
import { TranslationType } from "@src/components/translation/TranslationContext";

export const VideoBlob = ({ preview, mask }) => (
  <S.VideoMask mask={mask}>
    <ReactPlayer url={preview} playing loop muted volume={0} width="100%" height="100%" />
  </S.VideoMask>
);
type HeroProps = {
  blocked?: boolean;
  title: string | TranslationType;
  description: string | TranslationType;
  cta?: {
    label: string | TranslationType;
    href: string;
  };
  form?: SubscriptionFormProps;
  leftSideCustom?: any;
  rightSideCustom?: any;
  video?: {
    id: string;
    blob?: {
      preview: any;
      mask: any;
    };
    image?: any;
  };
  image?: any;
  geoFencing?: boolean;
};

const HeroSection: React.FC<HeroProps> = ({
  geoFencing,
  title,
  description,
  cta,
  leftSideCustom,
  rightSideCustom,
  image,
  video,
  form,
}) => {
  const modalContext = useContext(ModalContext);
  const openVideoModal = () => {
    modalContext.showModal(ModalType.VideoModal, { youtubeID: video.id });
  };

  return (
    <Container marginBottom={[40, 40, 60]} marginTop={[40, 40, 60]}>
      <Flex flexDirection={["column", "column", "row"]} alignItems="center" position="relative">
        <Flex flexBasis={["100%", "100%", "49%"]} flexDirection="column">
          <Title size={2}>{title}</Title>
          <Space size="m" />
          <BodyText>{description}</BodyText>
          <Space size="m" />
          {cta && <Button href={cta.href}>{cta.label}</Button>}
          {form && <SubscriptionForm {...form} />}
          {leftSideCustom && leftSideCustom}
        </Flex>
        <Space kind="inline" size="l" />
        {video && (
          <Flex position="relative" flexBasis={["100%", "100%", "49%"]} display={["none", "flex"]}>
            {video.image && <S.ImageWrapper image={video.image} />}
            {video.blob && (
              <S.VideoBg>
                <VideoBlob preview={video.blob.preview} mask={video.blob.mask} />
              </S.VideoBg>
            )}
            {!geoFencing && (
              <S.PlayButton onClick={openVideoModal}>
                <img
                  src={PlayButtonImage}
                  alt="Play video"
                  css={css`
                    width: 80px;
                    max-width: unset;
                  `}
                />
              </S.PlayButton>
            )}
          </Flex>
        )}
        {image && (
          <Flex flexBasis={["100%", "100%", "49%"]}>
            <S.ImageWrapper image={image} alt={`${title} image`} />
          </Flex>
        )}
        {rightSideCustom && rightSideCustom}
      </Flex>
    </Container>
  );
};

export default HeroSection;
