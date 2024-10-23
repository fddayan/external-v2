import React, { useEffect, useRef, useState, useCallback } from "react";
import styled from "@emotion/styled";
import {
  CurvedContainer,
  Display1,
  Display2,
  Headline1,
} from "@src/components/partials/schoolleader/styles";
import Container from "@src/components/Container";
import { mediaQueries, mediaQueriesMax } from "@src/styles/theme";
import Translate from "@src/components/translation/Translate";

const PanelContainer = styled.div`
  position: relative;
  zindex: 3;
  padding-left: 50%;
  margin-top: calc(-100vh + 100px - 90px);
  ${mediaQueriesMax[0]} {
    width: 100%;
    padding-left: 20px;
  }
  > div {
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }
`;

const Panel = styled.div`
  min-height: 100vh;
  display: flex;
  text-align: left;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding-left: 40px;
  z-index: 10;
  padding-top: 90px;
  button {
    position: static;
  }
  .image-container {
    width: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom center;
    display: none;
    ${mediaQueriesMax[0]} {
      display: flex;
      flex-grow: 4;
    }
  }
  .content-container {
    display: flex;
    flex-direction: column;
    gap: 28px;
    ${mediaQueriesMax[0]} {
      flex-grow: 1;
      gap: 12px;
    }
    @media screen and (max-height: 670px) {
      h2 {
        font-size: 24px;
      }
    }
  }

  ${mediaQueries[1]} {
    &:last-child {
      min-height: 100vh;
    }
  }
  ${mediaQueriesMax[0]} {
    align-items: center;
    padding-top: 100px;
    min-height: inherit;
    height: 100vh;
    text-align: center;
    gap: 12px;
    padding-inline: 20px;
  }
`;

const ImageContainer = styled.div`
  position: sticky;
  float: left;
  width: 50%;
  top: 100px;
  height: calc(100vh - 100px);
  text-align: left;
  z-index: 1;
  margin-top: calc(-100vh + 100px);
  img {
    height: 100%;
    position: absolute;
    top: 0;
    transition: opacity 0.5s ease-out;
    max-width: inherit;
    margin-left: -20%;
  }
  ${mediaQueriesMax[0]} {
    display: none;
  }
`;

const BulletNavigation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 20;
  align-self: flex-start;
  left: -400px;
  top: 0;
  height: 100vh;
  position: sticky;
  width: 6px;
  padding-top: 90px;
  ${mediaQueriesMax[0]} {
    padding-bottom: 84px;
  }
`;

const Bullet = styled.div<{ active: boolean }>`
  height: 33px;
  width: 6px;
  transition: width 0.05s;
  &:hover {
    transition: width 0.05s;
    width: 10px;
  }
  border-radius: 5px;
  background: ${(props) =>
    props.active ? "#ffffff" : "rgba(255, 255, 255, 0.5)"};
  margin: 5px 0;
  cursor: pointer;
  position: relative;
  transition: background 0.3s;
  display: inline-block;
  &:before {
    position: absolute;
    top: 0;
    right: -20px;
    left: -10px;
    bottom: 0;
    content: "";
    background-color: transparent;
    z-index: -1;
  }
`;

const StickyCarousel = ({ content, image }) => {
  const [activePanel, setActivePanel] = useState(0);
  const panelRefs = useRef(content.map(() => React.createRef()));
  const panelContainerRef = useRef(null);

  const scrollToPanel = useCallback(
    (index) => {
      if (index >= 0 && index < content.length) {
        panelRefs.current[index]?.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    },
    [content.length]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = panelRefs.current.findIndex(
              (ref) => ref.current === entry.target
            );
            if (index !== -1) setActivePanel(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    panelRefs.current.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () =>
      panelRefs.current.forEach(
        (ref) => ref.current && observer.unobserve(ref.current)
      );
  }, [content]);

  useEffect(() => {
    if (panelContainerRef.current) {
      let styleAdded = false;

      const containerObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.intersectionRatio >= 0.8 && !styleAdded) {
            document.documentElement.style.scrollSnapType = "y mandatory";
            styleAdded = true;
          } else if (entry.intersectionRatio < 1 && styleAdded) {
            document.documentElement.style.scrollSnapType = "";
            styleAdded = false;
          }
        },
        {
          threshold: [0, 0.8, 1],
        }
      );

      containerObserver.observe(panelContainerRef.current);

      return () => {
        containerObserver.unobserve(panelContainerRef.current);
        document.documentElement.style.scrollSnapType = "";
      };
    }
  }, []);

  return (
    <CurvedContainer css={{ paddingBlock: 100, marginBottom: 100 }}>
      <Container>
        <img
          src={image}
          width={350}
          css={{ margin: "auto", display: "block" }}
          alt=""
        />
        <Display1
          css={{
            color: "#ffffff",
            textAlign: "center",
            paddingBlock: 40,
            marginBottom: "-100px !important",
            maxWidth: 800,
            margin: "auto",
          }}
        >
          <Translate path="directus.page_privacy_2024.Carousel_heading" />
        </Display1>

        <BulletNavigation ref={panelContainerRef}>
          {content.map((_, index) => (
            <Bullet
              key={index}
              active={index === activePanel}
              onClick={() => scrollToPanel(index)}
            />
          ))}
        </BulletNavigation>
        <ImageContainer>
          {content.map((panel, index) => (
            <img
              key={index}
              src={panel.imageSrc}
              alt={`Panel ${index}`}
              style={{ opacity: index === activePanel ? 1 : 0 }}
            />
          ))}
        </ImageContainer>

        <PanelContainer>
          {/* <div css={{width: 10, height: 200, marginTop: -10, background: "green" }}></div> */}
          {content.map((panel, index) => (
            <Panel key={index} ref={panelRefs.current[index]}>
              <div
                className="image-container"
                css={{ backgroundImage: `url(${panel.mobileSrc})` }}
              ></div>
              <div className="content-container">
                <Display2 css={{ color: "#ffffff" }}>{panel.heading}</Display2>
                <Headline1 css={{ color: "#ffffff", fontWeight: 500 }}>
                  {panel.paragraph}
                </Headline1>
              </div>
            </Panel>
          ))}
        </PanelContainer>
      </Container>
    </CurvedContainer>
  );
};
export default StickyCarousel;
