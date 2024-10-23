import React, { useState } from "react";
import styled from "@emotion/styled";
import Translate from "@src/components/translation/Translate";
import { mediaQueries } from "@src/styles/theme";
import Container from "@src/components/Container";
import { BodyText, Button, Heading, Space, theme, Title } from "@src/components/nessie-web";

const {
  colors: { dt_taro10, dt_taro50, dt_taro90 },
  radii: { dt_radius_m },
} = theme;

const NewsSectionContainer = styled.section`
  width: 100%;
  padding: 75px 0;

  ${mediaQueries[0]} {
    padding: 150px 0;
  }
`;

const NewsContent = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 30px;

  ${mediaQueries[0]} {
    grid-template-columns: 1fr 1fr;
  }

  ${mediaQueries[1]} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const NewsSlide = styled.div`
  border-radius: ${dt_radius_m};
  background-color: ${dt_taro10};
  padding: 30px;
  max-width: 375px;
  height: 100%;
  text-align: left;
`;

const NewsSlideImage = styled.img`
  border-radius: ${dt_radius_m};
  width: 100%;
  height: 156px;
  object-fit: cover;
`;

const NewsSlideText = styled(BodyText)`
  -webkit-line-clamp: 4;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const NewsSlideReadMore = styled.a`
  color: ${dt_taro90};
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
`;

type NewsSectionProps = {
  clippings: any;
  news_title: string;
};

const NewsSection: React.FC<NewsSectionProps> = ({ news_title, clippings }) => {
  const [showAllClippings, setShowAllClippings] = useState(false);
  const firstThreeClippings = [clippings[0], clippings[1], clippings[2]];
  const clippingsToShow = showAllClippings ? clippings : firstThreeClippings;

  return (
    <NewsSectionContainer>
      <Container>
        <NewsContent>
          <Title size={2}>
            <Translate path={news_title} />
          </Title>
          <Space size="xxl" />
          <NewsGrid>
            {clippingsToShow.map((clipping, idx) => (
              <NewsSlide key={`clipping_${idx + 1}`}>
                <NewsSlideImage src={clipping.news_image.file.publicURL} alt={clipping.news_image_alt} />
                <Space size="m" />
                <Heading>{clipping.news_headline}</Heading>
                <Space size="s" />
                <NewsSlideText color={dt_taro50}>{clipping.news_text}</NewsSlideText>
                <Space size="s" />
                <BodyText>
                  <NewsSlideReadMore href={clipping.news_url}>Read More</NewsSlideReadMore>
                </BodyText>
              </NewsSlide>
            ))}
          </NewsGrid>
          {!showAllClippings && (
            <>
              <Space size="xl" />
              <Button kind="secondary" onClick={() => setShowAllClippings(!showAllClippings)}>
                See More
              </Button>
            </>
          )}
        </NewsContent>
      </Container>
    </NewsSectionContainer>
  );
};

export default NewsSection;
