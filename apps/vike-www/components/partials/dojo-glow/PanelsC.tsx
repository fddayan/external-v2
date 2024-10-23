import React, { useRef } from "react";
import { Flex } from "@src/components/Boxes";
import { PanelsC_Main } from "./PanelsC_Main";
import { PanelsC_PanelLeftBottom } from "./PanelsC_PanelLeftBottom";
import { PanelsC_PanelLeftTop } from "./PanelsC_PanelLeftTop";
import { PanelsC_PanelRightBottom } from "./PanelsC_PanelRightBottom";
import { PanelsC_PanelRightTop } from "./PanelsC_PanelRightTop";
import styled from "@emotion/styled";
import { mediaQueriesMax } from "@src/styles/theme";
import Slider, { Settings } from "react-slick";
import isMobile from "@src/utils/isMobile";
import { css } from "@emotion/react";
import { ChevronRightIcon, ChevronLeftIcon } from "../../nessie-web";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 60px;
  ${mediaQueriesMax[1]} {
    display: block;
  }
`;

const sliderStyle = css`
  overflow: hidden;

  .slick-slide {
    padding: 0 10px; /* Adjust the value to the desired spacing */
    height: 500px;
  }

  .slick-slide > div > div {
    height: 500px;
  }

  .slick-list {
    margin: 0 -10px; /* This compensates for the margin on the slides */
    height: 500px;
  }
`;

const Arrow = styled.button`
  border-radius: 64px;
  background: var(--Brand-Colors-Plus-Brand, #8047ff);
  width: 52px;
  height: 52px;
  padding: 6px;
  filter: drop-shadow(0px 3.523px 3.523px rgba(83, 88, 135, 0.3));
  border: none;
  cursor: pointer;
`;

const MobilePanel = styled(Flex)`
  display: none;
  ${mediaQueriesMax[1]} {
    display: flex;
  }
`;

const DesktopPanel = styled(Flex)`
  ${mediaQueriesMax[1]} {
    display: none;
  }
`;

export const PanelsC = () => {
  const sliderRef = useRef(null);
  // const isMobileDevice = isMobile().any;
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <Flex flexDirection="column" gap={60}>
      <PanelsC_Main />
      <DesktopPanel flexDirection="column">
        <Grid>
          <PanelsC_PanelLeftTop />
          <PanelsC_PanelRightTop />
          <PanelsC_PanelLeftBottom />
          <PanelsC_PanelRightBottom />
        </Grid>
      </DesktopPanel>
      <MobilePanel flexDirection="column">
        <Slider {...settings} css={sliderStyle} ref={sliderRef}>
          <PanelsC_PanelLeftTop />
          <PanelsC_PanelRightTop />
          <PanelsC_PanelLeftBottom />
          <PanelsC_PanelRightBottom />
        </Slider>
        <div style={{ display: "flex", flexDirection: "row", gap: 12, justifyContent: "center", paddingBlock: 24 }}>
          <Arrow onClick={previous}>
            <ChevronLeftIcon color="white" />
          </Arrow>
          <Arrow onClick={next}>
            <ChevronRightIcon color="white" />
          </Arrow>
        </div>
      </MobilePanel>
    </Flex>
  );
};
