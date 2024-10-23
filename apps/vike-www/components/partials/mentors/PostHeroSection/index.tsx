import React, { useEffect, useRef, useState, useContext } from "react";
import * as S from "./styles";
import Container from "@src/components/Container";
import { BodyText, Button, Space, Title } from "@src/components/nessie-web";
import Translate from "@src/components/translation/Translate";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";

type PostHeroSectionProps = {
  post_hero_animation_mojo_image: string;
  post_hero_animation_bg_image: string;
  post_hero_complete_button_url: string;
  post_hero_accept_button_url: string;
  post_hero_animation_envelope1_image: string;
  post_hero_animation_envelope2_image: string;
  post_hero_animation_envelope3_image: string;
  post_hero_animation_envelope4_image: string;
  openAcceptMissionModal: boolean;
};

const PostHeroSection: React.FC<PostHeroSectionProps> = ({
  post_hero_animation_bg_image,
  post_hero_animation_mojo_image,
  post_hero_complete_button_url,
  post_hero_accept_button_url,
  post_hero_animation_envelope1_image,
  post_hero_animation_envelope2_image,
  post_hero_animation_envelope3_image,
  post_hero_animation_envelope4_image,
  openAcceptMissionModal,
}) => {
  const [animatePhotos, setAnimatePhotos] = useState(false);
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

  const modalContext = useContext(ModalContext);

  const acceptMissionModal = ModalType.AcceptMissionModal;
  function showAcceptMissionModal() {
    if (!isAcceptMissionButtonAURL) {
      modalContext.showModal(acceptMissionModal);
    }
  }

  const missionCompleteModal = ModalType.MissionCompleteModal;
  function showMissionCompleteModal() {
    if (!isCompleteMissionButtonAURL) {
      modalContext.showModal(missionCompleteModal);
    }
  }

  useEffect(() => {
    if (openAcceptMissionModal) showAcceptMissionModal();
  }, [openAcceptMissionModal]);

  const isCompleteMissionButtonAURL = post_hero_complete_button_url !== null;
  const isAcceptMissionButtonAURL = post_hero_accept_button_url !== null;

  return (
    <S.PostHeroSectionContainer ref={animatePhotosRef}>
      <Container>
        <S.PostHeroSectionFlex>
          <S.PostHeroSectionFlexChild>
            <S.HeaderContentWrapper>
              <Title size={2}>
                <Translate path={"directus.page_mentors.post_hero_title"} />
              </Title>
              <Space size="xl" />
              <BodyText>
                <Translate path={"directus.page_mentors.post_hero_text"} />
              </BodyText>
              <Space size="m" />
              <S.ButtonsWrapper>
                <Button
                  onClick={showAcceptMissionModal}
                  href={isAcceptMissionButtonAURL ? post_hero_accept_button_url : undefined}
                >
                  <Translate path={"directus.page_mentors.post_hero_accept_button_text"} />
                </Button>
                <Space size="s" />
                <Space kind="inline" size="s" />
                <Button
                  onClick={showMissionCompleteModal}
                  href={isCompleteMissionButtonAURL ? post_hero_complete_button_url : undefined}
                >
                  <Translate path={"directus.page_mentors.post_hero_complete_button_text"} />
                </Button>
              </S.ButtonsWrapper>
            </S.HeaderContentWrapper>
          </S.PostHeroSectionFlexChild>
          <Space size="m" />
          <Space kind="inline" size="m" />
          <S.PostHeroSectionFlexChild>
            <S.AnimationBGContainer bgImage={post_hero_animation_bg_image}>
              <S.EnvelopeOne
                animatePhotos={animatePhotos}
                src={post_hero_animation_envelope1_image}
                alt="flying envelope"
              />
              <S.EnvelopeTwo
                animatePhotos={animatePhotos}
                src={post_hero_animation_envelope2_image}
                alt="flying envelope"
              />
              <S.EnvelopeThree
                animatePhotos={animatePhotos}
                src={post_hero_animation_envelope3_image}
                alt="flying envelope"
              />
              <S.EnvelopeFour
                animatePhotos={animatePhotos}
                src={post_hero_animation_envelope4_image}
                alt="flying envelope"
              />
              <S.MojoImage src={post_hero_animation_mojo_image} alt="stack pf photos" />
            </S.AnimationBGContainer>
          </S.PostHeroSectionFlexChild>
        </S.PostHeroSectionFlex>
      </Container>
    </S.PostHeroSectionContainer>
  );
};

export default PostHeroSection;
