import React, { useEffect, useContext } from "react";
import Container from "@src/components/Container";
import { Space, Heading } from "@src/components/nessie-web";
import { PlayIcon } from "@classdojo/web/nessie/icons";
import * as S from "./styles";
import { logEvent } from "@src/utils/logClient";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import Translate from "@src/components/translation/Translate";

type HeroSectionProps = {
  hero_title: string;
  hero_description: string;
  space_dog_image: any;
  video_cover_image_url: string;
  youtube_id: string;
};

const HeroSection: React.FC<HeroSectionProps> = ({
  hero_title,
  hero_description,
  space_dog_image,
  video_cover_image_url,
  youtube_id,
}) => {
  const t = useContext(TranslationContext);

  useEffect(() => {
    logEvent({
      eventName: "web.external_page.conundrums.page_view",
      eventValue: window.location.href,
    });
  }, []);

  const modalContext = useContext(ModalContext);
  function openVideoModal() {
    modalContext.showModal(ModalType.VideoModal, { youtubeID: youtube_id });
  }

  return (
    <>
      <Container>
        <S.HeroContainer>
          <S.HeroTitle size={3}>
            <Translate path={hero_title} />
          </S.HeroTitle>
          <Space size="l" />
          <S.TextContainer>
            <Heading>
              <Translate path={hero_description} />
            </Heading>
          </S.TextContainer>
          <S.HeroVideoContainer>
            <S.HeroVideoCover autoPlay loop muted>
              <source src={video_cover_image_url} type="video/mp4" />
            </S.HeroVideoCover>
            <S.SpaceDogImage bg={space_dog_image.file.publicURL} />
            <S.VideoPlayButton kind="primary" icon={<PlayIcon />} onClick={openVideoModal} />
          </S.HeroVideoContainer>
        </S.HeroContainer>
      </Container>
    </>
  );
};

export default HeroSection;
