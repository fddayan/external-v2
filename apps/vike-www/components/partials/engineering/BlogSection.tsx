import React from "react";
import styled from "@emotion/styled";
import Translate from "@src/components/translation/Translate";
import { mediaQueries } from "@src/styles/theme";
import Button from "@src/components/Button";
import Container from "@src/components/Container";
import { BodyText, Heading, Space, theme, Title } from "@src/components/nessie-web";

const {
  colors: { white, dt_taro10, dt_taro50, dt_taro90 },
  radii: { dt_radius_m },
} = theme;

const BlogSectionContainer = styled.section`
  width: 100%;
  padding: 54px 0;
  background-color: ${dt_taro10};

  ${mediaQueries[0]} {
    padding: 108px 0;
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
  background-color: ${white};
  padding: 30px;
  ${mediaQueries[0]} {
    max-width: 375px;
  }
  text-align: left;
`;

const NewsImageContainer = styled.div`
  width: 100%;
  text-align: center;
  max-height: 157px;
  & img {
    max-height: 157px;
  }
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

const ButtonContainer = styled.div`
  text-align: center;
`;

const ResponsiveTitle = styled(Title)`
  font-size: 30px;
  ${mediaQueries[1]} {
    font-size: 50px;
  }
`;

type BlogSectionProps = {
  blog_posts: any;
  see_all_button_text: string;
  news_title: string;
};

type BlogPostSingle = {
  title: string;
  image: string;
  excerpt: string;
  link: string;
};

const BlogSection: React.FC<BlogSectionProps> = ({ news_title, see_all_button_text, blog_posts }) => {
  const blogPosts: Array<BlogPostSingle> = blog_posts
    .filter(function (obj: any) {
      // Make sure we're only bringing in blog posts with links set
      return obj.blog_link !== "" && obj.blog_link;
    })
    .map((post: any) => {
      return {
        title: post.blog_title,
        image: post.blog_image ? post.blog_image : "",
        link: post.blog_link,
        excerpt: post.blog_excerpt ? post.blog_excerpt : "",
      };
    });
  return (
    <BlogSectionContainer>
      <Container>
        <NewsContent>
          <ResponsiveTitle size={2}>
            <Translate path={news_title} />
          </ResponsiveTitle>
          <Space size="xxl" />
          <NewsGrid>
            {blogPosts.map((post, idx) => (
              <NewsSlide key={`post_${idx + 1}`}>
                {post.image !== "" && (
                  <NewsImageContainer>
                    <img src={post.image} alt={post.title} />
                  </NewsImageContainer>
                )}
                <Space size="m" />
                <Heading>{post.title}</Heading>
                <Space size="s" />
                <NewsSlideText color={dt_taro50}>{post.excerpt}</NewsSlideText>
                <Space size="s" />
                <BodyText>
                  <NewsSlideReadMore href={post.link}>Read More</NewsSlideReadMore>
                </BodyText>
              </NewsSlide>
            ))}
          </NewsGrid>
        </NewsContent>
        <ButtonContainer>
          <Space size="xxl" />
          <Button as="a" href="https://engineering.classdojo.com/" big>
            <Translate path={see_all_button_text} />
          </Button>
        </ButtonContainer>
      </Container>
    </BlogSectionContainer>
  );
};

export default BlogSection;
