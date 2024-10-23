import React, { useState, useEffect } from "react";
import Container from "@src/components/Container";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import VideoSlide from "./VideoSlide";
import { Space } from "@src/components/nessie-web";
import window from "global/window";
import * as S from "./styles";

type VideoSliderSectionProps = {
  videos: {
    new: boolean;
    released: boolean;
    title: string;
    description: string;
    url: string;
    poster_url: string;
  }[];
};
const VideoSliderSection: React.FC<VideoSliderSectionProps> = ({ videos }) => {
  let screenWidth = window.innerWidth;
  const [visibleSlides, setVisibleSlides] = useState(0);

  const refreshVisibleSlides = () => {
    if (screenWidth < 768) {
      setVisibleSlides(1);
    } else {
      if (screenWidth < 1200) {
        setVisibleSlides(2);
      } else {
        setVisibleSlides(3);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      screenWidth = window.innerWidth;
      refreshVisibleSlides();
    });

    refreshVisibleSlides();
  }, []);

  return (
    <S.VideoSliderContainer>
      <Container>
        <S.SliderContainer>
          <CarouselProvider
            naturalSlideWidth={0}
            naturalSlideHeight={0}
            isIntrinsicHeight={true}
            totalSlides={videos.length}
            visibleSlides={visibleSlides}
            step={visibleSlides}
          >
            <S.SliderButtonsReference>
              <Slider>
                {videos.map((video, index) => (
                  <Slide index={index} key={index}>
                    <VideoSlide key={index} isNew={video.new} {...video} />
                  </Slide>
                ))}
              </Slider>
              <ButtonBack>
                <img src="https://static.classdojo.com/img/conundrums/caret.svg" alt="back slider button icon" />
              </ButtonBack>
              <ButtonNext>
                <img src="https://static.classdojo.com/img/conundrums/caret.svg" alt="back slider button icon" />
              </ButtonNext>
            </S.SliderButtonsReference>
          </CarouselProvider>
          <Space size="m" />
        </S.SliderContainer>
      </Container>
    </S.VideoSliderContainer>
  );
};

export default VideoSliderSection;
