import React, { useState, useEffect, useContext } from "react";
import Container from "@src/components/Container";
import {
  Space,
  Action,
  DetailAction,
  BodyText,
  Heading,
  Title,
  DetailHeading,
  theme,
} from "@src/components/nessie-web";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";
import window from "global/window";
import { graphql, useStaticQuery } from "gatsby";

const {
  colors: { dt_taro10, dt_taro20, dt_taro30, dt_taro40, dt_taro50, dt_taro90, dt_aqua50, dt_white },
  radii: { dt_radius_m },
  shadows: { dt_shadow_shadezies },
} = theme;

const FeedbacksSectionContainer = styled.section<{ colored_mode: boolean; horizontal_mode: boolean }>`
  padding-bottom: 54px;
  background: ${(props) =>
    props.colored_mode && !props.horizontal_mode
      ? dt_taro10
      : !props.horizontal_mode
      ? 'url("https://static.classdojo.com/img/schoolleader/highlight_aplus.svg") no-repeat 3% 0% / 45px'
      : "transparent"};

  ${mediaQueries[0]} {
    background: ${(props) =>
      props.colored_mode && !props.horizontal_mode
        ? dt_taro10
        : !props.horizontal_mode
        ? 'url("https://static.classdojo.com/img/schoolleader/highlight_aplus.svg") no-repeat 94% 96% / 45px'
        : "transparent"};
  }

  ${mediaQueries[1]} {
    padding-bottom: 108px;
  }

  .carousel {
    position: relative;
    padding-bottom: 72px;
    ${mediaQueries[0]} {
      padding-bottom: unset;
    }
  }
  .carousel__back-button,
  .carousel__next-button {
    width: 60px;
    height: 48px;
    background: ${(props) => (props.colored_mode ? dt_taro20 : dt_taro10)};
    border-radius: 24px;
    border: none;
    margin: 24px auto 0;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;

    ${mediaQueries[0]} {
      width: 72px;
      height: 60px;
      border-radius: 30px;
      position: absolute;
      top: 50%;
      margin: 0;
    }

    img {
      width: 20px;
      height: 20px;
    }

    &[disabled] {
      background: none;
    }
  }

  .carousel__back-button {
    left: 50%;
    transform: translateX(calc(-50% - 39px));

    ${mediaQueries[0]} {
      left: 0;
      transform: translateY(-50%);
    }

    img {
      transform: rotate(180deg);
    }
  }

  .carousel__next-button {
    left: 50%;
    transform: translateX(calc(-50% + 39px));

    ${mediaQueries[0]} {
      transform: translateY(-50%);
      right: 0;
      left: unset;
    }
  }

  .carousel__slider-tray {
    padding-bottom: 6px;
  }
`;

const FeedbacksContent = styled.div<{ colored_mode: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 54px;
  padding-top: 54px;

  ${mediaQueries[0]} {
    border-top: ${(props) => (props.colored_mode ? "none" : `3px solid ${dt_taro30}`)};
    padding-top: 108px;
  }

  ${mediaQueries[1]} {
    flex-direction: row;
  }
`;

const FeedbacksContentBlock = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  ${mediaQueries[1]} {
    width: 50%;
  }
`;

const FeedbacksNumbersWrapper = styled.div<{ horizontal_mode: boolean }>`
  width: fit-content;
  max-width: ${(props) => (props.horizontal_mode ? "auto" : "425px")};
  display: flex;
  flex-direction: ${(props) => (props.horizontal_mode ? "row" : "column")};
  align-items: center;
  padding: 0 15px;
  margin: auto;
  ${(props) => (props.horizontal_mode ? "gap: 12px;" : "")}

  ${mediaQueries[1]} {
    margin: 0;
    max-width: ${(props) => (props.horizontal_mode ? "550px" : "425px")};
    ${(props) => (props.horizontal_mode ? "gap: 18px;" : "")}
  }
`;

const CarouselWrapper = styled.div`
  ${mediaQueries[0]} {
    width: calc(100% - 160px);
    margin: auto;
  }
`;

const FeedbacksTitle = styled(Title)`
  font-weight: 800;
  font-size: 30px;
  line-height: 36px;
  text-align: center;
  margin: 0 auto 30px;
  max-width: 340px;
  width: fit-content;

  ${mediaQueries[1]} {
    font-size: 50px;
    line-height: 100%;
    letter-spacing: -0.5px;
    max-width: unset;
  }

  ${mediaQueries[1]} {
    margin: 0;
    text-align: left;
    max-width: 450px;
  }
`;

const FeedbacksNumbers = styled.h3<{ horizontal_mode: boolean }>`
  font-weight: 800;
  font-size: ${(props) => (props.horizontal_mode ? "35px" : "70px")};
  line-height: ${(props) => (props.horizontal_mode ? "42px" : "100%")};
  text-align: center;
  letter-spacing: -0.5px;
  color: ${(props) => (props.horizontal_mode ? dt_taro50 : dt_aqua50)};
  width: fit-content;
  margin: 0;

  ${mediaQueries[1]} {
    font-weight: 800;
    font-size: ${(props) => (props.horizontal_mode ? "69px" : "90px")};
    line-height: 100%;
    letter-spacing: -0.5px;
  }
`;

const FeedbackText = styled(Heading)<{ horizontal_mode: boolean }>`
  font-size: ${(props) => (props.horizontal_mode ? "15px" : "18px")};
  line-height: ${(props) => (props.horizontal_mode ? "18px" : "22px")};
  text-align: ${(props) => (props.horizontal_mode ? "left" : "center")};
  color: ${dt_taro50};

  ${mediaQueries[1]} {
    font-weight: ${(props) => (props.horizontal_mode ? "700" : "800")};
    font-size: ${(props) => (props.horizontal_mode ? "18px" : "24px")};
    line-height: ${(props) => (props.horizontal_mode ? "24px" : "30px")};
  }
`;

const UserAvatar = styled.img`
  width: 78px;
  height: 78px;
  border-radius: 39px;
  border: 2px solid ${dt_taro30};
  margin-right: 18px;
`;

const UserSlide = styled.div<{ colored_mode: boolean; horizontal_mode: boolean }>`
  border-radius: ${dt_radius_m};
  border: ${(props) => (props.horizontal_mode ? `2px solid ${dt_taro30}` : "none")};
  background-color: ${(props) => (props.colored_mode ? dt_white : dt_taro10)};
  box-shadow: ${dt_shadow_shadezies};
  padding: 24px;
  height: 100%;
  margin: 0 15px;

  ${mediaQueries[2]} {
    padding: 54px;
  }
`;

const UserQuote = styled(BodyText)`
  strong {
    font-weight: inherit;
    color: ${dt_aqua50};
  }
`;

const User = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

type FeedbacksSectionProps = {
  feedbacks_title: string;
  feedbacks_numbers: string;
  feedbacks_text: string;
  feedbacks_text_source: string;
  content: {
    avatar_url: string;
    username: string;
    userrole: string;
    text: string;
  }[];
  colored_mode: boolean;
  translationPath: string;
  back_slide_button_alt: string;
  foward_slide_button_alt: string;
  horizontal_mode?: boolean;
};

const FeedbacksSection: React.FC<FeedbacksSectionProps> = ({
  feedbacks_title,
  feedbacks_numbers,
  feedbacks_text,
  feedbacks_text_source,
  content,
  colored_mode,
  translationPath,
  back_slide_button_alt,
  foward_slide_button_alt,
  horizontal_mode = false,
}) => {
  const data = useStaticQuery(graphql`
    query {
      directus {
        common_data_schools {
          feedbacks_caret_image_url
        }
      }
    }
  `);

  const {
    directus: {
      common_data_schools: { feedbacks_caret_image_url },
    },
  } = data;
  const t = useContext(TranslationContext);

  let screenWidth = window.innerWidth;
  const [visibleSlides, setVisibleSlides] = useState(0);

  const refreshVisibleSlides = () => {
    if (screenWidth <= 992) {
      setVisibleSlides(1);
    } else {
      setVisibleSlides(2);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      screenWidth = window.innerWidth;
      refreshVisibleSlides();
    });

    refreshVisibleSlides();
  }, []);
  return (
    <FeedbacksSectionContainer colored_mode={colored_mode} horizontal_mode={horizontal_mode}>
      <Container>
        <FeedbacksContent colored_mode={colored_mode}>
          <FeedbacksContentBlock>
            <FeedbacksTitle>{t.translate(feedbacks_title)}</FeedbacksTitle>
          </FeedbacksContentBlock>

          <FeedbacksContentBlock>
            <FeedbacksNumbersWrapper horizontal_mode={horizontal_mode}>
              <FeedbacksNumbers horizontal_mode={horizontal_mode}>{t.translate(feedbacks_numbers)}</FeedbacksNumbers>
              <Space size="m" />
              <FeedbackText horizontal_mode={horizontal_mode}>{t.translate(feedbacks_text)}</FeedbackText>
              <Space size="m" />
              <DetailHeading color={dt_taro40} textAlign="center">
                {t.translate(feedbacks_text_source)}
              </DetailHeading>
            </FeedbacksNumbersWrapper>
          </FeedbacksContentBlock>
        </FeedbacksContent>
        <CarouselProvider
          naturalSlideWidth={0}
          naturalSlideHeight={0}
          isIntrinsicHeight={true}
          totalSlides={content.length}
          visibleSlides={visibleSlides}
        >
          <CarouselWrapper>
            <Slider>
              {content.map((feedback, index) => (
                <Slide key={index} index={index}>
                  <UserSlide colored_mode={colored_mode} horizontal_mode={horizontal_mode}>
                    <UserQuote>{t.translate(`${translationPath}text_${index + 1}`)} </UserQuote>
                    <Space size="l" />
                    <User>
                      <UserAvatar src={feedback.avatar_url} alt="" />

                      <div>
                        <Action color={dt_taro90}>{t.translate(`${translationPath}username_${index + 1}`)}</Action>
                        <DetailAction color={dt_taro50}>
                          {t.translate(`${translationPath}userrole_${index + 1}`)}
                        </DetailAction>
                      </div>
                    </User>
                  </UserSlide>
                </Slide>
              ))}
            </Slider>
          </CarouselWrapper>
          <ButtonBack>
            <img src={feedbacks_caret_image_url} alt={t.translate(back_slide_button_alt) as string} />
          </ButtonBack>
          <ButtonNext>
            <img src={feedbacks_caret_image_url} alt={t.translate(foward_slide_button_alt) as string} />
          </ButtonNext>
        </CarouselProvider>
      </Container>
    </FeedbacksSectionContainer>
  );
};

export default FeedbacksSection;
