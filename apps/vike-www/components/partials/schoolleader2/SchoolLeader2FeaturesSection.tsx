import * as React from "react";
import FeaturesSection from "@src/components/partials/shared/FeaturesSection";
import { graphql, useStaticQuery } from "gatsby";
import { useContext } from "react";
import { TranslationContext } from "@src/components/translation/TranslationContext";

const GoogleClassroomFeaturesSection = () => {
  const data = useStaticQuery(graphql`
    {
      directus {
        page_schoolleader2 {
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
        img: data.directus.page_schoolleader2.feature_one_image,
        title: t.translate("directus.page_schoolleader2.feature_one_title"),
        description: t.translate("directus.page_schoolleader2.feature_one_text"),
      },
      {
        img: data.directus.page_schoolleader2.feature_two_image,
        title: t.translate("directus.page_schoolleader2.feature_two_title"),
        description: t.translate("directus.page_schoolleader2.feature_two_text"),
      },
      {
        img: data.directus.page_schoolleader2.feature_three_image,
        title: t.translate("directus.page_schoolleader2.feature_three_title"),
        description: t.translate("directus.page_schoolleader2.feature_three_text"),
      },
    ],
  };

  return <FeaturesSection contentData={featuresData} signupCta />;
};
export default GoogleClassroomFeaturesSection;
