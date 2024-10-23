import * as React from "react";
import FeaturesSection from "@src/components/partials/shared/FeaturesSection";
import { graphql, useStaticQuery } from "gatsby";
import { useContext } from "react";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { GatsbyImage } from "gatsby-plugin-image";

const GoogleClassroomFeaturesSection = () => {
  const data = useStaticQuery<{
    directus: {
      page_googleclassroom: {
        feature_one_image: {
          id: string;
          file: { childImageSharp: GatsbyImage };
        };
        feature_two_image: { id: string; file: { childImageSharp: GatsbyImage } };
        feature_three_image: { id: string; file: { childImageSharp: GatsbyImage } };
      };
    };
  }>(graphql`
    {
      directus {
        page_googleclassroom {
          feature_one_image {
            filename_disk
          }
          feature_two_image {
            filename_disk
          }
          feature_three_image {
            filename_disk
          }
        }
      }
    }
  `);
  const t = useContext(TranslationContext);

  const featuresData = {
    features: [
      {
        img: data.directus.page_googleclassroom.feature_one_image,
        title: t.translate("directus.page_googleclassroom.feature_one_title"),
        description: t.translate("directus.page_googleclassroom.feature_one_text"),
      },
      {
        img: data.directus.page_googleclassroom.feature_two_image,
        title: t.translate("directus.page_googleclassroom.feature_two_title"),
        description: t.translate("directus.page_googleclassroom.feature_two_text"),
      },
      {
        img: data.directus.page_googleclassroom.feature_three_image,
        title: t.translate("directus.page_googleclassroom.feature_three_title"),
        description: t.translate("directus.page_googleclassroom.feature_three_text"),
      },
    ],
  };
  return <FeaturesSection contentData={featuresData} signupCta />;
};
export default GoogleClassroomFeaturesSection;
