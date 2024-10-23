import React, { useRef } from "react";
import Slider from "react-slick";
import styled from "@emotion/styled";
import Translate from "../translation/Translate";
import { mediaQueriesMax } from "@src/styles/theme";
import { ChevronRightIcon, ChevronLeftIcon } from "../nessie-web";
import { flexShrink } from "styled-system";

const sliderData = [
  {
    imgSrc: "https://static.classdojo.com/uploads/e8cda514-df17-4930-8928-83518fe985f8.png",
    subTitlePath: "directus.whats_new_school_leader_slider_2.sub_title",
    titlePath: "directus.whats_new_school_leader_slider_2.title",
    paragraphPath: "directus.whats_new_school_leader_slider_2.paragraph",
    imgAlt: "",
    imgUrl: "https://static.classdojo.com/uploads/27a541db-ba79-4dec-af43-c9e61157e612.png",
    imgWidth: 250,
  },
  {
    imgSrc: "https://static.classdojo.com/uploads/124b7d21-8e07-44bf-a257-80ff3257bb02.png",
    subTitlePath: "directus.whats_new_school_leader_slider_3.sub_title",
    titlePath: "directus.whats_new_school_leader_slider_3.title",
    paragraphPath: "directus.whats_new_school_leader_slider_3.paragraph",
    imgAlt: "placeholder",
    imgUrl: "https://static.classdojo.com/uploads/fc15bc98-2bb6-4ee3-af4d-dc4a22006b10.png",
    imgWidth: 250,
  },
  {
    imgSrc: "https://static.classdojo.com/uploads/22734af0-59ac-4f86-8f20-cc2caa561021.png",
    subTitlePath: "directus.whats_new_school_leader_slider_4.sub_title",
    titlePath: "directus.whats_new_school_leader_slider_4.title",
    paragraphPath: "directus.whats_new_school_leader_slider_4.paragraph",
    imgAlt: "",
    imgUrl: "https://static.classdojo.com/uploads/55b4d7e2-1816-4f51-b795-250638d8b2a8.png",
    imgWidth: 250,
  },
  {
    imgSrc: "https://static.classdojo.com/uploads/c0fb7fb5-ef37-4c82-ab6d-324c8e7a7825.png",
    subTitlePath: "directus.whats_new_school_leader_slider_5.sub_title",
    titlePath: "directus.whats_new_school_leader_slider_5.title",
    paragraphPath: "directus.whats_new_school_leader_slider_5.paragraph",
    imgAlt: "",
    imgUrl: "https://static.classdojo.com/uploads/163a0ebb-458c-48ca-bc99-c9f4c7728fcf.png",
    imgWidth: 250,
  },
];

const SliderContainer = styled.div`
  display: none;
  overflow: hidden;
  margin-left: -15px;
  margin-right: -15px;
  ${mediaQueriesMax[1]} {
    display: block;
  }
`;

const SliderItem = styled.div`
  background-color: #f2f4ff;
  padding: 30px;
  padding-bottom: 0;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  min-height: 550px;
  color: #2c2a50;
  gap: 12px;

  span {
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%; /* 14.4px */
    letter-spacing: 0.7px;
    text-transform: uppercase;
    color: #2c2a50;
  }
  h3 {
    font-feature-settings: "clig" off, "liga" off;
    font-family: "DojoDisplay";
    font-size: 23px;
    font-style: normal;
    font-weight: 800;
    line-height: 120%; /* 27.6px */
    letter-spacing: -0.3px;
    color: #2c2a50;
    margin: 0;
  }
  p {
    /* Marketing/Body/Minutiae */
    font-family: "DojoText";
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 110%; /* 13.2px */
    letter-spacing: 0.2px;
    color: #2c2a50;
    margin: 0;
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

const MobileSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "20px",
  };
  const sliderRef = useRef(null);

  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <SliderContainer>
      <Slider ref={sliderRef} {...settings}>
        {sliderData.map((item, index) => (
          <div css={{ paddingInline: 12 }} key={index}>
            <SliderItem>
              <div css={{ display: "flex", flexDirection: "column", flexGrow: 1, gap: 12 }}>
                <img src={item.imgSrc} alt={item.imgAlt} width={45} />
                <span>
                  <Translate path={item.subTitlePath} />
                </span>
                <h3>
                  <Translate path={item.titlePath} />
                </h3>
                <p>
                  <Translate path={item.paragraphPath} />
                </p>
              </div>
              <div css={{ height: 300, overflow: "hidden", flexShrink: 1 }}>
                <img src={item.imgUrl} alt={item.imgAlt} width={item.imgWidth} css={{ margin: "auto" }} />
              </div>
            </SliderItem>
          </div>
        ))}
      </Slider>
      <div style={{ display: "flex", flexDirection: "row", gap: 12, justifyContent: "center", paddingBlock: 24 }}>
        <Arrow onClick={previous}>
          <ChevronLeftIcon color="white" />
        </Arrow>
        <Arrow onClick={next}>
          <ChevronRightIcon color="white" />
        </Arrow>
      </div>
    </SliderContainer>
  );
};

export default MobileSlider;
