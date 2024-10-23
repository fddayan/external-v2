import React, { useEffect } from "react";
import styled from "@emotion/styled";
import Translate from "@src/components/translation/Translate";
import { mediaQueries } from "@src/styles/theme";
import Container from "@src/components/Container";
import { Space, Title, theme } from "@src/components/nessie-web";
import { CarouselProvider, Slider, Slide, DotGroup } from "pure-react-carousel";
import window from "global/window";

const {
  colors: { dt_white, dt_taro20, dt_taro40 },
  radii: { dt_radius_m },
} = theme;

const CoverageSectionContainer = styled.section`
  width: 100%;
  padding: 0;

  ${mediaQueries[0]} {
    padding: 100px 0 30px 0;
  }
`;

const CoverageContent = styled.div<{ bgImage: string }>`
  background: url("${(props) => props.bgImage}");
  background-size: 100%;
  background-position: top center;
  background-repeat: no-repeat;
  height: 400px;
  display: flex;
  flex-direction: column;
  padding: 30px;
  overflow: hidden;
  margin-left: -15px;
  margin-right: -15px;

  ${mediaQueries[0]} {
    width: 100%;
    margin-left: 0px;
    margin-right: 0px;
    flex-direction: row-reverse;
    border-radius: ${dt_radius_m};
  }

  .carousel {
    width: 100%;

    .carousel__dot-group {
      position: absolute;
      bottom: 0;
    }

    .carousel__dot {
      border: none;
      border-radius: 5px;
      width: 9px;
      height: 9px;
      margin: 0 3px;
      background-color: ${dt_taro20};
      padding: 0;
    }

    .carousel__dot.carousel__dot--selected {
      background-color: ${dt_taro40};
    }
  }

  .fade-animation {
    transition: opacity 2500ms;
  }

  .hide {
    transition: opacity 2500ms;
    opacity: 0;
  }

  .show {
    transition: opacity 2500ms;
    opacity: 1;
  }
`;

const CoverageContentBlock = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  ${mediaQueries[0]} {
    width: 50%;
  }
`;

const CoverageContentTextBlock = styled(CoverageContentBlock)`
  height: 100%;
`;

const WorldContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 0;
  color: #fff;

  .world {
    position: absolute;
    width: 100%;
    height: 340px;
    right: -50%;
    pointer-events: none;
    transform: scale(0.8) translateX(35%);

    ${mediaQueries[0]} {
      transform: scale(0.8) translateX(40%);
      height: 100%;
      right: unset;
    }

    ${mediaQueries[1]} {
      transform: scale(0.8);
    }
  }

  .world-globe {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 0;
    height: 0;
  }

  .world-globe-pole {
    position: absolute;
    width: 530px;
    height: 530px;
    left: -265px;
    top: -265px;
    border-radius: 50% 50%;
    background-color: #224170;
  }

  .world-globe-doms-container {
    position: absolute;
    left: 50%;
    top: 80%;
    width: 0;
    height: 0;
  }

  .world-globe-halo {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 730px;
    height: 715px;
    margin-left: -368px;
    margin-top: -350px;
  }
`;

const CoverageSlide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

type CoverageSectionProps = {
  coverage_space_image: any;
  coverage_items_data: { text: string }[];
};

const CoverageSection: React.FC<CoverageSectionProps> = ({ coverage_space_image, coverage_items_data }) => {
  useEffect(() => {
    const appendGlobeScript = () => {
      const globeScript = document.createElement("script");
      globeScript.setAttribute("src", `${window.location.origin}/dumb-globe.js`);
      globeScript.setAttribute("type", "text/javascript");
      document.querySelector("head").append(globeScript);
    };

    appendGlobeScript();
  }, []);

  return (
    <CoverageSectionContainer>
      <Container>
        <CoverageContent bgImage={coverage_space_image.file.publicURL}>
          <CoverageContentBlock>
            <WorldContainer className="world-container">
              <div className="world">
                <div className="world-globe">
                  <div className="world-globe-pole"></div>
                  <div className="world-globe-doms-container"></div>
                  <div className="world-globe-halo"></div>
                </div>
              </div>
            </WorldContainer>
          </CoverageContentBlock>
          <CoverageContentTextBlock>
            <CarouselProvider
              naturalSlideWidth={0}
              naturalSlideHeight={0}
              isIntrinsicHeight={true}
              totalSlides={coverage_items_data.length}
              visibleSlides={1}
              isPlaying={true}
            >
              <Slider classNameAnimation="fade-animation">
                {coverage_items_data.map((item, idx) => (
                  <Slide key={`coverage_item_${idx + 1}`} index={idx} classNameHidden="hide" classNameVisible="show">
                    <CoverageSlide>
                      <Title color="dt_white" size={1}>
                        <Translate path={item.text} />
                      </Title>
                    </CoverageSlide>
                  </Slide>
                ))}
              </Slider>
              <Space size="xl" />
              <DotGroup />
            </CarouselProvider>
          </CoverageContentTextBlock>
        </CoverageContent>
      </Container>
    </CoverageSectionContainer>
  );
};

export default CoverageSection;
