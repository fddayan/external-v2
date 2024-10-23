import React, { useState, useRef } from "react";
import Slider from "react-slick";
import styled from "@emotion/styled";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Typography } from "@src/components/new-nessie/Typography2";
import Container from "@src/components/Container";
import { graphql, useStaticQuery } from "gatsby";
import Translate from "@src/components/translation/Translate";
import { mediaQueriesMax } from "@src/styles/theme";
import { BlackButton } from "./styles";
import { logEvent } from "@src/utils/logClient";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";

const Heading = styled.h2`
  display: flex;
  flex-direction: row;
  gap: 16px;
  justify-content: center;
  align-items: center;
  margin-block: 80px;
  color: var(--Light-Content-Light, #fff);
  text-align: center;
  font-family: "DojoDisplay" !important;
  font-feature-settings: "ss04" on;
  font-size: 92px;
  font-style: normal;
  font-weight: 800;
  line-height: 100%; /* 92px */
  letter-spacing: -0.12px;
  img {
    width: 160px;
  }
  ${mediaQueriesMax[1]} {
    flex-direction: column;
    font-size: 44px;
    line-height: 120%; /* 52.8px */
    letter-spacing: -0.3px;
    margin-block: 40px;
    img {
      width: 60px;
    }
  }
`;

const Subheading = styled.h3`
  color: var(--Light-Content-Light, #fff);
  text-align: center;
  font-family: "DojoDisplay" !important;
  font-feature-settings: "ss04" on;
  font-size: 76px;
  font-style: normal;
  font-weight: 800;
  line-height: 100%; /* 76px */
  letter-spacing: -0.1px;
  span {
    color: var(--Brand-Plus, #8047ff);
    display: block;
  }
  ${mediaQueriesMax[1]} {
    font-size: 35px;
    letter-spacing: -0.3px;
  }
`;

const CarouselContainer = styled.div`
  ${mediaQueriesMax[1]} {
    margin-inline: 24px;
    margin-bottom: 120px;
  }
  .slick-list {
    .slick-track {
      display: flex;
      flex-direction: row;
    }
  }

  .slick-slide {
    transition: transform 0.5s ease-in-out, filter 0.5s ease-in-out;
    opacity: 0.5;
    transform: scale(0.8);
    filter: blur(2px);
  }

  .slick-slide:nth-of-type(2n) {
    transform: rotate(-5deg) scale(0.8);
  }

  .slick-slide:nth-of-type(2n + 1) {
    transform: rotate(5deg) scale(0.8);
  }

  .slick-center {
    opacity: 1;
    transform: scale(1) rotate(0deg) !important;
    filter: blur(0);
  }

  .slick-arrow {
    z-index: 10;
    box-shadow: 0px -1.957px 1.957px 0px rgba(0, 0, 0, 0.1) inset;
    filter: drop-shadow(0px 5.872px 5.872px rgba(83, 88, 135, 0.3)) drop-shadow(0px 1.957px 0px #ebebeb);
    width: 92px;
    height: 92px;
    border-radius: 50%;
    background: #7d40ff !important;
    &.slick-next:before {
      content: url("data:image/svg+xml,%3Csvg%20width%3D%2225%22%20height%3D%2250%22%20viewBox%3D%220%200%2010%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M0.684965%2016.8212C0.399965%2017.1474%200.268714%2017.5787%200.317464%2018.0062C0.366214%2018.4337%200.598715%2018.8237%200.954965%2019.0749C1.20622%2019.2549%201.50246%2019.3412%201.80246%2019.3412C2.25246%2019.3412%202.70997%2019.1462%203.03247%2018.7787L8.94997%2011.9949C9.93997%2010.8624%209.93997%209.15244%208.94997%208.01994L2.98746%201.18369C2.69871%200.849939%202.27871%200.658691%201.83621%200.658691C1.49496%200.658691%201.15747%200.774943%200.887465%200.988693C0.576215%201.23619%200.381213%201.60369%200.343713%202.01994C0.302463%202.46994%200.448715%202.91994%200.741215%203.25744L6.50496%209.86495C6.57621%209.94745%206.57621%2010.0712%206.50496%2010.1499L0.684965%2016.8212Z%22%20fill%3D%22%23FFFFFF%22/%3E%3C/svg%3E");
    }
    &.slick-prev:before {
      content: url("data:image/svg+xml,%3Csvg%20width%3D%2225%22%20height%3D%2250%22%20viewBox%3D%220%200%2010%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M9.31499%203.1779C9.59999%202.85165%209.73124%202.4204%209.68249%201.9929C9.62999%201.5654%209.40124%201.1754%209.04499%200.924146C8.41499%200.477896%207.50375%200.609149%206.96749%201.2204L1.05%208.00415C0.0599951%209.13665%200.0599951%2010.8466%201.05%2011.9791L7.0125%2018.8154C7.30124%2019.1492%207.72124%2019.3404%208.16374%2019.3404C8.50874%2019.3404%208.84249%2019.2241%209.11249%2019.0104C9.42374%2018.7629%209.61874%2018.3954%209.65624%2017.9791C9.69749%2017.5291%209.55125%2017.0792%209.25875%2016.7417L3.495%2010.1342C3.42375%2010.0517%203.42375%209.93165%203.495%209.84915L9.31499%203.1779Z%22%20fill%3D%22%23FFFFFF%22/%3E%3C/svg%3E");
    }
    &:hover {
      background: #fff;
    }
    ${mediaQueriesMax[1]} {
      transform: scale(0.7);
    }
  }
  .slick-prev {
    left: 25px;
  }
  .slick-next {
    right: 25px;
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
`;

const CarouselItem = styled.div`
  background-color: #fff;
  color: var(--Grape-90, #26185b);
  border-radius: 24px;
  padding: 18px;
  width: 400px;
  ${mediaQueriesMax[1]} {
    max-width: 270px;
  }
  > img {
    max-width: 400px;
    width: 100%;
    border-radius: 18px;
    display: block;
  }
  h3 {
    font-size: 23px;
    font-style: normal;
    font-weight: 800;
    line-height: 120%;
    letter-spacing: -0.1px;
    color: var(--Grape-90, #26185b);
    margin-top: 8px;
    ${mediaQueriesMax[1]} {
      font-size: 16px;
    }
  }
  p {
    color: var(--Grape-90, #26185b);
    font-feature-settings: "clig" off, "liga" off;
    font-family: "DojoText";
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 130%;
    letter-spacing: 0.2px;
    ${mediaQueriesMax[1]} {
      font-size: 12px;
    }t
  }
`;

const GridContainer = styled.div`
  display: grid;
  margin-top: 100px;
  gap: 34px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    "a b"
    "c c";

  ${mediaQueriesMax[1]} {
    margin-top: 36px;
    grid-template-columns: 1fr;
    grid-template-areas:
      "a"
      "b"
      "c";
  }
`;

const BottomImages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  .band {
    z-index: 1;
    margin-bottom: -50px;
    width: 500px;
    ${mediaQueriesMax[1]} {
      width: 300px;
    }
  }
`;

const SidekickImage = styled.img`
  width: 260px;
  ${mediaQueriesMax[1]} {
    margin-top: 30px;
    width: 150px;
  }
`;

const Box = styled.div`
  background-color: #f0f0f0; /* Example background color */
  padding: 30px 40px;
  border-radius: 30px;
  text-align: center;
  padding-bottom: 60px;
  img {
    border-radius: 50%;
    width: 64px;
    height: 64px;
    object-fit: cover;
  }
  > div {
    display: flex;
    flex-direction: row;
    text-align: left;
    gap: 12px;
    color: var(--Light-Content-Light, #fff);
    align-items: center;
    strong {
      display: block;
      margin-bottom: 6px;
      font-family: "DojoDisplay" !important;
      font-feature-settings: "ss04" on;
      font-size: 17.822px;
      font-weight: 800;
      line-height: 120%; /* 21.387px */
      letter-spacing: -0.153px;
    }
    p {
      font-size: 8.367px;
      font-style: normal;
      font-weight: 700;
      line-height: 120%; /* 10.04px */
      letter-spacing: 0.356px;
      text-transform: uppercase;
      margin-bottom: 0;
    }
  }
  blockquote {
    color: var(--Light-Content-Light, #fff);
    font-size: 40px;
    font-style: normal;
    font-weight: 800;
    line-height: 110%; /* 44px */
    text-align: left;
    margin-left: 0;
    border: none;
    text-indent: -20px;
    ${mediaQueriesMax[1]} {
      padding: 0;
      font-size: 20px;
      line-height: 120%; /* 24px */
      text-indent: 0;
    }
  }
  h3 {
    display: flex;
    flex-direction: row;
    gap: 6px;
    align-items: center;
    font-style: normal;
    font-weight: 700;
    line-height: 47.114px; /* 37.5% */
    letter-spacing: -0.126px;
    color: #fff;
    big {
      font-size: 125px;
      line-height: 100px;
      ${mediaQueriesMax[1]} {
        font-size: 80px;
        line-height: 64px;
      }
    }
  }
  &.box1 {
    grid-area: a;
    background-image: linear-gradient(179deg, #addaff 1.2%, #6887f3 118.34%);
  }
  &.box2 {
    grid-area: b;
    background-image: linear-gradient(191deg, #b695f9 11.61%, #8047ff 73.66%);
  }
  &.box3 {
    grid-area: c;
    background-image: linear-gradient(345deg, #179eb0 10.8%, #9cf2ce 102.52%);
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    blockquote {
      text-align: center;
      max-width: 840px;
      text-indent: 0;
      padding: 0;
    }
  }
`;

const TeacherCarousel = () => {
  const data = useStaticQuery(graphql`
    query {
      ovalTop: file(relativePath: { eq: "index-2024/oval-top.svg" }) {
        publicURL
      }
      ovalEnding: file(relativePath: { eq: "index-2024/oval-ending.svg" }) {
        publicURL
      }
      sketchyHeart: file(relativePath: { eq: "index-2024/sketchy-heart.png" }) {
        publicURL
      }
      sidekicks: file(relativePath: { eq: "index-2024/sidekicks.svg" }) {
        publicURL
      }
      smallIcons: file(relativePath: { eq: "index-2024/small-icons.svg" }) {
        publicURL
      }
      directus {
        page_homepage_2024 {
          teacher_testimonial_thumb_1 {
            filename_disk
          }
          teacher_testimonial_thumb_2 {
            filename_disk
          }
          testimonial_carousel {
            Teacher_name
            Testimonial
            Photo {
              filename_disk
            }
          }
        }
      }
    }
  `);

  const modalContext = React.useContext(ModalContext);
  const openSignUpModal = () => {
    logEvent({
      eventValue: window.location.href,
      eventName: "web.external_page.homepage-2024.teacher_stats.sign_up",
    });
    modalContext.showModal(ModalType.TeacherSignup);
  };

  const { ovalTop, ovalEnding, sketchyHeart, smallIcons, sidekicks } = data;

  const {
    directus: {
      page_homepage_2024: {
        testimonial_carousel: testimonials,
        teacher_testimonial_thumb_1: { filename_disk: teacherTestimonialThumb1 },
        teacher_testimonial_thumb_2: { filename_disk: teacherTestimonialThumb2 },
      },
    },
  } = data;

  const [autoPlay, setAutoPlay] = useState(true);
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
    autoplaySpeed: 4500,
    variableWidth: true,
  };

  return (
    <div css={{ backgroundImage: "linear-gradient(170deg, #160233 -4.87%, #4A1BAC 133.67%)", position: "relative" }}>
      <img src={ovalTop.publicURL} alt="" width="100%" css={{ display: "block" }} />
      <Heading>
        <Translate path="directus.page_homepage_2024.Teachers_heading" />
        <img src={sketchyHeart.publicURL} alt="" loading="lazy" />
        <span>ClassDojo</span>
      </Heading>

      <CarouselContainer>
        <Slider ref={sliderRef} {...settings}>
          {testimonials.map((item, index) => (
            <CarouselItem key={index}>
              <img
                src={`https://static.classdojo.com/uploads/${item.Photo.filename_disk}`}
                alt={item.Teacher_name}
                loading="lazy"
              />
              <div css={{ marginTop: 12, maxWidth: 400, display: "flex", flexDirection: "column" }}>
                <h3>{item.Teacher_name}</h3>
                <p>{item.Testimonial}</p>
                <img src={smallIcons.publicURL} alt="" css={{ alignSelf: "flex-end" }} loading="lazy" />
              </div>
            </CarouselItem>
          ))}
        </Slider>
      </CarouselContainer>
      <Container css={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "40px" }}>
        <SidekickImage src={sidekicks.publicURL} alt="" />
        <Subheading>
          <Translate path="directus.page_homepage_2024.teachers_subtitle" />
        </Subheading>
        <GridContainer>
          <Box className="box1">
            <div>
              <img src={`https://static.classdojo.com/uploads/${teacherTestimonialThumb1}`} alt="" loading="lazy" />
              <div>
                <strong>
                  <Translate path="directus.page_homepage_2024.teacher_testimonial_name_1" />
                </strong>
                <p>
                  <Translate path="directus.page_homepage_2024.teacher_testimonial_title_1" />
                </p>
              </div>
            </div>

            <blockquote>
              <Translate path="directus.page_homepage_2024.teacher_testimonial_quote_1" />
            </blockquote>
          </Box>
          <Box className="box2">
            <div>
              <img src={`https://static.classdojo.com/uploads/${teacherTestimonialThumb2}`} alt="" loading="lazy" />
              <div>
                <strong>
                  <Translate path="directus.page_homepage_2024.teacher_testimonial_name_2" />
                </strong>
                <p>
                  <Translate path="directus.page_homepage_2024.teacher_testimonial_title_2" />
                </p>
              </div>
            </div>
            <blockquote>
              <Translate path="directus.page_homepage_2024.teacher_testimonial_quote_2" />
            </blockquote>
          </Box>
          <Box className="box3">
            <h3>
              <Translate path="directus.page_homepage_2024.stat_heading" />
            </h3>
            <blockquote>
              <Translate path="directus.page_homepage_2024.stat_quote" />
            </blockquote>
            <BlackButton onClick={openSignUpModal}>Sign up today</BlackButton>
          </Box>
        </GridContainer>
      </Container>
      <BottomImages>
        <img
          src="https://static.classdojo.com/uploads/8fcd0c2e-563b-4d65-a20e-86a01268c616.svg"
          alt=""
          className="band"
          loading="lazy"
        />
        <img src={ovalEnding.publicURL} alt="" css={{ display: "block" }} width="100%" loading="lazy" />
      </BottomImages>
    </div>
  );
};

export default TeacherCarousel;
