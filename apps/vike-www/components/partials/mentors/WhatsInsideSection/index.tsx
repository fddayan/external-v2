import React, { useContext, useEffect, useRef, useState } from "react";
import * as S from "./styles";
import Container from "@src/components/Container";
import { BodyText, Space, Title } from "@src/components/nessie-web";
import Translate from "@src/components/translation/Translate";
import { TranslationContext } from "@src/components/translation/TranslationContext";

type WhatsInsideSectionProps = {
  whats_inside_animation1_image: string;
  whats_inside_animation2_shelves_image: string;
  whats_inside_animation2_laddermojo_image: string;
};

const WhatsInsideSection: React.FC<WhatsInsideSectionProps> = ({
  whats_inside_animation1_image,
  whats_inside_animation2_shelves_image,
  whats_inside_animation2_laddermojo_image,
}) => {
  const t = useContext(TranslationContext);

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
      threshold: 0.25,
    };

    const observer = new IntersectionObserver(intersectionObserverCallBack, options);
    if (animatePhotosRef.current) observer.observe(animatePhotosRef.current);
    return () => {
      if (animatePhotosRef.current) observer.unobserve(animatePhotosRef.current);
    };
  }, [animatePhotosRef]);

  return (
    <S.WhatsInsideSectionContainer ref={animatePhotosRef}>
      <Container>
        <S.WhatsInsideHeader>
          <Title>
            <Translate path="directus.page_mentors.whats_inside_title" />
          </Title>
          <Space size="m" />
          <BodyText>
            <Translate path="directus.page_mentors.whats_inside_text" />
          </BodyText>
        </S.WhatsInsideHeader>
        <S.AnimationOneContainer animatePhotos={animatePhotos}>
          <S.ImageWrapper>
            <img src={whats_inside_animation1_image} alt={`mentor of the month pic`} />
          </S.ImageWrapper>
        </S.AnimationOneContainer>
        <S.AnimationTwoShelfContainer animatePhotos={animatePhotos}>
          <S.ImageWrapper>
            <img src={whats_inside_animation2_shelves_image} alt={`shelf illustration pic`} />
          </S.ImageWrapper>
        </S.AnimationTwoShelfContainer>
        <S.AnimationTwoLadderContainer animatePhotos={animatePhotos}>
          <S.ImageWrapper>
            <img src={whats_inside_animation2_laddermojo_image} alt={`mojo on a ladder pic`} />
          </S.ImageWrapper>
        </S.AnimationTwoLadderContainer>
      </Container>
    </S.WhatsInsideSectionContainer>
  );
};

export default WhatsInsideSection;
