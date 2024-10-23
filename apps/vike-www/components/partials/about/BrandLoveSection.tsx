import React from "react";
import Container from "@src/components/Container";
import { Title, Space, Subheading, DetailText, theme, Button } from "@src/components/nessie-web";
import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";
import Translate from "@src/components/translation/Translate";
import { FaHeart } from "react-icons/fa";
import { logEvent } from "@src/utils/logClient";

const {
  space: { dt_l, dt_xxl },
  colors: { dt_white, dt_taro10, dt_taro30, dt_taro40, dt_taro50 },
  radii: { dt_radius_m },
} = theme;

const BrandLoveSectionContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0;
  position: relative;

  ${mediaQueries[0]} {
    margin-top: 0px;
    background-size: contain;
  }

  &.home-variation {
    &:before {
      content: "";
      background-image: url("data:image/svg+xml,%3Csvg width='1281' height='873' viewBox='0 0 1281 873' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M-0.335938 0C526.33 25.0865 806.775 24.1223 1280.66 0V873C783.793 849.645 503.197 850.195 -0.335937 873L-0.335938 0Z' fill='%23F7F8FF'/%3E%3C/svg%3E%0A");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: top;
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 50%;
      z-index: -1;
    }
    &:after {
      content: "";
      background-image: url("data:image/svg+xml,%3Csvg width='1281' height='873' viewBox='0 0 1281 873' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M-0.335938 0C526.33 25.0865 806.775 24.1223 1280.66 0V873C783.793 849.645 503.197 850.195 -0.335937 873L-0.335938 0Z' fill='%23F7F8FF'/%3E%3C/svg%3E%0A");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: bottom;
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 50%;
      z-index: -1;
    }
  }
`;

const BrandLoveHeader = styled.div`
  text-align: center;
  max-width: 675px;
  margin: 0 auto 54px;
`;

const BrandLoveGrid = styled.div<{ bgColor: boolean }>`
  max-width: 1920px;
  margin: auto;
  overflow: hidden;
  position: relative;

  @media (min-width: 1920px) {
    &:before,
    &:after {
      content: "";
      display: block;
      position: absolute;
      width: 200px;
      height: 100%;
      z-index: 10;
    }

    &:after {
      right: 0;
      top: 0;
      background: ${(props) =>
        props.bgColor
          ? `linear-gradient(270deg, ${dt_taro10} 0%, rgba(255, 255, 255, 0) 100%)`
          : `linear-gradient(270deg, ${dt_white} 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 100%);`};
    }

    &:before {
      background: ${(props) =>
        props.bgColor
          ? `linear-gradient(90deg, ${dt_taro10} 0%, rgba(255, 255, 255, 0) 100%)`
          : `linear-gradient(90deg, ${dt_white} 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 100%);`};
    }
  }
`;

const BrandLoveGridRow = styled.div`
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  width: 100vw;
`;

const SliderTrackOne = styled.div`
  animation: trackSlide 28s linear infinite;
  display: flex;
  width: fit-content;
  align-self: flex-end;

  @keyframes trackSlide {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(50%);
    }
  }

  &:hover {
    animation-play-state: paused;
  }
`;

const SliderTrackTwo = styled.div`
  animation: trackSlideReverse 22s linear infinite;
  display: flex;
  width: fit-content;
  align-self: flex-start;

  @keyframes trackSlideReverse {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  &:hover {
    animation-play-state: paused;
  }
`;

const SliderTrackThree = styled.div`
  animation: trackSlide 20s linear infinite;
  display: flex;
  width: fit-content;
  align-self: flex-end;

  @keyframes trackSlide {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(50%);
    }
  }

  &:hover {
    animation-play-state: paused;
  }
`;

const TweetTile = styled.div<{ width?: number; home_variation?: boolean }>`
  height: 260px;
  width: ${(props) => (props.width ? (props.width > 2 && "450px") || (props.width > 1 && "350px") : "260px")};
  border-radius: ${dt_radius_m};
  padding: ${dt_xxl}px ${dt_l}px;
  margin: 0 10px;
  color: ${dt_taro50};
  ${(props) =>
    props.home_variation ? `box-shadow: 0px 6px 0px rgba(45, 64, 150, 0.06)` : `border: solid 2px ${dt_taro30}`};
  ${(props) => props.home_variation && `background: white;`};
`;

const TweetUser = styled.div`
  width: fit-content;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  transition: height 0.2s ease-in;
  margin-bottom: 12px;
`;

const TweetUserWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TweetUserAvatar = styled.div<{ avatar?: string }>`
  width: 66px;
  height: 66px;
  border-radius: 33px;
  margin-right: 12px;
  background: url("${(props) => props.avatar}") center/cover no-repeat;
`;

const ImageSquareTile = styled.img<{ home_variation?: boolean }>`
  max-width: unset;
  width: 260px;
  height: 260px;
  margin: 0 10px;
  ${(props) =>
    props.home_variation ? `box-shadow: 0px 6px 0px rgba(45, 64, 150, 0.06)` : `border: solid 2px ${dt_taro30}`};
  border-radius: ${dt_radius_m};
  object-fit: cover;
  object-position: top center;
`;

const ResponsiveTitle = styled(Title)`
  font-size: 30px;
  line-height: 100%;
  ${mediaQueries[1]} {
    font-size: 50px;
  }
`;

const ResponsiveSubtitle = styled(Title)`
  font-size: 18px;
  line-height: 1.6rem;
  ${mediaQueries[1]} {
    font-size: 30px;
  }
`;

const logButtonClick = () =>
  logEvent({
    eventName: "web.external_page.see_more_smiles.click",
    eventValue: window.location.href,
  });

type BrandLoveSectionProps = {
  brand_love_title: string;
  brand_love_text: string;
  brand_love_images: any;
  brand_love_tweets: any;
  brand_love_cta_text: string;
  BGColor: boolean;
  three_liner: boolean;
  translate: boolean;
  home_variation?: boolean;
};

const BrandLoveSection: React.FC<BrandLoveSectionProps> = ({
  brand_love_title,
  brand_love_text,
  brand_love_images,
  brand_love_tweets,
  brand_love_cta_text,
  BGColor,
  three_liner,
  translate,
  home_variation,
}) => {
  return (
    <BrandLoveSectionContainer className={home_variation ? "home-variation" : ""}>
      <Container>
        <BrandLoveHeader>
          {home_variation ? (
            <>
              <FaHeart className="glyphicon glyphicon-heart" fill={dt_taro30} fontSize="30px" />
              <ResponsiveTitle size={1}>
                {translate ? <Translate path={brand_love_title} /> : brand_love_title}
              </ResponsiveTitle>
            </>
          ) : (
            <>
              <ResponsiveTitle size={2}>
                {translate ? <Translate path={brand_love_title} /> : brand_love_title}
              </ResponsiveTitle>
              <Space size="l" />
              <ResponsiveSubtitle size={1} color="dt_taro50">
                {translate ? <Translate path={brand_love_text} /> : brand_love_text}
              </ResponsiveSubtitle>
            </>
          )}
        </BrandLoveHeader>
      </Container>
      <BrandLoveGrid bgColor={BGColor}>
        <BrandLoveGridRow>
          <SliderTrackOne>
            <div>
              <ImageSquareTile
                src={brand_love_images[0].image_url}
                alt={brand_love_images[0].alt}
                home_variation={home_variation}
              />
            </div>

            <div>
              <ImageSquareTile
                src={brand_love_images[1].image_url}
                alt={brand_love_images[1].alt}
                home_variation={home_variation}
              />
            </div>

            <div>
              <ImageSquareTile
                src={brand_love_images[2].image_url}
                alt={brand_love_images[2].alt}
                home_variation={home_variation}
              />
            </div>

            <div>
              <TweetTile width={2} home_variation={home_variation}>
                <TweetUser className="tweet-user">
                  <TweetUserWrapper>
                    <TweetUserAvatar avatar={brand_love_tweets[0].avatar} />
                    <div>
                      <Subheading>{brand_love_tweets[0].username}</Subheading>
                      <DetailText color={dt_taro40}>{brand_love_tweets[0].at}</DetailText>
                    </div>
                  </TweetUserWrapper>
                </TweetUser>
                <Translate path="directus.page_careers.brand_love_tweets.text_1" />
              </TweetTile>
            </div>

            <div>
              <ImageSquareTile
                src={brand_love_images[3].image_url}
                alt={brand_love_images[3].alt}
                home_variation={home_variation}
              />
            </div>

            <div>
              <TweetTile width={1} home_variation={home_variation}>
                <TweetUser className="tweet-user">
                  <TweetUserWrapper>
                    <TweetUserAvatar avatar={brand_love_tweets[1].avatar} />
                    <div>
                      <Subheading>{brand_love_tweets[1].username}</Subheading>
                      <DetailText color={dt_taro40}>{brand_love_tweets[1].at}</DetailText>
                    </div>
                  </TweetUserWrapper>
                </TweetUser>
                <Translate path="directus.page_careers.brand_love_tweets.text_2" />
              </TweetTile>
            </div>

            <div>
              <ImageSquareTile
                src={brand_love_images[4].image_url}
                alt={brand_love_images[4].alt}
                home_variation={home_variation}
              />
            </div>

            <div>
              <ImageSquareTile
                src={brand_love_images[0].image_url}
                alt={brand_love_images[0].alt}
                home_variation={home_variation}
              />
            </div>

            <div>
              <ImageSquareTile
                src={brand_love_images[1].image_url}
                alt={brand_love_images[1].alt}
                home_variation={home_variation}
              />
            </div>

            <div>
              <ImageSquareTile
                src={brand_love_images[2].image_url}
                alt={brand_love_images[2].alt}
                home_variation={home_variation}
              />
            </div>

            <div>
              <TweetTile width={2} home_variation={home_variation}>
                <TweetUser className="tweet-user">
                  <TweetUserWrapper>
                    <TweetUserAvatar avatar={brand_love_tweets[0].avatar} />
                    <div>
                      <Subheading>{brand_love_tweets[0].username}</Subheading>
                      <DetailText color={dt_taro40}>{brand_love_tweets[0].at}</DetailText>
                    </div>
                  </TweetUserWrapper>
                </TweetUser>
                <Translate path="directus.page_careers.brand_love_tweets.text_2" />
              </TweetTile>
            </div>

            <div>
              <ImageSquareTile
                src={brand_love_images[3].image_url}
                alt={brand_love_images[3].alt}
                home_variation={home_variation}
              />
            </div>

            <div>
              <TweetTile width={1} home_variation={home_variation}>
                <TweetUser className="tweet-user">
                  <TweetUserWrapper>
                    <TweetUserAvatar avatar={brand_love_tweets[1].avatar} />
                    <div>
                      <Subheading>{brand_love_tweets[1].username}</Subheading>
                      <DetailText color={dt_taro40}>{brand_love_tweets[1].at}</DetailText>
                    </div>
                  </TweetUserWrapper>
                </TweetUser>
                <Translate path="directus.page_careers.brand_love_tweets.text_2" />
              </TweetTile>
            </div>

            <div>
              <ImageSquareTile
                src={brand_love_images[4].image_url}
                alt={brand_love_images[4].alt}
                home_variation={home_variation}
              />
            </div>
          </SliderTrackOne>
        </BrandLoveGridRow>

        <BrandLoveGridRow>
          <SliderTrackTwo>
            <div>
              <TweetTile width={2} home_variation={home_variation}>
                <TweetUser className="tweet-user">
                  <TweetUserWrapper>
                    <TweetUserAvatar avatar={brand_love_tweets[0].avatar} />
                    <div>
                      <Subheading>{brand_love_tweets[0].username}</Subheading>
                      <DetailText color={dt_taro40}>{brand_love_tweets[0].at}</DetailText>
                    </div>
                  </TweetUserWrapper>
                </TweetUser>
                <Translate path="directus.page_careers.brand_love_tweets.text_1" />
              </TweetTile>
            </div>

            <div>
              <ImageSquareTile
                src={brand_love_images[4].image_url}
                alt={brand_love_images[4].alt}
                home_variation={home_variation}
              />
            </div>

            <div>
              <TweetTile width={1} home_variation={home_variation}>
                <TweetUser className="tweet-user">
                  <TweetUserWrapper>
                    <TweetUserAvatar avatar={brand_love_tweets[2].avatar} />
                    <div>
                      <Subheading>{brand_love_tweets[2].username}</Subheading>
                      <DetailText color={dt_taro40}>{brand_love_tweets[2].at}</DetailText>
                    </div>
                  </TweetUserWrapper>
                </TweetUser>
                <Translate path="directus.page_careers.brand_love_tweets.text_3" />
              </TweetTile>
            </div>

            <div>
              <ImageSquareTile
                src={brand_love_images[5].image_url}
                alt={brand_love_images[5].alt}
                home_variation={home_variation}
              />
            </div>

            <div>
              <ImageSquareTile
                src={brand_love_images[6].image_url}
                alt={brand_love_images[6].alt}
                home_variation={home_variation}
              />
            </div>

            <div>
              <TweetTile width={3} home_variation={home_variation}>
                <TweetUser className="tweet-user">
                  <TweetUserWrapper>
                    <TweetUserAvatar avatar={brand_love_tweets[3].avatar} />
                    <div>
                      <Subheading>{brand_love_tweets[3].username}</Subheading>
                      <DetailText color={dt_taro40}>{brand_love_tweets[3].at}</DetailText>
                    </div>
                  </TweetUserWrapper>
                </TweetUser>
                <Translate path="directus.page_careers.brand_love_tweets.text_4" />
              </TweetTile>
            </div>

            <div>
              <ImageSquareTile
                src={brand_love_images[7].image_url}
                alt={brand_love_images[7].alt}
                home_variation={home_variation}
              />
            </div>

            <div>
              <TweetTile width={2} home_variation={home_variation}>
                <TweetUser className="tweet-user">
                  <TweetUserWrapper>
                    <TweetUserAvatar avatar={brand_love_tweets[4].avatar} />
                    <div>
                      <Subheading>{brand_love_tweets[4].username}</Subheading>
                      <DetailText color={dt_taro40}>{brand_love_tweets[4].at}</DetailText>
                    </div>
                  </TweetUserWrapper>
                </TweetUser>
                <Translate path="directus.page_careers.brand_love_tweets.text_5" />
              </TweetTile>
            </div>

            <div>
              <TweetTile width={2} home_variation={home_variation}>
                <TweetUser className="tweet-user">
                  <TweetUserWrapper>
                    <TweetUserAvatar avatar={brand_love_tweets[0].avatar} />
                    <div>
                      <Subheading>{brand_love_tweets[0].username}</Subheading>
                      <DetailText color={dt_taro40}>{brand_love_tweets[0].at}</DetailText>
                    </div>
                  </TweetUserWrapper>
                </TweetUser>
                <Translate path="directus.page_careers.brand_love_tweets.text_1" />
              </TweetTile>
            </div>

            <div>
              <ImageSquareTile
                src={brand_love_images[4].image_url}
                alt={brand_love_images[4].alt}
                home_variation={home_variation}
              />
            </div>

            <div>
              <TweetTile width={1} home_variation={home_variation}>
                <TweetUser className="tweet-user">
                  <TweetUserWrapper>
                    <TweetUserAvatar avatar={brand_love_tweets[2].avatar} />
                    <div>
                      <Subheading>{brand_love_tweets[2].username}</Subheading>
                      <DetailText color={dt_taro40}>{brand_love_tweets[2].at}</DetailText>
                    </div>
                  </TweetUserWrapper>
                </TweetUser>
                <Translate path="directus.page_careers.brand_love_tweets.text_3" />
              </TweetTile>
            </div>

            <div>
              <ImageSquareTile
                src={brand_love_images[5].image_url}
                alt={brand_love_images[5].alt}
                home_variation={home_variation}
              />
            </div>

            <div>
              <ImageSquareTile
                src={brand_love_images[6].image_url}
                alt={brand_love_images[6].alt}
                home_variation={home_variation}
              />
            </div>

            <div>
              <TweetTile width={3} home_variation={home_variation}>
                <TweetUser className="tweet-user">
                  <TweetUserWrapper>
                    <TweetUserAvatar avatar={brand_love_tweets[3].avatar} />
                    <div>
                      <Subheading>{brand_love_tweets[3].username}</Subheading>
                      <DetailText color={dt_taro40}>{brand_love_tweets[3].at}</DetailText>
                    </div>
                  </TweetUserWrapper>
                </TweetUser>
                {brand_love_tweets[3].text}
              </TweetTile>
            </div>

            <div>
              <ImageSquareTile
                src={brand_love_images[7].image_url}
                alt={brand_love_images[7].alt}
                home_variation={home_variation}
              />
            </div>

            <div>
              <TweetTile width={2} home_variation={home_variation}>
                <TweetUser className="tweet-user">
                  <TweetUserWrapper>
                    <TweetUserAvatar avatar={brand_love_tweets[4].avatar} />
                    <div>
                      <Subheading>{brand_love_tweets[4].username}</Subheading>
                      <DetailText color={dt_taro40}>{brand_love_tweets[4].at}</DetailText>
                    </div>
                  </TweetUserWrapper>
                </TweetUser>
                {brand_love_tweets[4].text}
              </TweetTile>
            </div>
          </SliderTrackTwo>
        </BrandLoveGridRow>

        {three_liner && (
          <BrandLoveGridRow>
            <SliderTrackThree>
              <div>
                <ImageSquareTile
                  src={brand_love_images[8].image_url}
                  alt={brand_love_images[8].alt}
                  home_variation={home_variation}
                />
              </div>

              <div>
                <ImageSquareTile
                  src={brand_love_images[9].image_url}
                  alt={brand_love_images[9].alt}
                  home_variation={home_variation}
                />
              </div>

              <div>
                <TweetTile width={1} home_variation={home_variation}>
                  <TweetUser className="tweet-user">
                    <TweetUserWrapper>
                      <TweetUserAvatar avatar={brand_love_tweets[1].avatar} />
                      <div>
                        <Subheading>{brand_love_tweets[1].username}</Subheading>
                        <DetailText color={dt_taro40}>{brand_love_tweets[1].at}</DetailText>
                      </div>
                    </TweetUserWrapper>
                  </TweetUser>
                  {brand_love_tweets[1].text}
                </TweetTile>
              </div>

              <div>
                <ImageSquareTile
                  src={brand_love_images[12].image_url}
                  alt={brand_love_images[12].alt}
                  home_variation={home_variation}
                />
              </div>

              <div>
                <TweetTile width={1} home_variation={home_variation}>
                  <TweetUser className="tweet-user">
                    <TweetUserWrapper>
                      <TweetUserAvatar avatar={brand_love_tweets[5].avatar} />
                      <div>
                        <Subheading>{brand_love_tweets[5].username}</Subheading>
                        <DetailText color={dt_taro40}>{brand_love_tweets[5].at}</DetailText>
                      </div>
                    </TweetUserWrapper>
                  </TweetUser>
                  {brand_love_tweets[5].text}
                </TweetTile>
              </div>

              <div>
                <ImageSquareTile
                  src={brand_love_images[10].image_url}
                  alt={brand_love_images[10].alt}
                  home_variation={home_variation}
                />
              </div>

              <div>
                <ImageSquareTile
                  src={brand_love_images[11].image_url}
                  alt={brand_love_images[11].alt}
                  home_variation={home_variation}
                />
              </div>

              <div>
                <ImageSquareTile
                  src={brand_love_images[0].image_url}
                  alt={brand_love_images[0].alt}
                  home_variation={home_variation}
                />
              </div>

              <div>
                <ImageSquareTile
                  src={brand_love_images[8].image_url}
                  alt={brand_love_images[8].alt}
                  home_variation={home_variation}
                />
              </div>

              <div>
                <ImageSquareTile
                  src={brand_love_images[9].image_url}
                  alt={brand_love_images[9].alt}
                  home_variation={home_variation}
                />
              </div>

              <div>
                <TweetTile width={1} home_variation={home_variation}>
                  <TweetUser className="tweet-user">
                    <TweetUserWrapper>
                      <TweetUserAvatar avatar={brand_love_tweets[1].avatar} />
                      <div>
                        <Subheading>{brand_love_tweets[1].username}</Subheading>
                        <DetailText color={dt_taro40}>{brand_love_tweets[1].at}</DetailText>
                      </div>
                    </TweetUserWrapper>
                  </TweetUser>
                  {brand_love_tweets[1].text}
                </TweetTile>
              </div>

              <div>
                <ImageSquareTile
                  src={brand_love_images[12].image_url}
                  alt={brand_love_images[12].alt}
                  home_variation={home_variation}
                />
              </div>

              <div>
                <TweetTile width={1} home_variation={home_variation}>
                  <TweetUser className="tweet-user">
                    <TweetUserWrapper>
                      <TweetUserAvatar avatar={brand_love_tweets[5].avatar} />
                      <div>
                        <Subheading>{brand_love_tweets[5].username}</Subheading>
                        <DetailText color={dt_taro40}>{brand_love_tweets[5].at}</DetailText>
                      </div>
                    </TweetUserWrapper>
                  </TweetUser>
                  {brand_love_tweets[5].text}
                </TweetTile>
              </div>

              <div>
                <ImageSquareTile
                  src={brand_love_images[10].image_url}
                  alt={brand_love_images[10].alt}
                  home_variation={home_variation}
                />
              </div>

              <div>
                <ImageSquareTile
                  src={brand_love_images[11].image_url}
                  alt={brand_love_images[11].alt}
                  home_variation={home_variation}
                />
              </div>

              <div>
                <ImageSquareTile
                  src={brand_love_images[0].image_url}
                  alt={brand_love_images[0].alt}
                  home_variation={home_variation}
                />
              </div>
            </SliderTrackThree>
          </BrandLoveGridRow>
        )}
      </BrandLoveGrid>
      <Space size="xxl" />
      <Button navigateTo="/wall-of-love" onClick={logButtonClick}>
        <Translate path={brand_love_cta_text} />
      </Button>
    </BrandLoveSectionContainer>
  );
};

export default BrandLoveSection;
