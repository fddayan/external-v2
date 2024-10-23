import React from "react";
import Helmet from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";

type SEOProps = {
  title?: string;
  description?: string;
  image?: string;
  noindex?: boolean;
  twitter?: Record<string, any>;
  type?: string;
  publishDate?: string;
  slug?: string;
  canonicalUrl?: string | null;
};

type QueryType = {
  site: {
    siteMetadata: {
      devBlogUrl: string;
      blogUrl: string;
      blogTitle: string;
      devBlogTitle: string;
      blogDescription: string;
      devBlogDescription: string;
    };
  };
};
const BlogSEO: React.FC<SEOProps> = ({
  title,
  description,
  image,
  noindex,
  twitter,
  type,
  publishDate,
  slug,
  canonicalUrl,
}) => {
  const data = useStaticQuery<QueryType>(graphql`
    query {
      site {
        siteMetadata {
          devBlogUrl
          blogUrl
          blogTitle
          devBlogTitle
          blogDescription
          devBlogDescription
        }
      }
    }
  `);

  const { site } = data;

  let defaultTitle;
  let defaultDescription;
  let url;
  if (process.env.GATSBY_BUILD_WEBSITE === "blog") {
    url = site.siteMetadata.blogUrl;
    defaultTitle = site.siteMetadata.blogTitle;
    defaultDescription = site.siteMetadata.blogDescription;
  } else {
    url = site.siteMetadata.devBlogUrl;
    defaultTitle = site.siteMetadata.devBlogTitle;
    defaultDescription = site.siteMetadata.devBlogDescription;
  }

  const defaultImage =
    process.env.GATSBY_BUILD_WEBSITE === "dev-blog" ? `${url}/classdojo-engineering.png` : `${url}/classdojo.jpg`;

  const defaultType = "website";

  const pageUrl = slug ? `${url}/${slug.charAt(0) === "/" ? slug.substr(1) : slug}` : url;

  return (
    <>
      {title ? (
        <Helmet>
          <title>{title}</title>
          <meta itemProp="name" content={title} />
          <meta property="og:title" content={title} />
        </Helmet>
      ) : (
        <Helmet>
          <title>{defaultTitle}</title>
          <meta itemProp="name" content={defaultTitle} />
          <meta property="og:title" content={defaultTitle} />
        </Helmet>
      )}

      {description ? (
        <Helmet>
          <meta name="description" content={description} />
          <meta itemProp="description" content={description} />
          <meta property="og:description" content={description} />
        </Helmet>
      ) : (
        <Helmet>
          <meta name="description" content={defaultDescription} />
          <meta itemProp="description" content={defaultDescription} />
          <meta property="og:description" content={defaultDescription} />
        </Helmet>
      )}

      {image ? (
        <Helmet>
          <meta property="og:image" content={image} />
        </Helmet>
      ) : (
        <Helmet>
          <meta property="og:image" content={defaultImage} />
        </Helmet>
      )}

      {noindex && (
        <Helmet>
          <meta name="robots" content="noindex" />
          <meta name="googlebot" content="noindex" />
        </Helmet>
      )}

      {twitter ? (
        <Helmet>
          {Object.keys(twitter).map((key) => (
            <meta key={key} name={`twitter:${key}`} content={twitter[key]} />
          ))}
        </Helmet>
      ) : (
        <Helmet>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@ClassDojo" />
          <meta name="twitter:creator" content="@ClassDojo" />
          <meta name="twitter:title" content={title ? title : defaultTitle} />
          <meta name="twitter:description" content={description ? description : defaultDescription} />
          <meta name="twitter:image" content={image ? image : defaultImage} />
        </Helmet>
      )}
      {process.env.GATSBY_BUILD_WEBSITE === "dev-blog" && (
        <Helmet>
          <link rel="canonical" href={canonicalUrl ?? pageUrl} />
        </Helmet>
      )}

      {type === "article" && (
        <Helmet>
          <meta property="article:publisher" content="https://www.facebook.com/classdojo/" />
          <meta property="article:author" content="https://www.facebook.com/classdojo" />
          <meta property="article:section" content={title} />
          <meta property="article:published_time" content={publishDate} />
        </Helmet>
      )}

      <Helmet>
        <meta name="HandheldFriendly" content="True" />

        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content={type ? type : defaultType} />
        <meta property="og:url" content={pageUrl} />

        <meta property="og:site_name" content="The ClassDojo Blog" />

        <meta name="google-site-verification" content="eGfI401QYTlzQnLRyStZ1newdzB5XUiKsqe_-ebmaU0" />
        <link rel="shortcut icon" href={"/favicon.ico"} />
      </Helmet>
    </>
  );
};

export default BlogSEO;
