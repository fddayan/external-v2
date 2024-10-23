import React, { useContext } from "react";
import Helmet from "react-helmet";
import { TranslationContext } from "./translation/TranslationContext";

type SEOProps = {
  title?: string;
  description?: string;
  image?: string;
  noindex?: boolean;
  twitter?: Record<string, any>;
};
const SEO: React.FC<SEOProps> = ({ title, description, image, noindex, twitter }) => {
  const t = useContext(TranslationContext);

  return (
    <>
      {title ? (
        <Helmet>
          <title>{t.translateIfAble(title)} | ClassDojo</title>
          <meta itemProp="name" content={t.translateIfAble(title) + " | ClassDojo"} />
          <meta property="og:title" content={t.translateIfAble(title) + " | ClassDojo"} />
        </Helmet>
      ) : (
        <Helmet>
          <title>ClassDojo</title>
          <meta itemProp="name" content="ClassDojo" />
          <meta property="og:title" content="ClassDojo" />
        </Helmet>
      )}

      {description ? (
        <Helmet>
          <meta name="description" content={t.translateIfAble(description) as string} />
          <meta itemProp="description" content={t.translateIfAble(description) as string} />
          <meta property="og:description" content={t.translateIfAble(description) as string} />
        </Helmet>
      ) : (
        <Helmet>
          <meta name="description" content={t.translate("page_descriptions.default") as string} />
          <meta itemProp="description" content={t.translate("page_descriptions.default") as string} />
          <meta property="og:description" content={t.translate("page_descriptions.default") as string} />
        </Helmet>
      )}

      {image ? (
        <Helmet>
          <meta property="og:image" content={image} />
        </Helmet>
      ) : (
        <Helmet>
          <meta
            property="og:image"
            content="https://static.classdojo.com/uploads/054367e8-bd16-4b40-966a-97228437628d.png"
          />
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
          <meta name="twitter:site" content="@classdojo" />
          <meta name="twitter:creator" content="@classdojo" />
          <meta name="twitter:title" content="Learn all about ClassDojo ♥" />
          <meta
            name="twitter:description"
            content="ClassDojo helps teachers, parents, and students build amazing classroom communities."
          />
          <meta name="twitter:image" content="https://static.classdojo.com/img/social_icons/logo-purple-min.png" />
          <meta name="twitter:dnt" content="on" />
        </Helmet>
      )}

      <Helmet>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="apple-itunes-app" content="app-id=552602056" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="author" content="ClassDojo" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ClassDojo" />
        <meta property="fb:app_id" content="171634556373284" />
        <meta name="google-site-verification" content="Av0W9Fr00yNaww-mYNrSwsA8HRRHYn1Ipm_XYURVVVk" />
        <link rel="icon" href={"/favicon.svg"} sizes="any" type="image/svg+xml" />
        <link rel="icon" href={"/favicon.png"} sizes="16x16 32x32 64x64 128x128" type="image/png" />
      </Helmet>
    </>
  );
};

export default SEO;
