import * as React from "react";
import FeaturesSection from "@src/components/partials/shared/FeaturesSection";
import { graphql, useStaticQuery } from "gatsby";
import { useContext } from "react";
import { TranslationContext } from "@src/components/translation/TranslationContext";

const TeacherLp3FeaturesSession = () => {
  const data = useStaticQuery(graphql`
    {
      directus {
        page_teacherlp3 {
          feature1: feature_one_image {
            filename_disk
          }
          feature2: feature_two_image {
            filename_disk
          }
          feature3: feature_three_image {
            filename_disk
          }
        }
      }
    }
  `);

  const {
    directus: {
      page_teacherlp3: { feature1, feature2, feature3 },
    },
  } = data;

  const t = useContext(TranslationContext);

  const featuresData = {
    header: t.translate("directus.page_teacherlp3.features_title"),
    features: [
      {
        img: feature1,
        title: t.translate("directus.page_teacherlp3.feature_one_title"),
        description: t.translate("directus.page_teacherlp3.feature_one_text"),
      },
      {
        img: feature2,
        title: t.translate("directus.page_teacherlp3.feature_two_title"),
        description: t.translate("directus.page_teacherlp3.feature_two_text"),
      },
      {
        img: feature3,
        title: t.translate("directus.page_teacherlp3.feature_three_title"),
        description: t.translate("directus.page_teacherlp3.feature_three_text"),
      },
    ],
  };

  return <FeaturesSection contentData={featuresData} numbered signupCta />;
};
export default TeacherLp3FeaturesSession;
