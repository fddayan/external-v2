import React, { useContext, useEffect, useRef, useState } from "react";
import Container from "@src/components/Container";
import { BodyText, Button, Heading, Space, DetailText, Title } from "@src/components/nessie-web";
import Translate from "@src/components/translation/Translate";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import * as S from "./styles";

type VIPResourcesSectionProps = {
  vip_resources: {
    icon_url: string;
    icon_alt: string;
    title: string;
    text: string;
    button_text: string;
    button_url: string;
  }[];
  vip_resources_animation1_bg_image: string;
  vip_resources_animation1_coffeemug_image: string;
  vip_resources_animation2_bg_image: string;
  vip_resources_animation2_frontbox_image: string;
  vip_resources_animation2_donut_image: string;
};

const VIPResourcesSection: React.FC<VIPResourcesSectionProps> = ({
  vip_resources,
  vip_resources_animation1_bg_image,
  vip_resources_animation1_coffeemug_image,
  vip_resources_animation2_bg_image,
  vip_resources_animation2_frontbox_image,
  vip_resources_animation2_donut_image,
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
    <>
      <S.AnimationTwoMobileContainer>
        <S.ImageWrapper>
          <S.CoffeeMachineImage src={vip_resources_animation1_bg_image} alt={`coffee machine`} />
          <S.CoffeeShadow animatePhotos={animatePhotos} />
          <S.CoffeeMugImage
            animatePhotos={animatePhotos}
            src={vip_resources_animation1_coffeemug_image}
            alt={`coffee mug`}
          />
        </S.ImageWrapper>
      </S.AnimationTwoMobileContainer>
      <S.VIPResourcesSectionContainer ref={animatePhotosRef}>
        <Container>
          <S.AnimationsContainer>
            <S.VIPResourcesHeader>
              <Title size={2}>
                <Translate path="directus.page_mentors.vip_resources_title" />
              </Title>
              <Space size="l" />
              <BodyText>
                <Translate path="directus.page_mentors.vip_resources_text" />
              </BodyText>
            </S.VIPResourcesHeader>
            <Space size="xl" />
            <S.VIPResourcesGridOne>
              <S.VIPResourcesCard>
                <S.CardIcon src={vip_resources[0].icon_url} alt={t.translate(vip_resources[0].icon_url) as string} />
                <Space size="m" />
                <Heading>
                  <Translate path="directus.page_mentors.vip_resources.title_1" />
                </Heading>
                <Space size="m" />
                <DetailText>
                  <Translate path="directus.page_mentors.vip_resources.text_1" />
                </DetailText>
                <Space size="m" />
                <Button href={vip_resources[0].button_url} target="_blank">
                  <Translate path="directus.page_mentors.vip_resources.button_text_1" />
                </Button>
              </S.VIPResourcesCard>
            </S.VIPResourcesGridOne>
            <S.VIPResourcesGridTwo>
              <S.VIPResourcesCard>
                <S.CardIcon src={vip_resources[1].icon_url} alt={t.translate(vip_resources[1].icon_url) as string} />
                <Space size="m" />
                <Heading>
                  <Translate path="directus.page_mentors.vip_resources.title_2" />
                </Heading>
                <Space size="m" />
                <DetailText>
                  <Translate path="directus.page_mentors.vip_resources.text_2" />
                </DetailText>
                <Space size="m" />
                <Button href={vip_resources[1].button_url} target="_blank">
                  <Translate path="directus.page_mentors.vip_resources.button_text_2" />
                </Button>
              </S.VIPResourcesCard>
              <S.VIPResourcesCard>
                <S.CardIcon src={vip_resources[2].icon_url} alt={t.translate(vip_resources[2].icon_url) as string} />
                <Space size="m" />
                <Heading>
                  <Translate path="directus.page_mentors.vip_resources.title_3" />
                </Heading>
                <Space size="m" />
                <DetailText>
                  <Translate path="directus.page_mentors.vip_resources.text_3" />
                </DetailText>
                <Space size="m" />
                <Button href={vip_resources[2].button_url} target="_blank">
                  <Translate path="directus.page_mentors.vip_resources.button_text_3" />
                </Button>
              </S.VIPResourcesCard>
            </S.VIPResourcesGridTwo>
            <S.AnimationOneContainer>
              <S.ImageWrapper>
                <img src={vip_resources_animation2_bg_image} alt={`donut package pic`} />
                <S.DonutShadow animatePhotos={animatePhotos} />
                <S.DonutImage animatePhotos={animatePhotos} src={vip_resources_animation2_donut_image} alt={`donut`} />
                <S.BoxFrontImage src={vip_resources_animation2_frontbox_image} alt={`donut package box front side`} />
              </S.ImageWrapper>
            </S.AnimationOneContainer>
            <S.AnimationTwoContainer>
              <S.ImageWrapper>
                <S.CoffeeMachineImage src={vip_resources_animation1_bg_image} alt={`coffee machine`} />
                <S.CoffeeShadow animatePhotos={animatePhotos} />
                <S.CoffeeMugImage
                  animatePhotos={animatePhotos}
                  src={vip_resources_animation1_coffeemug_image}
                  alt={`coffee mug`}
                />
              </S.ImageWrapper>
            </S.AnimationTwoContainer>
          </S.AnimationsContainer>
        </Container>
      </S.VIPResourcesSectionContainer>
    </>
  );
};

export default VIPResourcesSection;
