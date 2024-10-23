/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import { css } from "@emotion/react";
import Link from "@src/components/UTMLink";
import { Text } from "@src/components/Text";
import { FaGithub } from "react-icons/fa";
import { Box, Flex, FlexList } from "@src/components/Boxes";
import slugify from "slugify";
import SocialSharing from "@src/components/blog/SocialSharing";
import theme from "prism-react-renderer/themes/nightOwl";
import { theme as nessieTheme } from "@src/components/nessie-web";
import { Post, PostType } from "@src/layouts/blog/Author";
import GatsbyImageWrapper from "../GatsbyImageWrapper";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const {
  borders: { dt_border_card },
  colors: { dt_taro90, dt_taro50, dt_taro30, dt_white, dt_aqua50, dt_aqua60, dt_watermelon60 },
  shadows: { dt_shadow_shadezies },
  radii: { dt_radius_l },
  space,
} = nessieTheme;

const Article = styled("article")`
  position: relative;
  background-color: ${dt_white};
  border: ${dt_border_card};
  border-radius: ${dt_radius_l};
  box-shadow: ${dt_shadow_shadezies};
  color: ${dt_taro90};
  padding: ${space.dt_xxl}px ${space.dt_s}px;
  margin: 0 -15px;
  font-family: proxima-nova, "Helvetica Neue", Helvetica, Arial, sans-serif;

  ${mediaQueries[0]} {
    padding: 60px;
    margin: 90px 0 0;
  }
`;

const ArticleHeaderBox = styled("div")`
  display: block;
  margin-bottom: 35px;

  ${mediaQueries[1]} {
    margin-bottom: 60px;
  }
`;

const articleHeaderImageStyle = css`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  min-width: 60px;
  min-height: 60px;
  max-width: 60px;
  max-height: 60px;
  margin: 0 auto;
  position: absolute !important;
  top: -30px;
  left: 0;
  right: 0;
`;

const ArticleHeader = styled("h1")`
  cursor: pointer;
  color: ${dt_taro90};
  text-align: center;
  font-weight: 700;
  background-color: transparent;
  text-decoration: none;
  font-size: 50px;
  line-height: 1.2em;
  :hover {
    color: ${dt_aqua50};
  }
  ${mediaQueries[1]} {
    font-size: 30px;
    line-height: 36px;
  }
`;

const ArticleHeaderMeta = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  color: ${dt_taro50};
  p {
    margin-bottom: 0;
  }

  a {
    color: ${dt_taro50};
    :hover {
      color: ${dt_aqua50};
    }
  }
`;

type ArticleImageProps = { maxWidth: number };
const ArticleImage = styled(GatsbyImageWrapper)<ArticleImageProps>`
  width: 100%;
  margin-bottom: 35px;
  margin-left: auto;
  margin-right: auto;
  max-width: ${(props) => (props.maxWidth && props.maxWidth < 400 ? props.maxWidth + "px" : "100%")};
`;

const ArticleMoreLink = styled(Link)`
  font-size: 14px;
  line-height: 27px;
  font-weight: 400;
  background-color: transparent;
  color: #464646;
  display: block;
  text-align: center;
  text-decoration: none;

  span {
    display: inline-block;
    padding: 15px;
    background: ${dt_white};
    position: relative;
    z-index: 2;
  }

  :hover {
    color: ${dt_aqua50};
    outline: 0;
    text-decoration: none;
  }

  :after {
    content: "";
    border-bottom: 1px dashed #ccc;
    display: block;
    position: relative;
    top: -27px;
  }

  :hover:after {
    border-bottom: 1px dashed ${dt_aqua50};
  }
`;

const categoryButtonStyles = css`
  display: inline-block;
  padding: 3px 10px;
  background-color: #f4f4f4;
  border-radius: 0px;
  font-size: 13px;
  line-height: 22px;
  text-decoration: none;
  margin-bottom: 8px;
  margin-right: 8px;
  text-transform: capitalize;
  font-weight: 300;
  border: 1px solid transparent;

  :hover {
    text-decoration: none;
    background-color: #eaf9ff;
    color: #0089bc;
    border: 1px solid ${dt_aqua50};
    outline: 0;
  }
`;

const AuthorBio = styled(Flex)`
  border-radius: 0;
  background: ${dt_white};
  border-left: none;
  border-right: none;
  border-top: 1px solid ${dt_taro30};
  border-bottom: 1px solid ${dt_taro30};
  box-shadow: none;
  padding: 19px 0;
  margin-top: 40px;
  margin-bottom: 40px;
`;
AuthorBio.defaultProps = {};
const authorImgStyle = css`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  min-width: 60px;
  min-height: 60px;
  max-width: 60px;
  max-height: 60px;
  margin: 0 auto;
`;
const AuthorLink = styled(Link)`
  margin-bottom: 5px;
  color: ${dt_aqua50};
  :hover {
    color: ${dt_aqua60};
    text-decoration: underline;
  }
`;

const MdxH1 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1
    css={css`
      font-size: 102px;
      font-weight: 400;
      line-height: 35px;
      margin-bottom: 10px;
      margin-top: 20px;
    `}
    {...props}
  />
);
const MdxH2 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    css={css`
      font-size: 30px;
      font-weight: 400;
      line-height: 33px;
      margin-bottom: 10px;
      margin-top: 20px;
    `}
    {...props}
  />
);
const MdxH3 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    css={css`
      font-size: 28px;
      font-weight: 400;
      line-height: 31px;
      margin-bottom: 10px;
      margin-top: 20px;
    `}
    {...props}
  />
);
const MdxH4 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h4
    css={css`
      font-size: 22px;
      font-weight: 400;
      line-height: 28px;
      margin-bottom: 10px;
      margin-top: 20px;
    `}
    {...props}
  />
);
const MdxH5 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h5
    css={css`
      font-size: 18px;
      font-weight: 400;
      line-height: 24px;
      margin-bottom: 10px;
      margin-top: 26px;
    `}
    {...props}
  />
);
const MdxP = (props: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    css={css`
      font-size: 18px;
      line-height: 1.5em;
      margin: 0 0 15px;
      font-weight: 400;
    `}
    {...props}
  />
);
const MdxA = (props: React.HTMLAttributes<HTMLAnchorElement>) => (
  <a
    css={css`
      background-color: transparent;
      color: ${dt_aqua50};
      text-decoration: none;

      :hover {
        color: ${dt_aqua60};
        outline: 0;
        text-decoration: underline;
      }
    `}
    {...props}
  />
);
const MdxImg = (props: React.HTMLAttributes<HTMLImageElement>) => (
  <img
    alt=""
    css={css`
      margin-left: auto;
      margin-right: auto;
      display: block;
      margin-bottom: 35px;

      max-width: 75%;
      object-fit: contain;
      position: relative;
    `}
    {...props}
  />
);
const MdxUl = (props: React.HTMLAttributes<HTMLUListElement>) => (
  <ul
    css={css`
      font-size: 18px;
      line-height: 1.5em;
      margin: 0 0 15px;
      font-weight: 400;
    `}
    {...props}
  />
);
const MdxOl = (props: React.HTMLAttributes<HTMLOListElement>) => (
  <ol
    css={css`
      font-size: 18px;
      line-height: 1.5em;
      margin: 0 0 15px;
      font-weight: 400;
    `}
    {...props}
  />
);
const CodeBlock = ({ children, className }: { children: string; className: string }) => {
  const language: Language = (
    className && className.indexOf("language-") !== -1 ? className.replace(/language-/, "") : "bash"
  ) as Language;

  const LineNo = styled.span`
    display: inline-block;
    width: 1.5em;
    user-select: none;
    opacity: 0.3;
    margin-right: 10px;
    border-right: beige thin solid;
  `;
  return (
    <Highlight {...defaultProps} code={children.trim()} language={language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: "20px 20px 20px 20px", whiteSpace: "pre-wrap" }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              <LineNo>{i + 1}</LineNo>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};
const InlineCode = (props: React.HTMLAttributes<HTMLElement>) => (
  <code
    css={css`
      font-size: 16px;
      color: ${dt_watermelon60};
      font-family: SourceCodePro, Menlo, Monaco, "Andale Mono", "lucida console", "Courier New", monospace !important;
      border-radius: 5px;
      margin: 0 3px;
      border: 1px solid #eee;
      padding: 1px 6px;
      background: none repeat scroll 0 0 ${dt_taro30};
    `}
    {...props}
  />
);
const Pre = (props: React.HTMLAttributes<HTMLElement>) => (
  <pre
    css={css`
      font-size: 12px;
      font-family: SourceCodePro, Menlo, Monaco, "Andale Mono", "lucida console", "Courier New", monospace !important;
    `}
    {...props}
  />
);

const mdxComponents = {
  h1: MdxH1,
  h2: MdxH2,
  h3: MdxH3,
  h4: MdxH4,
  h5: MdxH5,
  p: MdxP,
  a: MdxA,
  img: MdxImg,
  ul: MdxUl,
  ol: MdxOl,
  code: CodeBlock,
  inlineCode: InlineCode,
  pre: Pre,
};

const Youtube = ({ id }: { id: string }) => (
  <iframe
    title="Youtube video"
    width="500"
    height="281"
    src={`https://www.youtube.com/embed/${id}?feature=oembed`}
    frameBorder="0"
    allowFullScreen
  />
);

const Row = ({ children }: { children: JSX.Element }) => <Flex>{children}</Flex>;
const Column = ({ children }: { children: JSX.Element }) => (
  <Box
    width="100%"
    css={css`
      img {
        max-width: 100% !important;
      }
    `}
  >
    {children}
  </Box>
);

const mdxShortcodes = { Youtube, Row, Column };

type BlogArticleProps = { post: Post; showExcerpt?: boolean };
const BlogArticle: React.FC<BlogArticleProps> = ({ post: originalPost, showExcerpt }) => {
  // eslint-disable-next-line valid-typeof
  const post: PostType = typeof originalPost.node === undefined ? originalPost.node : (originalPost as PostType);

  function getPostPath(post: { path: string }) {
    return post.path;
  }

  if (!post) return null;

  const excerptMD = post.body.substring(0, post.body.indexOf("<!-- more -->"));
  const bodyMD = post.body.replace("<!-- more -->", "");
  const contentMD = post.hasExcerpt && showExcerpt ? excerptMD : bodyMD;

  return (
    <Article>
      <GatsbyImageWrapper image={post.author.image} css={articleHeaderImageStyle} alt="" />
      <ArticleHeaderBox>
        <Link to={getPostPath(post)}>
          <ArticleHeader>{post.title}</ArticleHeader>
        </Link>
        <ArticleHeaderMeta>
          <Link to={`/author/${post.author.slug}`}>
            <Text display="inline">{post.author.name}</Text>
          </Link>
          {post.author.github_nick && (
            <a href={`https://github.com/${post.author.github_nick}`}>
              <Flex alignItems="center" marginLeft="15px">
                <FaGithub />
                <Text display="inline">{post.author.github_nick}</Text>
              </Flex>
            </a>
          )}
          <Text marginLeft="15px" display="inline">
            {post.publish_date}
          </Text>
        </ArticleHeaderMeta>
      </ArticleHeaderBox>
      {post.image && (
        <ArticleImage
          image={post.image}
          maxWidth={400} // WRONG: hardcoded
          // maxWidth={post.image.width}
          loading="eager"
          alt=""
        />
      )}
      <div id="markdown-here">
        <Markdown rehypePlugins={[rehypeRaw]}>{contentMD}</Markdown>
      </div>

      {post.hasExcerpt && showExcerpt && (
        <ArticleMoreLink to={getPostPath(post)}>
          <span>Continue reading</span>
        </ArticleMoreLink>
      )}

      {!showExcerpt && <SocialSharing image={post.image} />}

      {post.author.bio && !showExcerpt && (
        <AuthorBio>
          <GatsbyImageWrapper image={post.author.image} css={authorImgStyle} alt="" />
          <Flex flexDirection={"column"} fontSize="14px" color="#626262" lineHeight={1.3} marginLeft="10px">
            <AuthorLink to={`/author/${post.author.slug}`}>{post.author.name}</AuthorLink>
            <p>{post.author.bio}</p>
          </Flex>
        </AuthorBio>
      )}

      <FlexList marginTop="20px" flexWrap="wrap">
        {post.categories &&
          post.categories.map(({ blog_category: category }, ci) => (
            <li key={`article-${post.slug}-category-${ci}`}>
              <Link to={`/category/${slugify(category.slug)}`} css={categoryButtonStyles}>
                {category.name}
              </Link>
            </li>
          ))}
      </FlexList>
    </Article>
  );
};

export default BlogArticle;
