import React, { useContext, useEffect, useState } from "react";
import * as S from "./styles";
import Container from "@src/components/Container";
import { Action, BodyText, DetailText, Heading, Space, Subheading, Title } from "@src/components/nessie-web";
import MentorSpotlightModal from "./MentorSpotlightModal";
import Translate from "@src/components/translation/Translate";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { CarouselProvider, DotGroup, Slider, Slide } from "pure-react-carousel";
import window from "global/window";

type MentorSpotlightSectionProps = {
  mentors: { name: string; school: string; description: string; avatar_url: string }[];
  isMentor: boolean;
};

const MentorSpotlightSection: React.FC<MentorSpotlightSectionProps> = ({ mentors, isMentor }) => {
  let screenWidth = window.innerWidth;
  const [visibleSlides, setVisibleSlides] = useState(0);

  const refreshVisibleSlides = () => {
    if (screenWidth > 1200) {
      setVisibleSlides(3);
    }
    if (screenWidth < 1200 && screenWidth >= 768) {
      setVisibleSlides(2);
    }
    if (screenWidth < 768) {
      setVisibleSlides(1);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      screenWidth = window.innerWidth;
      refreshVisibleSlides();
    });

    refreshVisibleSlides();
  }, []);

  const t = useContext(TranslationContext);

  const [isOpen, setIsOpen] = useState(false);
  const [mentorData, setMentorData] = useState({ avatar_url: "", index: 0 });

  const openModalHandler = (clickedMentor: { avatar_url: string; index: number }) => {
    setIsOpen(true);
    setMentorData(clickedMentor);
  };

  const mentorsSpotlight = mentors[0];
  const carouselMentors = isMentor ? mentors.slice(1) : mentors;
  const carouselIndexIncrement = isMentor ? 2 : 1;

  return (
    <S.MentorSpotlightSectionContainer isBGWhite={isMentor} isMentor={isMentor}>
      <MentorSpotlightModal mentor={mentorData} isOpen={isOpen} setIsOpen={setIsOpen} isMentor={isMentor} />
      <Container>
        <S.MentorSpotlightHeader>
          <Title>
            <Translate path="directus.page_mentors.mentor_spotlight_title" />
          </Title>
          <Space size="m" />
          <Subheading>
            <Translate path="directus.page_mentors.mentor_spotlight_text" />
          </Subheading>
        </S.MentorSpotlightHeader>
        <Space size="xl" />
        {isMentor && (
          <>
            <S.SpotlightCard>
              <S.SpotlightAvatar
                src={mentorsSpotlight.avatar_url}
                alt={t.translate(`directus.page_mentors.mentors.name_1`) as string}
              />
              <Space size="m" />
              <div>
                <S.SchoolTextWrapper>
                  <Heading>
                    <Translate path={`directus.page_mentors.mentors.name_1`} />
                  </Heading>
                  <Space size="s" />
                  <DetailText>
                    <Translate path={`directus.page_mentors.mentors.school_1`} />
                  </DetailText>
                </S.SchoolTextWrapper>
                <Space size="m" />
                <div>
                  <BodyText>
                    <Translate path={`directus.page_mentors.mentors.description_1`} />
                  </BodyText>
                </div>
              </div>
            </S.SpotlightCard>
            <Space size="l" />
          </>
        )}
        <CarouselProvider
          naturalSlideWidth={0}
          naturalSlideHeight={0}
          isIntrinsicHeight={true}
          totalSlides={isMentor ? carouselMentors.length : mentors.length}
          visibleSlides={visibleSlides}
        >
          <S.CarouselWrapper>
            <Slider>
              {carouselMentors.map((carouselMentor, index) => (
                <Slide key={index} index={index}>
                  <S.MentorCard>
                    <S.MentorAvatar
                      src={carouselMentor.avatar_url}
                      alt={
                        t.translate(`directus.page_mentors.mentors.name_${index + carouselIndexIncrement}`) as string
                      }
                    />
                    <Space size="m" />
                    <S.SchoolTextWrapper>
                      <Heading>
                        <Translate path={`directus.page_mentors.mentors.name_${index + carouselIndexIncrement}`} />
                      </Heading>
                      <Space size="s" />
                      <DetailText>
                        <Translate path={`directus.page_mentors.mentors.school_${index + carouselIndexIncrement}`} />
                      </DetailText>
                    </S.SchoolTextWrapper>
                    <Space size="m" />
                    <S.MentorTextWrapper>
                      <BodyText>
                        <Translate
                          path={`directus.page_mentors.mentors.description_${index + carouselIndexIncrement}`}
                        />
                      </BodyText>
                    </S.MentorTextWrapper>
                    <Space size="m" />
                    <S.ReadMoreButton>
                      <Action
                        style={{ cursor: "pointer" }}
                        onClick={() => openModalHandler({ avatar_url: carouselMentor.avatar_url, index: index })}
                      >
                        <Translate path="directus.page_mentors.mentor_spotlight_readmore_text" />
                      </Action>
                    </S.ReadMoreButton>
                  </S.MentorCard>
                </Slide>
              ))}
            </Slider>
            <Space size="m" />
            <DotGroup />
          </S.CarouselWrapper>
        </CarouselProvider>
      </Container>
    </S.MentorSpotlightSectionContainer>
  );
};

export default MentorSpotlightSection;
