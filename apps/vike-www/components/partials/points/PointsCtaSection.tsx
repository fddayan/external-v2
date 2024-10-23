import React, { useContext } from "react";
import { graphql, useStaticQuery } from "gatsby";
import CtasSection from "@src/components/partials/training/CtasSection";
import { TranslationContext } from "@src/components/translation/TranslationContext";

const PointsCtaSection = () => {
  const data = useStaticQuery(graphql`
    {
      wallet: file(name: { eq: "wallet" }) {
        childImageSharp {
          gatsbyImageData(width: 90, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
      youtube: file(name: { eq: "youtube" }) {
        childImageSharp {
          gatsbyImageData(width: 90, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
      contact: file(name: { eq: "contact" }) {
        childImageSharp {
          gatsbyImageData(width: 90, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
      resources: file(name: { eq: "resources" }) {
        childImageSharp {
          gatsbyImageData(width: 90, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
      directus {
        page_points {
          cta_one_image
          cta_one_href
          cta_two_image
          cta_two_href
          cta_three_image
          cta_three_href
          cta_four_image
          cta_four_href
        }
      }
    }
  `);

  const t = useContext(TranslationContext);

  return (
    <CtasSection
      data={{
        title: t.translate("directus.page_points.cta_section_title"),
        content: [
          {
            title: t.translate("directus.page_points.cta_one_title"),
            description: t.translate("directus.page_points.cta_one_text"),
            url: data.directus.page_points.cta_one_href,
            icon: data.directus.page_points.cta_one_image,
          },
          {
            title: t.translate("directus.page_points.cta_two_title"),
            description: t.translate("directus.page_points.cta_two_text"),
            url: data.directus.page_points.cta_two_href,
            icon: data.directus.page_points.cta_two_image,
          },
          {
            title: t.translate("directus.page_points.cta_three_title"),
            description: t.translate("directus.page_points.cta_three_text"),
            url: data.directus.page_points.cta_three_href,
            icon: data.directus.page_points.cta_three_image,
          },
          {
            title: t.translate("directus.page_points.cta_four_title"),
            description: t.translate("directus.page_points.cta_four_text"),
            url: data.directus.page_points.cta_four_href,
            icon: data.directus.page_points.cta_four_image,
          },
        ],
        images: data,
      }}
    />
  );
};

export default PointsCtaSection;
