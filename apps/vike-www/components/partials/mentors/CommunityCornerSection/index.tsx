import React from "react";
import Container from "@src/components/Container";
import { BodyText, DetailText, Space, Subheading, theme, Title } from "@src/components/nessie-web";
import Translate from "@src/components/translation/Translate";
import * as S from "./styles";

const {
  colors: { dt_taro40 },
} = theme;

type CommunityCornerSectionProps = {
  brand_love_images: any;
  brand_love_tweets: any;
  BGColor: boolean;
  community_corner_link_url?: string;
};

const CommunityCornerSection: React.FC<CommunityCornerSectionProps> = ({
  brand_love_images,
  brand_love_tweets,
  BGColor,
  community_corner_link_url,
}) => {
  return (
    <S.CommunityCornerSectionContainer bgColor={BGColor}>
      <Container>
        <S.CommunityCornerHeader>
          <Title size={2}>
            <Translate path="directus.page_mentors.community_corner_title" />
          </Title>
          <Space size="l" />
          <BodyText>
            <Translate path="directus.page_mentors.community_corner_text" />{" "}
            <S.CommunityTextLink href={community_corner_link_url} target="_blank">
              <Translate path="directus.page_mentors.community_corner_link_text" />
            </S.CommunityTextLink>
            !
          </BodyText>
        </S.CommunityCornerHeader>
      </Container>
      <Space size="l" />
      <S.CommunityCornerGrid bgColor={BGColor}>
        <S.CommunityCornerGridRow>
          <S.SliderTrackOne>
            <div>
              <S.ImageSquareTile src={brand_love_images[0].image_url} alt={brand_love_images[0].alt} />
            </div>

            <div>
              <S.ImageSquareTile src={brand_love_images[1].image_url} alt={brand_love_images[1].alt} />
            </div>

            <div>
              <S.ImageSquareTile src={brand_love_images[2].image_url} alt={brand_love_images[2].alt} />
            </div>

            <div>
              <S.TweetTile width={2}>
                <S.TweetUser className="tweet-user">
                  <S.TweetUserWrapper>
                    <S.TweetUserAvatar avatar={brand_love_tweets[0].avatar} />
                    <div>
                      <Subheading>{brand_love_tweets[0].username}</Subheading>
                      <DetailText color={dt_taro40}>{brand_love_tweets[0].at}</DetailText>
                    </div>
                  </S.TweetUserWrapper>
                </S.TweetUser>
                <Translate path="directus.page_careers.brand_love_tweets.text_1" />
              </S.TweetTile>
            </div>

            <div>
              <S.ImageSquareTile src={brand_love_images[3].image_url} alt={brand_love_images[3].alt} />
            </div>

            <div>
              <S.TweetTile width={1}>
                <S.TweetUser className="tweet-user">
                  <S.TweetUserWrapper>
                    <S.TweetUserAvatar avatar={brand_love_tweets[1].avatar} />
                    <div>
                      <Subheading>{brand_love_tweets[1].username}</Subheading>
                      <DetailText color={dt_taro40}>{brand_love_tweets[1].at}</DetailText>
                    </div>
                  </S.TweetUserWrapper>
                </S.TweetUser>
                <Translate path="directus.page_careers.brand_love_tweets.text_2" />
              </S.TweetTile>
            </div>

            <div>
              <S.ImageSquareTile src={brand_love_images[4].image_url} alt={brand_love_images[4].alt} />
            </div>

            <div>
              <S.ImageSquareTile src={brand_love_images[2].image_url} alt={brand_love_images[2].alt} />
            </div>

            <div>
              <S.ImageSquareTile src={brand_love_images[0].image_url} alt={brand_love_images[0].alt} />
            </div>

            <div>
              <S.ImageSquareTile src={brand_love_images[1].image_url} alt={brand_love_images[1].alt} />
            </div>

            <div>
              <S.ImageSquareTile src={brand_love_images[2].image_url} alt={brand_love_images[2].alt} />
            </div>

            <div>
              <S.TweetTile width={2}>
                <S.TweetUser className="tweet-user">
                  <S.TweetUserWrapper>
                    <S.TweetUserAvatar avatar={brand_love_tweets[0].avatar} />
                    <div>
                      <Subheading>{brand_love_tweets[0].username}</Subheading>
                      <DetailText color={dt_taro40}>{brand_love_tweets[0].at}</DetailText>
                    </div>
                  </S.TweetUserWrapper>
                </S.TweetUser>
                <Translate path="directus.page_careers.brand_love_tweets.text_1" />
              </S.TweetTile>
            </div>

            <div>
              <S.ImageSquareTile src={brand_love_images[3].image_url} alt={brand_love_images[3].alt} />
            </div>

            <div>
              <S.TweetTile width={1}>
                <S.TweetUser className="tweet-user">
                  <S.TweetUserWrapper>
                    <S.TweetUserAvatar avatar={brand_love_tweets[1].avatar} />
                    <div>
                      <Subheading>{brand_love_tweets[1].username}</Subheading>
                      <DetailText color={dt_taro40}>{brand_love_tweets[1].alt}</DetailText>
                    </div>
                  </S.TweetUserWrapper>
                </S.TweetUser>
                <Translate path="directus.page_careers.brand_love_tweets.text_2" />
              </S.TweetTile>
            </div>

            <div>
              <S.ImageSquareTile src={brand_love_images[4].image_url} alt={brand_love_images[4].alt} />
            </div>

            <div>
              <S.ImageSquareTile src={brand_love_images[2].image_url} alt={brand_love_images[2].alt} />
            </div>
          </S.SliderTrackOne>
        </S.CommunityCornerGridRow>
      </S.CommunityCornerGrid>
    </S.CommunityCornerSectionContainer>
  );
};

export default CommunityCornerSection;
