import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { theme, Title } from "@src/components/nessie-web";
import { mediaQueries } from "@src/styles/theme";
import Container from "@src/components/Container";
import Translate from "@src/components/translation/Translate";

const {
  colors: { dt_taro10 },
} = theme;

const SlideshowSectionHolder = styled.div`
  overflow-x: hidden;
  overflow-y: visible;
  padding-bottom: 122px;
  padding-top: 14px;
  ${mediaQueries[0]} {
    padding-top: 110px;
    margin-top: -165px;
  }
`;

const SlideshowRow = styled.div`
  align-items: center;
  width: 100%;
  white-space: pre;
  display: flex;
  place-content: center;
`;

const SlideshowEntry = styled.div`
  width: 143.34px;
  height: 106.4px;
  border-radius: 42px;
  position: relative;
  background-color: ${dt_taro10};
  overflow: hidden;
  margin-left: 14px;
  margin-right: 14px;
  flex-shrink: 0;
  display: inline-block;
  box-shadow: 0px 2px 0px rgba(45, 64, 150, 0.06);
  ${mediaQueries[0]} {
    width: 264px;
    height: 196px;
  }
  div {
    height: 100%;
    width: 100%;
    position: absolute;
    img {
      max-width: unset;
      width: 100%;
      height: 100%;
      transform: scale(1.1);
    }
    &.a-state {
      z-index: 2;
      transition: opacity 0.4s ease-in-out;
    }
    &.b-state {
      z-index: 1;
      opacity: 0;
    }
  }
  &.animated {
    .a-state {
      opacity: 0;
    }
    .b-state {
      opacity: 1;
    }
  }

  &.bumper-1 {
    display: none;
    ${mediaQueries[0]} {
      display: inline-block;
      transform: translateY(-80px) rotate(18deg);
    }
  }
  &.bumper-2 {
    display: none;
    ${mediaQueries[0]} {
      display: inline-block;
      transform: translateY(-80px) rotate(-18deg);
    }
  }
  &.bumper-3 {
    display: none;
    ${mediaQueries[0]} {
      display: inline-block;
      transform: translateY(-80px) translateX(-20px) rotate(18deg);
    }
  }
  &.bumper-4 {
    display: none;
    ${mediaQueries[0]} {
      display: inline-block;
      transform: translateY(-80px) translateX(20px) rotate(-18deg);
    }
  }
  &.top-1 {
    transform: translateY(130px) translateX(150px) rotate(16deg);
    ${mediaQueries[0]} {
      transform: translateY(10px) translateX(-5px) rotate(16deg);
    }
  }

  &.top-2 {
    transform: rotate(15deg);
    ${mediaQueries[0]} {
      transform: translateY(94px) translateX(-13px) rotate(10deg);
    }
  }

  &.top-3 {
    transform: translateY(60px);
    ${mediaQueries[0]} {
      transform: translateY(124px);
    }
  }

  &.top-4 {
    transform: rotate(-15deg);
    ${mediaQueries[0]} {
      transform: translateY(94px) translateX(13px) rotate(-10deg);
    }
  }

  &.top-5 {
    transform: translateY(130px) translateX(-150px) rotate(-15deg);
    ${mediaQueries[0]} {
      transform: translateY(10px) translateX(5px) rotate(-16deg);
    }
  }

  &.bottom-1 {
    transform: rotate(12deg) translateX(180px) translateY(60px);
    ${mediaQueries[0]} {
      transform: rotate(14deg) translateY(10px) translateX(-20px);
    }
  }

  &.bottom-2 {
    transform: translateX(170px) translateY(120px);
    ${mediaQueries[0]} {
      transform: rotate(8deg) translateY(85px);
    }
  }

  &.bottom-4 {
    transform: translateX(0px) translateY(100px) rotate(-12deg);
    ${mediaQueries[0]} {
      transform: rotate(-8deg) translateY(85px);
    }
  }

  &.bottom-5 {
    opacity: 0;
    ${mediaQueries[0]} {
      opacity: 1;
      transform: rotate(-14deg) translateY(10px) translateX(20px);
    }
  }

  &.text-only {
    background: transparent;
    border-radius: 0px;
    overflow: visible;
    display: flex;
    align-items: center;
    ${mediaQueries[0]} {
      transform: translateY(120px);
    }
    box-shadow: none;
  }
`;

const SlideshowTitle = styled(Title)`
  font-size: 18px !important;
  line-height: 22px !important;
  ${mediaQueries[0]} {
    font-size: 30px !important;
    line-height: 36px !important;
  }
`;

type CommunitySlideshowProps = {
  title: string;
};

const CommunitySlideshow: React.FC<CommunitySlideshowProps> = ({ title }) => {
  const slideCount = 8;
  const animationHistory = [];
  const slideShowStates = [];
  for (let i = 0; i < slideCount; i++) {
    slideShowStates[i] = false;
  }

  const [animatedSlide, setAnimatedSlide] = useState(slideShowStates);

  const animateUniqueSlide = () => {
    let slide = Math.floor(Math.random() * slideCount);
    while (animationHistory.includes(slide)) {
      slide = Math.floor(Math.random() * slideCount);
    }
    animationHistory.push(slide);
    if (animationHistory.length > 2) {
      animationHistory.shift();
    }
    const tempSlideshow = animatedSlide;
    tempSlideshow[slide] = !tempSlideshow[slide];
    setAnimatedSlide(() => [...tempSlideshow]);
  };

  useEffect(() => {
    const interval = setInterval(() => animateUniqueSlide(), 4000);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SlideshowSectionHolder>
      <Container>
        <SlideshowRow>
          <SlideshowEntry className="bumper-1">
            <div className="a-state">
              <img src="https://static.classdojo.com/img/page_home/carousel-2022/home_community_11.jpg" alt="" />
            </div>
          </SlideshowEntry>
          <SlideshowEntry className={`top-1 ${animatedSlide[0] ? "animated" : ""}`}>
            <div className="a-state">
              <img src="https://static.classdojo.com/img/page_home/carousel-2022/home_community_24.jpg" alt="" />
            </div>
            <div className="b-state">
              <img src="https://static.classdojo.com/img/page_home/carousel-2022/home_community_14.jpg" alt="" />
            </div>
          </SlideshowEntry>
          <SlideshowEntry className={`top-2 ${animatedSlide[1] ? "animated" : ""}`}>
            <div className="a-state">
              <img src="https://static.classdojo.com/img/page_home/carousel-2022/home_community_16.jpg" alt="" />
            </div>
            <div className="b-state">
              <img src="https://static.classdojo.com/img/page_home/carousel-2022/home_community_10.jpg" alt="" />
            </div>
          </SlideshowEntry>
          <SlideshowEntry className={`top-3 ${animatedSlide[2] ? "animated" : ""}`}>
            <div className="a-state">
              <img src="https://static.classdojo.com/img/page_home/carousel-2022/home_community_5.jpg" alt="" />
            </div>
            <div className="b-state">
              <img src="https://static.classdojo.com/img/page_home/carousel-2022/home_community_6.jpg" alt="" />
            </div>
          </SlideshowEntry>
          <SlideshowEntry className={`top-4 ${animatedSlide[3] ? "animated" : ""}`}>
            <div className="a-state">
              <img src="https://static.classdojo.com/img/page_home/carousel-2022/home_community_22.jpg" alt="" />
            </div>
            <div className="b-state">
              <img src="https://static.classdojo.com/img/page_home/carousel-2022/home_community_4.jpg" alt="" />
            </div>
          </SlideshowEntry>
          <SlideshowEntry className={`top-5 ${animatedSlide[4] ? "animated" : ""}`}>
            <div className="a-state">
              <img src="https://static.classdojo.com/img/page_home/carousel-2022/home_community_27.jpg" alt="" />
            </div>
            <div className="b-state">
              <img src="https://static.classdojo.com/img/page_home/carousel-2022/home_community_25.jpg" alt="" />
            </div>
          </SlideshowEntry>
          <SlideshowEntry className="bumper-2">
            <div className="a-state">
              <img src="https://static.classdojo.com/img/page_home/carousel-2022/home_community_12.jpg" alt="" />
            </div>
          </SlideshowEntry>
        </SlideshowRow>
        <SlideshowRow style={{ marginTop: "60px" }}>
          <SlideshowEntry className="bumper-3">
            <div className="a-state">
              <img src="https://static.classdojo.com/img/page_home/carousel-2022/home_community_13.jpg" alt="" />
            </div>
          </SlideshowEntry>
          <SlideshowEntry className={`bottom-1 ${animatedSlide[5] ? "animated" : ""}`}>
            <div className="a-state">
              <img src="https://static.classdojo.com/img/page_home/carousel-2022/home_community_23.jpg" alt="" />
            </div>
            <div className="b-state">
              <img src="https://static.classdojo.com/img/page_home/carousel-2022/home_community_1.jpg" alt="" />
            </div>
          </SlideshowEntry>
          <SlideshowEntry className={`bottom-2 ${animatedSlide[6] ? "animated" : ""}`}>
            <div className="a-state">
              <img src="https://static.classdojo.com/img/page_home/carousel-2022/home_community_31.jpg" alt="" />
            </div>
            <div className="b-state">
              <img src="https://static.classdojo.com/img/page_home/carousel-2022/home_community_20.jpg" alt="" />
            </div>
          </SlideshowEntry>
          <SlideshowEntry className="bottom-3 text-only">
            <SlideshowTitle size={[1]} textAlign="center">
              <Translate path={title} />
            </SlideshowTitle>
          </SlideshowEntry>
          <SlideshowEntry className={`bottom-4 ${animatedSlide[7] ? "animated" : ""}`}>
            <div className="a-state">
              <img src="https://static.classdojo.com/img/page_home/carousel-2022/home_community_29.jpg" alt="" />
            </div>
            <div className="b-state">
              <img src="https://static.classdojo.com/img/page_home/carousel-2022/home_community_21.jpg" alt="" />
            </div>
          </SlideshowEntry>
          <SlideshowEntry className={`bottom-5 ${animatedSlide[8] ? "animated" : ""}`}>
            <div className="a-state">
              <img src="https://static.classdojo.com/img/page_home/carousel-2022/home_community_19.jpg" alt="" />
            </div>
            <div className="b-state">
              <img src="https://static.classdojo.com/img/page_home/carousel-2022/home_community_9.jpg" alt="" />
            </div>
          </SlideshowEntry>
          <SlideshowEntry className="bumper-4">
            <div className="a-state">
              <img src="https://static.classdojo.com/img/page_home/carousel-2022/home_community_15.jpg" alt="" />
            </div>
          </SlideshowEntry>
        </SlideshowRow>
      </Container>
    </SlideshowSectionHolder>
  );
};

export default CommunitySlideshow;
