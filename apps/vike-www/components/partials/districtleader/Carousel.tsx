import React, { memo, useState, useRef, useEffect, useCallback } from "react";
import styled from "@emotion/styled";
import { graphql, useStaticQuery } from "gatsby";
import { Display3, Body1, LightbulbIcon, SmileIcon, LockIcon, Headline1, Underline } from "./styles";
import Container from "@src/components/Container";
import lightbulbSource from "@src/assets/images/districts/icon-lightbulb.svg";
import { mediaQueries, mediaQueriesMax } from "@src/styles/theme";

const BlockContainer = styled.div`
  transition: opacity 0.5s ease, background-color 0.5s ease, color 0.5s ease;
  display: block;
  align-items: flex-start;
  flex-direction: row;
  justify-content: flex-start;

  svg path {
    fill: #8047ff;
  }

  .icon-container {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }
  h2 {
    margin-block: 8px;
    color: #2c2a50;
    font-feature-settings: "clig" off, "liga" off;
    font-family: DojoDisplay !important;
    font-size: 24.827px;
    font-style: normal;
    font-weight: 800;
    line-height: 120%; /* 29.793px */
    letter-spacing: -0.213px;
    ${mediaQueriesMax[1]} {
      font-size: 35px;
    }
  }
  p {
    margin: 0;
  }
  ${mediaQueries[1]} {
    display: flex;
    padding: 30px 18px;
    border-radius: 30px;
    background-color: #f1f3f8;
    cursor: pointer;
    img {
      display: none;
    }
    &.active {
      color: #ffffff;
      background-color: #8047ff;
      transition: opacity 0.5s ease, background-color 0.5s ease, color 0.5s ease;
      svg path {
        fill: #fff;
        transition: fill 0.5s ease;
      }
      h2 {
        color: #fff;
        transition: color 0.5s ease;
      }
    }
  }
  &:not(.active) p {
    display: none;
  }
  ${mediaQueriesMax[1]} {
    text-align: center;
    justify-content: center;
    .icon-container {
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      background-color: #8047ff;
      svg path {
        fill: #ffffff;
      }
    }
    p {
      display: block !important;
    }
  }
`;

const CarouselSectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  gap: 35px;
  min-height: 600px;
  ${mediaQueriesMax[1]} {
    flex-direction: column;
  }
`;

const BlocksContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  gap: 18px;

  ${mediaQueriesMax[1]} {
    flex-direction: column;
    justify-content: center;
    gap: 48px;
    margin: auto;
  }
`;

const ActiveImage = styled.div`
  width: 500px;
  img {
    width: 100%;
    height: auto;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const CarouselSection = () => {
  const data = useStaticQuery(graphql`
    {
      badge: file(relativePath: { eq: "districts/plasticine-smiling-badge.png" }) {
        publicURL
      }
      underline: file(relativePath: { eq: "districts/sketch-underline.svg" }) {
        publicURL
      }
      moreAccess: file(relativePath: { eq: "districts/translation-districts.gif" }) {
        publicURL
      }
      moreEngagement: file(relativePath: { eq: "districts/illustration-more-engagement.png" }) {
        publicURL
      }
      moreJoy: file(relativePath: { eq: "districts/illustration-more-joy.png" }) {
        publicURL
      }
    }
  `);

  const { badge, underline, moreAccess, moreEngagement, moreJoy } = data;
  const CarouselBackground = styled.div`
    background-image: url(${badge.publicURL});
    background-position: calc(50% - 500px) -30px;
    background-repeat: no-repeat;
    background-size: 300px;
    padding-top: 40px;
    ${mediaQueriesMax[1]} {
      margin-bottom: 80px;
    }
  `;

  const blocks = [
    {
      id: "access",
      icon: <LockIcon />,
      image: moreAccess.publicURL,
      title: "Connect and communicate instantly",
      subtitle: "Reach every teacher, kid and family in 100+ languages. One-way announcements and two-way messaging.",
    },
    {
      id: "engagement",
      icon: <LightbulbIcon />,
      image: moreEngagement.publicURL,
      title: "Engage everyone in your district",
      subtitle: "Share videos, photos, files and events so families feel connected, not just informed.",
    },
    {
      id: "joy",
      icon: <SmileIcon />,
      image: moreJoy.publicURL,
      title: "Happier families, teachers and kids",
      subtitle: "PBIS-aligned positive point system and readymade classroom activities.",
    },
  ];

  const blockRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 992;

  const activateBlock = (index) => {
    if (blockRefs.current.length === blocks.length) {
      blockRefs.current.forEach((ref) => {
        if (ref.current) ref.current.classList.remove("active");
      });
      if (blockRefs.current[index] && blockRefs.current[index].current) {
        blockRefs.current[index].current.classList.add("active");
      }
    }
  };

  useEffect(() => {
    let interval;
    if (!isMobile) {
      interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % blocks.length);
      }, 20000);
    }

    return () => clearInterval(interval);
  }, [blocks.length, isMobile, activeIndex]);

  useEffect(() => {
    activateBlock(activeIndex);
  }, [activeIndex, isMobile]);

  useEffect(() => {
    if (blockRefs.current.length === blocks.length) {
      activateBlock(0);
    }
  }, [blockRefs.current.length, blocks.length]);

  const handleBlockClick = (index) => {
    if (!isMobile) {
      setActiveIndex(index);
    }
  };

  return (
    <CarouselBackground>
      <Container>
        <div
          css={{ textAlign: "center", margin: "auto", display: "flex", alignItems: "center", flexDirection: "column" }}
        >
          <Display3 css={{ maxWidth: 700, marginBottom: 36 }}>
            The best way to build a more positive school community
          </Display3>
        </div>
        <CarouselSectionContainer>
          <BlocksContainer>
            {blocks.map((block, index) => (
              <BlockContainer
                key={block.id}
                ref={(el) => (blockRefs.current[index] = { current: el })}
                onClick={() => handleBlockClick(index)}
              >
                <div className="icon-container">{block.icon}</div>
                <div>
                  <h2>{block.title}</h2>
                  <p>{block.subtitle}</p>
                </div>
                <img src={block.image} alt={block.title} />
              </BlockContainer>
            ))}
          </BlocksContainer>
          {!isMobile && (
            <ActiveImage>
              <img src={blocks[activeIndex].image} alt={blocks[activeIndex].title} />
            </ActiveImage>
          )}
        </CarouselSectionContainer>
      </Container>
    </CarouselBackground>
  );
};

export default CarouselSection;
