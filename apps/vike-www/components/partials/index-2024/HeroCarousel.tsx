import React, { useState, useRef } from "react";
import Slider from "react-slick";
import styled from "@emotion/styled";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Typography } from "@src/components/new-nessie/Typography2";
import Translate from "@src/components/translation/Translate";
import { graphql, useStaticQuery } from "gatsby";
import Container from "@src/components/Container";
import { Oversized } from "./shared";
import { mediaQueriesMax } from "@src/styles/theme";

const HeadingContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    display: flex;
    flex-direction: row;
    gap: 16px;
    justify-content: center;
    align-items: center;
    margin-bottom: 32px;
  }
`;

const OversizedWithHeart = styled(Oversized)`
  display: flex;
  flex-direction: row;
  gap: 8px;
  color: var(--Black, #2c2a50);
  ${mediaQueriesMax[1]} {
    flex-direction: column !important;
    img {
      transform: rotate(90deg);
      width: 50px;
    }
  }
`;

const Subheading = styled.p`
  max-width: 800px;
  color: var(--Light-Content-Primary, #2c2a50);
  text-align: center;
  font-feature-settings: "clig" off, "liga" off;
  font-family: "DojoText";
  font-size: 24px;
  font-style: normal;
  margin-bottom: 0;
  font-weight: 700;
  line-height: 120%; /* 28.8px */
  letter-spacing: -0.1px;
  ${mediaQueriesMax[1]} {
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%; /* 19.2px */
  }
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-block: 55px;
  gap: 16px;
  flex-wrap: wrap;
  ${mediaQueriesMax[1]} {
    max-width: 300px;
    margin-inline: auto;
    margin-block: 30px;
  }
  button {
    display: flex;
    font-size: 23px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%; /* 27.6px */
    letter-spacing: -0.1px;
    color: var(--Black, #2c2a50);
    padding: var(--M, 18px) var(--L, 24px);
    justify-content: center;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    border-radius: 42px;
    border: none;
    background: var(--Brand-Plus, #d5bfff);
    &.active {
      background: var(--Brand-Plus, #8047ff);
      color: var(--Light-Content-Light, #fff);
    }
    ${mediaQueriesMax[1]} {
      font-size: 15px;
      font-style: normal;
      font-weight: 700;
      line-height: 130%; /* 19.5px */
      letter-spacing: 0.2px;
      padding: 12px;
    }
  }
`;

const Blob = styled.div`
  background-image: url(https://static.classdojo.com/uploads/d0baeca3-aa1a-43d4-b5d3-c13702ef7155.svg);
  width: 120px;
  position: relative;
  height: 120px;
  text-align: center;
  font-size: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 110%;
  img {
    position: absolute;
    width: 62px;
    top: -10px;
    left: -10px;
  }
  big {
    display: block;
    font-size: 23px;
    line-height: 110%;
  }
  ${mediaQueriesMax[1]} {
    display: none;
  }
`;

const CarouselContainer = styled.div`
  margin: auto;
  margin-bottom: 100px;

  ${mediaQueriesMax[1]} {
    margin-bottom: 120px;
  }
  .slick-list {
    .slick-track {
      display: flex;
      flex-direction: row;
    }
  }
  .slick-initialized .slick-slide {
    display: flex;
    > div {
      display: flex;
      flex-direction: column;
    }
  }
  .slick-slide {
    transition: transform 0.5s ease-in-out, filter 0.5s ease-in-out;
    opacity: 0.5;
    transform: scale(0.8);
    filter: blur(2px);
    ${mediaQueriesMax[1]} {
      transform: none;
    }
  }

  .slick-current {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
  }

  .slick-active > div > div {
    box-shadow: 4.175px 20px 15px 0px rgba(53, 43, 91, 0.2);
  }

  .slick-arrow {
    z-index: 10;
    box-shadow: 0px -1.957px 1.957px 0px rgba(0, 0, 0, 0.1) inset;
    filter: drop-shadow(0px 5.872px 5.872px rgba(83, 88, 135, 0.3)) drop-shadow(0px 1.957px 0px #ebebeb);
    width: 92px;
    height: 92px;
    border-radius: 50%;
    background: #fff !important;
    &.slick-next:before {
      content: url("data:image/svg+xml,%3Csvg%20width%3D%2225%22%20height%3D%2250%22%20viewBox%3D%220%200%2010%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M0.684965%2016.8212C0.399965%2017.1474%200.268714%2017.5787%200.317464%2018.0062C0.366214%2018.4337%200.598715%2018.8237%200.954965%2019.0749C1.20622%2019.2549%201.50246%2019.3412%201.80246%2019.3412C2.25246%2019.3412%202.70997%2019.1462%203.03247%2018.7787L8.94997%2011.9949C9.93997%2010.8624%209.93997%209.15244%208.94997%208.01994L2.98746%201.18369C2.69871%200.849939%202.27871%200.658691%201.83621%200.658691C1.49496%200.658691%201.15747%200.774943%200.887465%200.988693C0.576215%201.23619%200.381213%201.60369%200.343713%202.01994C0.302463%202.46994%200.448715%202.91994%200.741215%203.25744L6.50496%209.86495C6.57621%209.94745%206.57621%2010.0712%206.50496%2010.1499L0.684965%2016.8212Z%22%20fill%3D%22%237D40FF%22/%3E%3C/svg%3E");
    }
    &.slick-prev:before {
      content: url("data:image/svg+xml,%3Csvg%20width%3D%2225%22%20height%3D%2250%22%20viewBox%3D%220%200%2010%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M9.31499%203.1779C9.59999%202.85165%209.73124%202.4204%209.68249%201.9929C9.62999%201.5654%209.40124%201.1754%209.04499%200.924146C8.41499%200.477896%207.50375%200.609149%206.96749%201.2204L1.05%208.00415C0.0599951%209.13665%200.0599951%2010.8466%201.05%2011.9791L7.0125%2018.8154C7.30124%2019.1492%207.72124%2019.3404%208.16374%2019.3404C8.50874%2019.3404%208.84249%2019.2241%209.11249%2019.0104C9.42374%2018.7629%209.61874%2018.3954%209.65624%2017.9791C9.69749%2017.5291%209.55125%2017.0792%209.25875%2016.7417L3.495%2010.1342C3.42375%2010.0517%203.42375%209.93165%203.495%209.84915L9.31499%203.1779Z%22%20fill%3D%22%237D40FF%22/%3E%3C/svg%3E");
    }
    &.slick-prev {
      left: 25px;
    }
    &.slick-next {
      right: 25px;
    }
    &:hover {
      background: #fff;
    }
    ${mediaQueriesMax[1]} {
      transform: scale(0.7);
    }
  }
  ${mediaQueriesMax[1]} {
    .slick-prev,
    .slick-next {
      top: auto;
      bottom: -100px;
    }
    .slick-next {
      left: calc(50%) !important;
      right: auto;
    }
    .slick-prev {
      right: calc(50%) !important;
      left: auto !important;
    }
  }
  .slick-dots li {
    width: auto;
    background-color: red !important;
    button {
      font-size: 16px;
      width: auto;
      height: auto;
      color: blue;
      &:before {
        display: none;
      }
    }
  }
`;

const CarouselItem = styled.div`
  gap: 30px;
  color: #fff;
  background-color: #8047ff;
  border-radius: 24px;
  display: flex !important;
  flex-direction: row;
  padding: 12px 48px 0 48px;
  img {
    width: 310px;
  }
  max-width: 800px;
  > div {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  ${mediaQueriesMax[1]} {
    padding: 30px 18px 0 18px;
    max-width: 320px;
    flex-direction: column;
    text-align: center;
    align-items: center;
    gap: 18px;
    margin-right: 24px;
    min-height: 560px;
    margin-bottom: 40px;
    > div {
      flex-grow: 1;
      span {
        display: none;
      }
    }
    img {
      max-width: 200px;
      margin-top: -30px;
    }
  }
  span {
    font-size: 23px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%; /* 27.6px */
    letter-spacing: -0.1px;
    color: #fff;
    margin-top: 52px;
    ${mediaQueriesMax[1]} {
      margin-top: 0;
      font-size: 15px;
      font-style: normal;
      line-height: 130%; /* 19.5px */
      letter-spacing: 0.2px;
    }
  }
  h3 {
    font-family: "DojoDisplay";
    font-feature-settings: "ss04" on;
    margin: 0;
    font-size: 44px;
    font-style: normal;
    font-weight: 800;
    line-height: 110%; /* 48.4px */
    letter-spacing: -0.3px;
    color: #fff;
    ${mediaQueriesMax[1]} {
      font-size: 30px;
      font-style: normal;
      font-weight: 800;
      line-height: 120%; /* 36px */
      letter-spacing: -0.3px;
    }
  }
  p {
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 133.333% */
    letter-spacing: -0.1px;
    margin-top: 6px;
    ${mediaQueriesMax[1]} {
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: 120%; /* 21.6px */
    }
  }
`;

const Carousel = () => {
  const data = useStaticQuery(graphql`
    {
      arrow: file(relativePath: { eq: "index-2024/sketchy-arrow.png" }) {
        publicURL
      }
      directus {
        page_homepage_2024 {
          carousel_cards {
            icon {
              filename_disk
            }
            illustration {
              filename_disk
            }
          }
        }
      }
    }
  `);

  const {
    arrow,
    directus: {
      page_homepage_2024: { carousel_cards },
    },
  } = data;

  const items = carousel_cards.map((item, index) => ({
    label: `directus.homepage_carousel_features_${index + 1}.tag`,
    title: `directus.homepage_carousel_features_${index + 1}.title`,
    content: `directus.homepage_carousel_features_${index + 1}.text`,
    image: `https://static.classdojo.com/uploads/${item.illustration.filename_disk}`,
    icon: `https://static.classdojo.com/uploads/${item.icon.filename_disk}`,
    stat: `directus.homepage_carousel_features_${index + 1}.stat`,
  }));

  const [autoPlay, setAutoPlay] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    centerMode: true,
    centerPadding: "60px",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: autoPlay,
    autoplaySpeed: 3500,
    variableWidth: true,
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    sliderRef.current.slickGoTo(index);
  };

  return (
    <>
      <HeadingContainer css={{ textAlign: "center" }}>
        <OversizedWithHeart>
          <Translate path="directus.page_homepage_2024.features_headline_start" />
          <img src={arrow.publicURL} alt="" width="100px" />
          <Translate path="directus.page_homepage_2024.feature_headline_end" />
        </OversizedWithHeart>
        <Subheading>
          <Translate path="directus.page_homepage_2024.feature_subheading" />
        </Subheading>
      </HeadingContainer>

      <CarouselContainer>
        <DotsContainer>
          {items.map((item, index) => (
            <button key={index} className={index === currentSlide ? "active" : ""} onClick={() => goToSlide(index)}>
              <Translate path={item.label} />
            </button>
          ))}
        </DotsContainer>
        <Slider ref={sliderRef} {...settings}>
          {items.map((item, index) => (
            <CarouselItem key={index}>
              <div>
                <span>
                  <Translate path={item.label} />
                </span>
                <h3>
                  <Translate path={item.title} />
                </h3>
                <p>
                  <Translate path={item.content} />
                </p>
                <Blob>
                  <img src={item.icon} alt="" />
                  <Translate path={item.stat} />
                </Blob>
              </div>
              <img src={item.image} alt={item.label} />
            </CarouselItem>
          ))}
        </Slider>
      </CarouselContainer>
    </>
  );
};

export default Carousel;
