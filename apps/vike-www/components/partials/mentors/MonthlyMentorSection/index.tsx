import React, { useEffect, useRef, useState } from "react";
import * as S from "./styles";
import Container from "@src/components/Container";
import { Space, Subheading, Title } from "@src/components/nessie-web";
import Translate from "@src/components/translation/Translate";

type MonthlyMentorSectionProps = {
  monthly_mentor_super_image: string;
  monthly_mentor_friend_1_image: string;
  monthly_mentor_friend_2_image: string;
  monthly_mentor_friend_3_image: string;
  monthly_mentor_mojo_image: string;
};

const MonthlyMentorSection: React.FC<MonthlyMentorSectionProps> = ({
  monthly_mentor_super_image,
  monthly_mentor_friend_1_image,
  monthly_mentor_friend_2_image,
  monthly_mentor_friend_3_image,
  monthly_mentor_mojo_image,
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
      threshold: 0.25,
    };

    const observer = new IntersectionObserver(intersectionObserverCallBack, options);
    if (animatePhotosRef.current) observer.observe(animatePhotosRef.current);
    return () => {
      if (animatePhotosRef.current) observer.unobserve(animatePhotosRef.current);
    };
  }, [animatePhotosRef]);

  return (
    <S.MonthlyMentorSectionContainer>
      <Container>
        <S.AnimationContainer ref={animatePhotosRef}>
          <S.MonthlyMentorHeader>
            <Title>
              <Translate path="directus.page_mentors.monthly_mentor_title" />
            </Title>
            <Space size="m" />
            <Subheading>
              <Translate path="directus.page_mentors.monthly_mentor_text" />
            </Subheading>
          </S.MonthlyMentorHeader>
          <Space size="xxl" />
          <S.SuperMentorImage src={monthly_mentor_super_image} alt="super mentor" />
          <S.AnimationMojoContainer animatePhotos={animatePhotos}>
            <S.ImageWrapper>
              <img src={monthly_mentor_mojo_image} alt="Mojo" />
            </S.ImageWrapper>
          </S.AnimationMojoContainer>
          <S.AnimationFriendOneContainer animatePhotos={animatePhotos}>
            <S.ImageWrapper>
              <img src={monthly_mentor_friend_1_image} alt="Friend one" />
            </S.ImageWrapper>
          </S.AnimationFriendOneContainer>
          <S.AnimationFriendTwoContainer animatePhotos={animatePhotos}>
            <S.ImageWrapper>
              <img src={monthly_mentor_friend_2_image} alt="Friend two" />
            </S.ImageWrapper>
          </S.AnimationFriendTwoContainer>
          <S.AnimationFriendThreeContainer animatePhotos={animatePhotos}>
            <S.ImageWrapper>
              <img src={monthly_mentor_friend_3_image} alt="Friend three" />
            </S.ImageWrapper>
          </S.AnimationFriendThreeContainer>
        </S.AnimationContainer>
      </Container>
    </S.MonthlyMentorSectionContainer>
  );
};

export default MonthlyMentorSection;
