import React, { useState, useRef } from "react";
import Slider from "react-slick";
import styled from "@emotion/styled";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Translate from "@src/components/translation/Translate";
import { Link, graphql, useStaticQuery } from "gatsby";
import Container from "@src/components/Container";
import ToolkitIcons from "./ToolkitIcons";
import { getRelativePath } from "@src/utils/routes";
import { mediaQueriesMax } from "@src/styles/theme";
import { Headline1, Subheading } from "./shared";

const HeadingContainer = styled(Container)`
  margin-bottom: 50px;
  h2 {
    display: flex;
    flex-direction: row;
    gap: 16px;
    justify-content: center;
    align-items: center;
    margin-bottom: 32px;
  }
`;

const ArrowLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: #000;
  font-feature-settings: "clig" off, "liga" off;
  font-family: "DojoText";
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 23px;
  margin-top: 24px;
`;

const DotsContainer = styled.div`
  // width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
  scroll-snap-type: x mandatory;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 16px;
  padding-inline: 24px;
  padding-bottom: 20px;
  ${mediaQueriesMax[1]} {
    justify-content: flex-start;
  }
  button {
    scroll-snap-align: left;
    background: transparent;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    border-radius: 42px;
    border: none;
    &.active {
      svg path {
        fill: #ffffff;
      }
      div.group {
        background-color: #f04f59;
      }
      div.random {
        background-color: #269f62;
      }
      div.timer {
        background-color: #3a7fe7;
      }
      div.noise-meter {
        background-color: #8047ff;
      }
      div.today {
        background-color: #ffb800;
      }
      div.list {
        background-color: #f86dc0;
      }
      span {
        color: #2c2a50;
        &:after {
          content: "";
          display: block;
          position: absolute;
          bottom: -14px;
          left: -6px;
          right: -6px;
          height: 4px;
          border-radius: 2px;
          background-color: #5d5d8f;
        }
      }
    }
    div {
      border-radius: 24px;
      padding: 16px;
      background: #fff;
      box-shadow: 0px -1.114px 1.114px 0px rgba(0, 0, 0, 0.1) inset, 0px 0.557px 0px 0px #ebebeb,
        0px 1.114px 1.114px 0px rgba(83, 88, 135, 0.3);
    }
    span {
      display: block;
      color: var(--taro-50-p, #8689b8);
      text-align: center;
      font-size: 12.419px;
      font-style: normal;
      font-weight: 700;
      line-height: 120%; /* 14.903px */
      position: relative;
    }
  }
`;

const CarouselContainer = styled.div``;

const CarouselItem = styled.div`
  gap: 30px;
  border-radius: 24px;
  display: flex !important;
  flex-direction: column;
  align-items: center;
  padding-inline: 24px;
  img {
    width: 100%;
    max-width: 650px;
  }
  p {
    color: var(--Light-Content-Primary, #2c2a50);
    text-align: center;
    font-feature-settings: "clig" off, "liga" off;
    max-width: 650px;

    /* Marketing/Headers/Headline 2 */
    font-family: "DojoText";
    font-size: 23px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%; /* 27.6px */
    letter-spacing: -0.1px;
  }
`;

const ToolkitCarousel = () => {
  const data = useStaticQuery(graphql`
    {
      directus {
        page_homepage_2024 {
          toolkit_carousel {
            id
            description
            tool_name
            icon_name
            feature_illustration_image {
              filename_disk
            }
          }
        }
      }
      arrow: file(relativePath: { eq: "index-2024/sketchy-arrow.png" }) {
        publicURL
      }
    }
  `);

  const {
    arrow,
    directus: {
      page_homepage_2024: { toolkit_carousel },
    },
  } = data;

  const items = toolkit_carousel.map((item) => ({
    label: item.tool_name,
    icon: item.icon_name,
    content: item.description,
    image: `https://static.classdojo.com/uploads/${item.feature_illustration_image.filename_disk}`,
  }));

  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    sliderRef.current.slickGoTo(index);
  };

  return (
    <>
      <HeadingContainer css={{ textAlign: "center", maxWidth: 800 }}>
        <Headline1>
          <Translate path="directus.page_homepage_2024.delightful_tools_headline" />
        </Headline1>
        <Subheading>
          <Translate path="directus.page_homepage_2024.delightful_tools_subheadline" />
        </Subheading>
      </HeadingContainer>

      <CarouselContainer>
        <DotsContainer>
          {items.map((item, index) => (
            <button key={index} className={index === currentSlide ? "active" : ""} onClick={() => goToSlide(index)}>
              <div className={item.icon}>
                <ToolkitIcons type={item.icon} />
              </div>
              <span>{item.label}</span>
            </button>
          ))}
        </DotsContainer>
        <Slider ref={sliderRef} {...settings}>
          {items.map((item, index) => (
            <CarouselItem key={index}>
              <img src={item.image} alt={item.label} loading="lazy" />
              <p>{item.content}</p>
            </CarouselItem>
          ))}
        </Slider>
      </CarouselContainer>
      <ArrowLink to={getRelativePath("/toolkit")} css={{ marginBottom: 100 }}>
        See all tools
        <svg width="36" height="23" viewBox="0 0 36 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1.5 9.80005C0.671573 9.80005 0 10.4716 0 11.3C0 12.1285 0.671573 12.8 1.5 12.8V9.80005ZM35.5607 12.3607C36.1464 11.7749 36.1464 10.8252 35.5607 10.2394L26.0147 0.693447C25.4289 0.10766 24.4792 0.10766 23.8934 0.693447C23.3076 1.27923 23.3076 2.22898 23.8934 2.81477L32.3787 11.3L23.8934 19.7853C23.3076 20.3711 23.3076 21.3209 23.8934 21.9067C24.4792 22.4924 25.4289 22.4924 26.0147 21.9067L35.5607 12.3607ZM1.5 12.8H34.5V9.80005H1.5V12.8Z"
            fill="#8047FF"
          />
        </svg>
      </ArrowLink>
    </>
  );
};

export default ToolkitCarousel;
