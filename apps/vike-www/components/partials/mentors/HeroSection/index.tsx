import React, { useEffect, useRef, useState } from "react";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import * as S from "./styles";
import Container from "@src/components/Container";
import { Button, Space, Title } from "@src/components/nessie-web";
import Translate from "@src/components/translation/Translate";
import { PlayIcon } from "@classdojo/web/nessie/icons";
import { GatsbyImageWrapped } from "@src/components/GatsbyImageWrapper";
import { ActivationRedirectionContext } from "@src/contexts/ActivationRedirectionContext";

type HeroSectionProps = {
  hero_animation_photostack_image: string;
  hero_animation_bg_image: string;
  hero_animation_mojo_image: string;
  hero_animation_mojofriend_image: string;
  hero_join_button_url: string;
  hero_video_youtube_id: string;
  hero_video_thumb_image: GatsbyImageWrapped;
  user: string;
  openJoinTheClubModal: boolean;
};

const HeroSection: React.FC<HeroSectionProps> = ({
  hero_animation_bg_image,
  hero_animation_photostack_image,
  hero_animation_mojo_image,
  hero_animation_mojofriend_image,
  hero_video_youtube_id,
  hero_video_thumb_image,
  user,
  openJoinTheClubModal,
}) => {
  const modalContext = React.useContext(ModalContext);
  const redirectionContext = React.useContext(ActivationRedirectionContext);

  function openLoginModal() {
    redirectionContext.preventRedirection();
    modalContext.showModal(ModalType.Login);
  }

  function openSurveyModal() {
    modalContext.showModal(ModalType.JoinTheClubModal);
  }

  function openVideoModal() {
    modalContext.showModal(ModalType.VideoModal, { youtubeID: hero_video_youtube_id });
  }

  const [, setAnimatePhotos] = useState(false);
  const animatePhotosRef = useRef(null);

  const intersectionObserverCallBack = (entries: { isIntersecting: boolean }[]) => {
    const [entry] = entries;
    setAnimatePhotos(entry.isIntersecting);
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(intersectionObserverCallBack, options);
    if (animatePhotosRef.current) observer.observe(animatePhotosRef.current);
    return () => {
      if (animatePhotosRef.current) observer.unobserve(animatePhotosRef.current);
    };
  }, [animatePhotosRef]);

  useEffect(() => {
    if (openJoinTheClubModal) openSurveyModal();
  }, [openJoinTheClubModal]);

  return (
    <S.HeroSectionContainer>
      <Container>
        <S.HeroSectionFlex>
          <S.HeroSectionFlexChild>
            <Title size={2}>
              <Translate path="directus.page_mentors.hero_title" />
            </Title>
            <Space size="s" />
            <S.HeroText>
              <Translate path="directus.page_mentors.hero_text" />
            </S.HeroText>
            <Space size="l" />
            <S.ButtonsWrapper>
              <Space size="m" />
              {user ? (
                <>
                  <S.FormButton onClick={openSurveyModal}>
                    <Translate path="directus.page_mentors.hero_join_button_text" />
                  </S.FormButton>
                  <Space kind="inline" size="s" />
                  <Button kind="secondary" onClick={openVideoModal} icon={<PlayIcon />}>
                    <Translate path="directus.page_mentors.hero_video_button_text" />
                  </Button>
                </>
              ) : (
                <Button onClick={openLoginModal}>
                  <Translate path="directus.page_mentors.hero_sign_button_text" />
                </Button>
              )}
            </S.ButtonsWrapper>
          </S.HeroSectionFlexChild>
          <S.HeroSectionFlexChild ref={animatePhotosRef}>
            <S.BlobContainer bgImage={hero_animation_bg_image}>
              <S.MojosFriendPic animatePhotos={false} bgImage={hero_animation_mojofriend_image} />
              <S.PhotoStack src={hero_animation_photostack_image} alt="stack pf photos" />
              <S.MojoPic animatePhotos={false} bgImage={hero_animation_mojo_image} />
              <S.VideoThumbWrapper onClick={openVideoModal}>
                <S.VideoThumb image={hero_video_thumb_image} alt="" />
              </S.VideoThumbWrapper>
              <S.PlayButton size="l" onClick={openVideoModal} icon={<PlayIcon />} />
            </S.BlobContainer>
          </S.HeroSectionFlexChild>
        </S.HeroSectionFlex>
      </Container>
    </S.HeroSectionContainer>
  );
};

export default HeroSection;
