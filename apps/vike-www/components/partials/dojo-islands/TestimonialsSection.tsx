/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@src/components/nessie-web";
import Translate from "@src/components/translation/Translate";
import { useTheme } from "@emotion/react";
import VimeoEmbed from "../VimeoEmbed";
import Container from "@src/components/Container";
import Slider, { Settings } from "react-slick";
import Player from "@vimeo/player";
import styled from "@emotion/styled";
import { logEvent } from "@src/utils/logClient";
import isMobile from "@src/utils/isMobile";

export interface TestimonialsSetcionProps {
  heading: string;
  images: {
    bgTop: string;
    sun: string;
    shrooms: string;
    bgBottom: string;
  };
  testimonials: {
    video: {
      url: string;
      thumb: string;
    };
    quote: string;
    name: string;
    position: string;
  }[];
}

const MuteButton = styled(Button)`
  position: absolute;
  top: 12px;
  right: 35px;
  width: 100px;
  margin-left: auto;
  margin-right: auto;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  padding: 10px;
  span {
    font-size: 15px;
  }
  :hover,
  :focus,
  :active {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const CustomArrow = (props) => {
  const { className, onClick, direction } = props;
  return (
    <div
      className={className}
      onClick={() => {
        onClick();
        logEvent({
          eventName: `web.external_page.dojo_islands.teachers_teachers_testimonial.${direction}.tap`,
        });
      }}
    />
  );
};

const TestimonialsSection: React.FC<TestimonialsSetcionProps> = (props) => {
  const [currentSlide, setCurrentSlide] = useState<number | null>(0);
  const [currentVideo, setCurrentVideo] = useState<number | null>(isMobile().any ? 0 : 1);
  const [muted, setMuted] = useState(true);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const theme = useTheme();
  const sliderRef = useRef<Slider>(null);

  const bgTopCss = {
    height: 140,
    marginBottom: -2,
    backgroundPosition: "center",
    backgroundSize: "cover",
    marginTop: 70,
    "@media (min-width: 992px)": {
      height: 200,
      marginTop: 200,
    },
  };

  const bgCss = {
    paddingTop: 120,
    position: "relative",
    backgroundColor: theme.__new.colors.grape60,
    "@media (min-width: 992px)": {
      paddingTop: 0,
    },
  };

  const bgBottomCss = {
    height: 83,
    marginTop: -2,
    backgroundPosition: "center",
    backgroundSize: "cover",
    marginBottom: 100,
    "@media (min-width: 992px)": {
      height: 135,
      marginBottom: 180,
    },
  };

  const sunCss = {
    position: "absolute",
    width: 225,
    left: -50,
    top: -130,
    "@media (min-width: 992px)": {
      width: 400,
      left: -300,
      top: -320,
    },
  };

  const shroomsCss = {
    position: "absolute",
    width: 320,
    right: -125,
    bottom: -156,
    "@media (min-width: 992px)": {
      width: 430,
      right: -66,
      bottom: -294,
    },
  };

  const headingCss = {
    ...theme.__new.typography.Display4ExtraBold,
    color: "white",
    textAlign: "center",
    marginBottom: 36,
    "@media (min-width: 768px)": {
      ...theme.__new.typography.Display0ExtraBold,
      marginBottom: 42,
      color: "white",
      marginTop: 0,
    },
  };

  const cardCss = {
    borderRadius: 24,
    minWidth: 259,
    minHeight: 520,
    overflow: "hidden",
    display: "flex!important",
    flexDirection: "column",
    margin: "0 6px 100px",
    position: "relative",

    "& .videoContainer": {
      backgroundColor: "black",
      position: "relative",
      paddingBottom: "85.25%",
    },

    "& .videoContainer span": {
      position: "absolute",
      left: 24,
      bottom: 12,
    },

    "& .cardContent": {
      background: "white",
      padding: 24,
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
    },

    "& .quote": {
      ...theme.__new.typography.Headline2ExtraBold,
      marginBottom: 18,
      flexGrow: 1,
    },

    "& .name": {
      ...theme.__new.typography.Headline3Bold,
      marginBottom: 6,
    },

    "& .position": {
      ...theme.__new.typography.overline,
    },

    "@media (min-width: 992px)": {
      margin: "0 20px",

      "& .cardContent": {
        padding: 36,
      },
    },
  };

  const sliderCss = {
    "& .slick-arrow": {
      zIndex: "10",
      width: "52px",
      height: "52px",
      borderRadius: "50%",
    },

    "& .slick-next:before": {
      content:
        'url("data:image/svg+xml,%3Csvg%20width%3D%2212%22%20height%3D%2224%22%20viewBox%3D%220%200%2012%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M2.20397%200.756348C2.64147%200.756348%203.07272%200.937589%203.37897%201.29384L10.854%209.8626C11.979%2011.1501%2011.979%2013.0938%2010.854%2014.3813L3.44146%2022.8813C2.90396%2023.4938%201.97272%2023.6688%201.30397%2023.2001C0.535217%2022.6563%200.422716%2021.5876%201.02897%2020.8938L8.32274%2012.5313C8.52899%2012.2938%208.52899%2011.9438%208.32274%2011.7126L1.09771%203.4376C0.503956%202.75635%200.528976%201.66259%201.23523%201.10009C1.51648%200.86884%201.86022%200.756348%202.20397%200.756348Z%22%20fill%3D%22%23FFFFFF%22/%3E%3C/svg%3E")',
    },

    "& .slick-prev:before": {
      content:
        'url("data:image/svg+xml,%3Csvg%20width%3D%2212%22%20height%3D%2224%22%20viewBox%3D%220%200%2012%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M9.79603%200.451904C9.35853%200.451904%208.92728%200.633145%208.62103%200.989395L1.14602%209.55816C0.0210152%2010.8457%200.0210152%2012.7894%201.14602%2014.0769L8.55854%2022.5769C9.09604%2023.1894%2010.0273%2023.3644%2010.696%2022.8957C11.4648%2022.3519%2011.5773%2021.2832%2010.971%2020.5894L3.67726%2012.2269C3.47101%2011.9894%203.47101%2011.6394%203.67726%2011.4082L10.9023%203.13316C11.496%202.45191%2011.471%201.35815%2010.7648%200.795647C10.4835%200.564397%2010.1398%200.451904%209.79603%200.451904Z%22%20fill%3D%22%23FFFFFF%22/%3E%3C/svg%3E")',
    },

    "& .slick-prev:before, & .slick-next:before": {
      display: "block",
      transform: "scale(1.5)",
      width: "fit-content",
    },

    "& .slick-next, & .slick-prev": {
      top: "auto",
      bottom: -22,
      position: "absolute",
      display: "flex",
      justifyContent: "center",
    },

    "& .slick-next": {
      left: "calc(50% + 10px)",
      right: "auto",
    },

    "& .slick-prev": {
      right: "calc(50% + 10px)",
      left: "auto",
      justifyItems: "end",
    },

    "@media (min-width: 992px)": {
      "& .slick-slide": {
        opacity: 0.8,
        transform: "scale(0.75)",
        transition: "all ease 0.3s",
      },

      "& .slick-center+.slick-active": {
        opacity: 1,
        transform: "scale(1)",
      },

      "& .slick-prev, & .slick-next": {
        width: 300,
        bottom: "-50%",
        borderRadius: 0,
        display: "grid",
        alignItems: "center",
        height: "100%",
      },

      "& .slick-next": {
        left: "calc(50% + 170px)",
        right: "auto",
        justifyContent: "start",
      },

      "& .slick-prev": {
        right: "calc(50% + 170px)",
        left: "auto",
        justifyContent: "end",
      },
    },
    "@media (min-width: 1200px)": {
      "& .slick-next": {
        left: "calc(50% + 220px)",
      },

      "& .slick-prev": {
        right: "calc(50% + 220px)",
      },
    },
    "@media (min-width: 1500px)": {
      "& .slick-next": {
        left: "calc(50% + 270px)",
      },

      "& .slick-prev": {
        right: "calc(50% + 270px)",
      },
    },
  };

  const playCurrent = useCallback(
    (current: number) => {
      const currentSlideElement = sliderRef.current.innerSlider.list.querySelector(`[data-index="${current}"]`);
      const iframe = currentSlideElement.querySelector("iframe");

      if (currentPlayer) {
        currentPlayer.pause();
      }

      const player = new Player(iframe);

      setCurrentPlayer(player);

      player.setMuted(muted);
      player.play();
    },
    [currentPlayer, muted],
  );

  useEffect(() => {
    const idx = isMobile().any ? currentSlide : currentSlide + 1;
    playCurrent(idx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlayCurrent = async (current: number) => {
    const idx = isMobile().any ? current : current + 1;

    playCurrent(idx);
  };

  const settings: Settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    speed: 500,
    slidesToShow: 3,
    pauseOnHover: true,
    afterChange: (current: number) => {
      setCurrentSlide(current);
      setCurrentVideo(isMobile().any ? current : current >= props.testimonials.length - 1 ? 0 : current + 1);

      handlePlayCurrent(current);
    },
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleOnUnmute = () => {
    setMuted(!muted);
    currentPlayer?.setMuted(!muted);
  };

  return (
    <>
      <div css={bgTopCss} style={{ backgroundImage: `url(${props.images.bgTop})` }} />
      <div css={bgCss}>
        <img css={sunCss} src={props.images.sun} alt="sun" />
        <img css={shroomsCss} src={props.images.shrooms} alt="shrooms" />
        <Container>
          <h1 css={headingCss}>
            <Translate path={props.heading} />
          </h1>
        </Container>
        <div className="slider-container">
          <Slider {...settings} css={sliderCss} ref={(r) => (sliderRef.current = r)}>
            {props.testimonials.map(({ video, quote, name, position }, index) => {
              return (
                <div key={index}>
                  <div css={cardCss}>
                    {currentVideo === index && (
                      <MuteButton onClick={handleOnUnmute}>{muted ? "Unmute" : "Mute"}</MuteButton>
                    )}
                    <div className="videoContainer">
                      <VimeoEmbed url={video.url} autoPause autoPlay={false} />
                    </div>
                    <div className="cardContent">
                      <p className="quote">
                        <Translate path={quote} />
                      </p>
                      <p className="name">
                        <Translate path={name} />
                      </p>
                      <p className="position">
                        <Translate path={position} />
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
      <div css={bgBottomCss} style={{ backgroundImage: `url(${props.images.bgBottom})` }} />
    </>
  );
};

export default TestimonialsSection;
