import React, { useState, useEffect, useContext } from "react";
import Container from "@src/components/Container";
import { Space, Action, DetailAction, BodyText, Heading, Title, theme } from "@src/components/nessie-web";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";
import window from "global/window";

const {
  colors: { dt_taro10, dt_taro20, dt_taro30, dt_taro50, dt_taro90, dt_aqua50 },
  radii: { dt_radius_m },
  shadows: { dt_shadow_shadezies },
} = theme;

const FeedbackSectionContainer = styled.section`
  padding: 54px 0;
  background: ${dt_taro10};

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
    background: ${dt_taro20};
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
      opacity: 0.5;
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

const FeedbackContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 54px;
  padding-top: 108px;
  align-items: flex-start;

  ${mediaQueries[1]} {
    flex-direction: row;
  }
`;

const FeedbackContentBlock = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  ${mediaQueries[1]} {
    width: 50%;
  }
`;

const FeedbackNumbersWrapper = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
  max-width: 260px;
  margin: auto;

  ${mediaQueries[1]} {
    max-width: 370px;
    margin: 0;
  }
`;

const CarouselWrapper = styled.div`
  ${mediaQueries[0]} {
    width: calc(100% - 160px);
    margin: auto;
  }
`;

const FeedbackTitle = styled(Title)`
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

const FeedbackNumbers = styled.h3`
  font-weight: 800;
  font-size: 70px;
  line-height: 100%;
  text-align: center;
  letter-spacing: -0.5px;
  color: ${dt_aqua50};
  width: fit-content;
  margin: 0;

  ${mediaQueries[1]} {
    font-weight: 800;
    font-size: 90px;
    line-height: 100%;
    letter-spacing: -0.5px;
  }
`;

const FeedbackText = styled(Heading)`
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: ${dt_taro50};

  ${mediaQueries[1]} {
    font-weight: 800;
    font-size: 24px;
    line-height: 30px;
  }
`;

const UserAvatar = styled.img`
  width: 78px;
  height: 78px;
  border-radius: 39px;
  border: 2px solid ${dt_taro30};
  margin-right: 18px;
`;

const UserSlide = styled.div`
  border-radius: ${dt_radius_m};
  background-color: white;
  box-shadow: ${dt_shadow_shadezies};
  padding: 24px;
  height: 100%;
  margin: 0 15px;

  ${mediaQueries[2]} {
    padding: 54px;
  }
`;

const HighlightText = styled.span`
  color: ${dt_aqua50};
`;

const User = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

type FeedbackSectionProps = {
  feedback_title: string;
  feedback_numbers: string;
  feedback_text: string;
  content: {
    avatar_url: string;
    username: string;
    userrole: string;
    text_before: string;
    highlight: string;
    text_after: string;
  }[];
  translationPath: string;
};

const FeedbackSection: React.FC<FeedbackSectionProps> = ({
  feedback_title,
  feedback_numbers,
  feedback_text,
  content,
}) => {
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
    <FeedbackSectionContainer>
      <Container>
        <FeedbackContent>
          <FeedbackContentBlock>
            <FeedbackTitle>{t.translate(feedback_title)}</FeedbackTitle>
          </FeedbackContentBlock>

          <FeedbackContentBlock>
            <FeedbackNumbersWrapper>
              <FeedbackNumbers>{t.translate(feedback_numbers)}</FeedbackNumbers>
              <Space size="m" />
              <FeedbackText>{t.translate(feedback_text)}</FeedbackText>
            </FeedbackNumbersWrapper>
          </FeedbackContentBlock>
        </FeedbackContent>
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
                  <UserSlide>
                    <BodyText>
                      {t.translate(`directus.page_schoolleaders.feedbacks.text_before_${index + 1}`)}{" "}
                      <HighlightText>
                        {t.translate(`directus.page_schoolleaders.feedbacks.highlight_${index + 1}`)}{" "}
                      </HighlightText>
                      {t.translate(`directus.page_schoolleaders.feedbacks.text_after_${index + 1}`)}
                    </BodyText>
                    <Space size="l" />
                    <User>
                      <UserAvatar src={feedback.avatar_url} alt="" />

                      <div>
                        <Action color={dt_taro90}>
                          {t.translate(`directus.page_schoolleaders.feedbacks.username_${index + 1}`)}
                        </Action>
                        <DetailAction color={dt_taro50}>
                          {t.translate(`directus.page_schoolleaders.feedbacks.userrole_${index + 1}`)}
                        </DetailAction>
                      </div>
                    </User>
                  </UserSlide>
                </Slide>
              ))}
            </Slider>
          </CarouselWrapper>
          <ButtonBack>
            <img src="https://static.classdojo.com/img/conundrums/caret.svg" alt="back slider button icon" />
          </ButtonBack>
          <ButtonNext>
            <img src="https://static.classdojo.com/img/conundrums/caret.svg" alt="back slider button icon" />
          </ButtonNext>
        </CarouselProvider>
      </Container>
    </FeedbackSectionContainer>
  );
};

export default FeedbackSection;
