import React, { useState, useRef } from "react";
import Slider from "react-slick";
import styled from "@emotion/styled";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Translate from "@src/components/translation/Translate";
import { graphql, useStaticQuery } from "gatsby";
import Container from "@src/components/Container";
import { ButtonStyled, Headline1, Paragraph, VStack } from "./styles";
import { mediaQueriesMax } from "@src/styles/theme";
import { Button } from "@src/components/nessie-web";
import { display, position } from "styled-system";

const SliderContainer = styled.div`
  width: 100%;
  margin-top: 78px;
  .slick-slide {
    margin-right: 24px;
  }
  .slick-track {
    display: flex;
    flex-direction: row;
  }
  .slick-list {
    padding-left: calc(50% - 585px);
    width: 100%;
    ${mediaQueriesMax[1]} {
      padding-left: 24px;
    }
  }

  .slick-arrow {
    z-index: 10;
    box-shadow: 0px -1.957px 1.957px 0px rgba(0, 0, 0, 0.1) inset;
    filter: drop-shadow(0px 5.872px 5.872px rgba(83, 88, 135, 0.3)) drop-shadow(0px 1.957px 0px #ebebeb);
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: #fff !important;
    &.slick-next:before {
      content: url("data:image/svg+xml,%3Csvg%20width%3D%2212%22%20height%3D%2224%22%20viewBox%3D%220%200%2012%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M2.20397%200.756348C2.64147%200.756348%203.07272%200.937589%203.37897%201.29384L10.854%209.8626C11.979%2011.1501%2011.979%2013.0938%2010.854%2014.3813L3.44146%2022.8813C2.90396%2023.4938%201.97272%2023.6688%201.30397%2023.2001C0.535217%2022.6563%200.422716%2021.5876%201.02897%2020.8938L8.32274%2012.5313C8.52899%2012.2938%208.52899%2011.9438%208.32274%2011.7126L1.09771%203.4376C0.503956%202.75635%200.528976%201.66259%201.23523%201.10009C1.51648%200.86884%201.86022%200.756348%202.20397%200.756348Z%22%20fill%3D%22%237D40FF%22/%3E%3C/svg%3E");
    }
    &.slick-prev:before {
      content: url("data:image/svg+xml,%3Csvg%20width%3D%2212%22%20height%3D%2224%22%20viewBox%3D%220%200%2012%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M9.79603%200.451904C9.35853%200.451904%208.92728%200.633145%208.62103%200.989395L1.14602%209.55816C0.0210152%2010.8457%200.0210152%2012.7894%201.14602%2014.0769L8.55854%2022.5769C9.09604%2023.1894%2010.0273%2023.3644%2010.696%2022.8957C11.4648%2022.3519%2011.5773%2021.2832%2010.971%2020.5894L3.67726%2012.2269C3.47101%2011.9894%203.47101%2011.6394%203.67726%2011.4082L10.9023%203.13316C11.496%202.45191%2011.471%201.35815%2010.7648%200.795647C10.4835%200.564397%2010.1398%200.451904%209.79603%200.451904Z%22%20fill%3D%22%237D40FF%22/%3E%3C/svg%3E");
    }
    &:hover {
      background: #fff;
    }
  }
  .slick-prev,
  .slick-next {
    top: auto;
    bottom: -100px;
    position: absolute;
  }
  .slick-next {
    left: calc(50% + 10px);
    right: auto;
  }
  .slick-prev {
    right: calc(50% + 10px);
    left: auto;
  }
`;

const CarouselItem = styled.div`
  color: #fff;
  background-color: #8047ff;
  border-radius: 24px;
  display: flex !important;
  flex-direction: column;
  width: 400px;
  height: 250px;
  background-size: cover;
  background-position: center;
  overflow: hidden;
`;
const CarouselContent = styled.div`
  background: linear-gradient(163deg, rgba(83, 73, 105, 0.4) 15.35%, rgba(112, 112, 112, 0) 83.7%);
  background-blend-mode: multiply;
  width: 100%;
  height: 100%;
  padding: 20px;
  h3,
  h2 {
    color: white;
    margin: 0px;
    padding: 0px;
  }
  h2 {
    font-family: "DynaPuff" !important;
  }
  h3 {
    font-size: 17px;
  }
`;

const Background = styled.div`
  background: white;
`;

const PlayIcon = () => {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.16107 1.12763C1.17878 0.980662 1.2313 0.839772 1.31444 0.716185C1.39757 0.592599 1.50903 0.48973 1.63994 0.415772C1.77085 0.341814 1.91758 0.298812 2.06846 0.290189C2.21933 0.281566 2.37018 0.307562 2.50899 0.366106C3.21069 0.659847 4.78326 1.35797 6.77871 2.4857C8.77482 3.61408 10.1789 4.59947 10.7888 5.04655C11.3094 5.42893 11.3107 6.18722 10.7894 6.57089C10.1855 7.01539 8.7986 7.98784 6.77871 9.13045C4.75683 10.2731 3.20277 10.9628 2.50766 11.2526C1.90903 11.503 1.23904 11.1232 1.16107 10.4911C1.06989 9.75222 0.899414 8.07454 0.899414 5.80872C0.899414 3.5442 1.06923 1.86716 1.16107 1.12763Z"
        fill="black"
      />
    </svg>
  );
};

const PlayButton = styled.a`
  // background-color: rgba(13, 38, 68, 0.8);
  background-color: white;
  border: none;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: rgba(13, 38, 68, 1);
  }
  &:hover svg path {
    fill: white;
  }
`;

const SeeMoreVideosButton = styled.a`
  // color: var(--Black, #2c2a50);
  font-feature-settings: "clig" off, "liga" off;
  font-family: "DojoText";
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 23px; /* 127.778% */
  border-radius: 100px;
  // background: var(--White, #fff);
  background: var(--Black, #2c2a50);
  color: white;
  padding: var(--small, 18px);
  align-self: center;
`;

const BigIdeasCarousel = () => {
  const data = useStaticQuery(graphql`
    {
      ovalTop: file(relativePath: { eq: "index-2024/oval-top.svg" }) {
        publicURL
      }
      sketchyBulb: file(relativePath: { eq: "index-2024/bulb.svg" }) {
        publicURL
      }
      sketchyStar: file(relativePath: { eq: "index-2024/stars.svg" }) {
        publicURL
      }
      mojoProfessor: file(relativePath: { eq: "index-2024/Mojo-Professor.svg" }) {
        publicURL
      }
      directus {
        page_homepage_2024 {
          homepage_video_carousel {
            collection_name
            episode_title
            episode_url
            video_episode_image {
              filename_disk
            }
          }
        }
      }
    }
  `);
  const settings2 = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const {
    ovalTop,
    directus: {
      page_homepage_2024: { homepage_video_carousel },
    },
  } = data;

  const items = homepage_video_carousel.map((item) => ({
    collection: item.collection_name,
    title: item.episode_title,
    image: item.video_episode_image
      ? `https://static.classdojo.com/uploads/${item.video_episode_image.filename_disk}`
      : null,
    url: item.episode_url,
  }));

  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: false,
    centerMode: false,
    centerPadding: "60px",
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (current, next) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const SketchyBulbImg = styled.img`
    position: absolute;
    top: 40px;
    left: 0;
    ${mediaQueriesMax[1]} {
      display: none;
    }
  `;

  const SketchyStart = styled.img`
    position: absolute;
    top: 40px;
    right: 0;
    ${mediaQueriesMax[1]} {
      display: none;
    }
  `;

  return (
    <Background>
      <img src={ovalTop.publicURL} alt="" width="100%" css={{ display: "block" }} loading="lazy" />

      <Container css={{ paddingTop: 100, position: "relative" }}>
        <SketchyBulbImg src={data.sketchyBulb.publicURL} alt="" />
        <img
          loading="lazy"
          src={data.mojoProfessor.publicURL}
          alt=""
          css={{ position: "absolute", top: 0, right: "50%", transform: "translate( 50%, -50%)" }}
        />
        <SketchyStart src={data.sketchyStar.publicURL} alt="" />
        <VStack css={{ gap: 80, alignItems: "center" }}>
          <VStack css={{ gap: 20 }}>
            <Headline1 css={{ color: "black" }}>
              <Translate path="directus.page_homepage_2024.video_section_headline" />
            </Headline1>
            <Paragraph css={{ textAlign: "center", color: "black", maxWidth: 600, alignSelf: "center", fontSize: 28 }}>
              <Translate path="directus.page_homepage_2024.video_section_subheadline" />
            </Paragraph>
          </VStack>
        </VStack>
      </Container>

      <SliderContainer>
        <Slider {...settings2}>
          {items.map((item, index) => (
            <CarouselItem
              key={index}
              css={{ backgroundImage: `url(${item.image})`, position: "relative", minWidth: 350 }}
            >
              <CarouselContent css={{ width: 350 }}>
                <h3>{item.collection}</h3>
                <h2>{item.title}</h2>
              </CarouselContent>
              <div
                css={{
                  position: "absolute",
                  bottom: 20,
                  left: 20,
                }}
              >
                <PlayButton href={item.url}>
                  <PlayIcon />
                </PlayButton>
              </div>
            </CarouselItem>
          ))}
        </Slider>
      </SliderContainer>
      <div css={{ paddingTop: 120, paddingBottom: 80, display: "flex" }}>
        <SeeMoreVideosButton href="https://ideas.classdojo.com" css={{ marginInline: "auto" }}>
          <Translate path="directus.page_homepage_2024.video_section_cta" />
        </SeeMoreVideosButton>
      </div>
    </Background>
  );
};

export default BigIdeasCarousel;
