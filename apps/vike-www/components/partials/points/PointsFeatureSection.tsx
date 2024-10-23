import React, { useContext } from "react";
import FeaturesSection from "@src/components/partials/shared/FeaturesSection";
import { graphql, useStaticQuery } from "gatsby";
import { TranslationContext } from "@src/components/translation/TranslationContext";

const PointsFeatureSection = () => {
  const data = useStaticQuery(graphql`
    {
      directus {
        page_points {
          feature_one_button_href
          feature_three_button_href
          feature_two_button_href
        }
      }
      feature_one: file(name: { eq: "feature_one" }) {
        childImageSharp {
          gatsbyImageData(width: 455, quality: 100, placeholder: NONE, layout: CONSTRAINED)
        }
      }
      feature_two: file(name: { eq: "feature_two" }) {
        childImageSharp {
          gatsbyImageData(width: 455, quality: 100, placeholder: NONE, layout: CONSTRAINED)
        }
      }
      feature_three: file(name: { eq: "feature_three" }) {
        childImageSharp {
          gatsbyImageData(width: 455, quality: 100, placeholder: NONE, layout: CONSTRAINED)
        }
      }
    }
  `);

  const t = useContext(TranslationContext);

  const featuresData = {
    features: [
      {
        img: data.feature_one.childImageSharp.gatsbyImageData,
        title: t.translate("directus.page_points.feature_one_title"),
        description: t.translate("directus.page_points.feature_one_text"),
        button: {
          text: t.translate("directus.page_points.feature_one_button_text"),
          href: data.directus.page_points.feature_one_button_href,
        },
      },
      {
        img: data.feature_two.childImageSharp.gatsbyImageData,
        title: t.translate("directus.page_points.feature_two_title"),
        description: t.translate("directus.page_points.feature_two_text"),
        button: {
          text: t.translate("directus.page_points.feature_two_button_text"),
          href: data.directus.page_points.feature_two_button_href,
        },
      },
      {
        img: data.feature_three.childImageSharp.gatsbyImageData,
        title: t.translate("directus.page_points.feature_three_title"),
        description: t.translate("directus.page_points.feature_three_text"),
        button: {
          text: t.translate("directus.page_points.feature_three_button_text"),
          href: data.directus.page_points.feature_three_button_href,
        },
      },
    ],
  };

  return <FeaturesSection contentData={featuresData} signupCta />;
};
export default PointsFeatureSection;
