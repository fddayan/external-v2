import { AppDataContext } from "@src/components/AppDataContext";
import CTASection from "@src/components/CTASection";
import DojoIslandsBanner from "@src/components/partials/dojo-islands/DojoIslandsBanner";
import MobileSignupButton from "@src/components/partials/home-2022/MobileSignupButton";
import { useStartExperimentWhenInAudience } from "@src/utils/experiment";
import { ExternalSwitches } from "@src/utils/experiments/constants";
import getLocale from "@src/utils/getLocale";
import { getTranslatedAssetFromRepeater } from "@src/utils/getTranslatedAsset";
import { logEvent } from "@src/utils/logClient";
import { graphql, useStaticQuery } from "gatsby";
import { useContext, useEffect, useState } from "react";
import AlternatedFeaturesSection from "@src/components/AlternatedFeaturesSection";
import SEO from "@src/components/SEO";
import BrandLoveSection from "@src/components/partials/about/BrandLoveSection";
import CommunitySlideshow from "@src/components/partials/home-2022/CommunitySlideshow";
import HeroSection2022 from "@src/components/partials/home-2022/HeroSection2022";
import PrivacySection from "@src/components/partials/home-2022/PrivacySection";
import React from "react";

export const IndexPageContainer = ({
  pageContext,
  inHomepageExperiment,
}: {
  pageContext: { localeStrings: string; currentLocale: string };
  inHomepageExperiment?: "control" | "control1";
}) => {
  const data = useStaticQuery(graphql`
    query {
      directus {
        page_home_2022 {
          features
          privacy_link
          cta_background_image_url
        }
        page_careers {
          brand_love_images
          brand_love_tweets
        }
        homepage_copy_experiments {
          translations {
            languages_code {
              code
            }
            hero
            tagline
            features
          }
        }
      }
    }
  `);
  const {
    directus: {
      page_home_2022: { features, privacy_link, cta_background_image_url },
      page_careers: { brand_love_images, brand_love_tweets },
    },
  } = data;

  const [showMobileButton, setShowMobileButton] = useState(false);
  const userLanguage = getLocale(pageContext).toLowerCase();
  const {
    data: { loadingSession },
  } = useContext(AppDataContext);

  const HeroSection2022Props = {
    hero_title: "directus.page_home_2022.title",
    hero_subtitle: "directus.page_home_2022.subtitle",
    hero_subtitle_underlined: "directus.page_home_2022.subtitle_underlined",
    get_started_title: "directus.page_home_2022.get_started_title",
    review_count: "directus.page_home_2022.review_count",
    setShowMobileButton,
  };

  const CommunitySlideshowProps = {
    title: "directus.page_home_2022.carousel_title",
  };

  const AlternatedFeaturesSectionProps = {
    invert_desktop_order: true,
    title: "",
    text: "",
    content: features.map((feature, index) => {
      const translatedImage = getTranslatedAssetFromRepeater(
        feature["image_link"],
        userLanguage
      );
      return {
        ...feature,
        title: `directus.page_home_2022.features.title_${index + 1}`,
        text: `directus.page_home_2022.features.text_${index + 1}`,
        image_url: translatedImage.assetUrl,
      };
    }),
    page: "page_home_2022",
    featureRepeater: "features",
    featureTitle: "title_",
    featureText: "text_",
    textOnTop: true,
    home_variation: true,
  };
  const BrandLoveSectionProps = {
    brand_love_title: "directus.page_home_2022.brand_love_title",
    brand_love_text: "",
    brand_love_images,
    brand_love_tweets,
    brand_love_cta_text: "directus.page_careers.brand_love_cta_text",
    three_liner: false,
    translate: true,
    home_variation: true,
    BGColor: false,
  };
  const PrivacySectionProps = {
    privacy_title: "directus.page_home_2022.privacy_title",
    privacy_subtitle: "directus.page_home_2022.privacy_subtitle",
    privacy_link,
    privacy_link_label: "directus.page_home_2022.privacy_link_label",
  };
  const CTASectionProps = {
    cta_title: "directus.page_home_2022.cta_title",
    cta_button_text: "directus.page_home_2022.cta_button_text",
    cta_background_image_url,
    cta_advice: "",
    button_log_event_name: "web.external_page.cta_signup_click",
    params: {},
    home_variation: true,
  };
  const { currentLocale } = pageContext;
  useEffect(() => {
    const logAfterSession = async () => {
      if (!loadingSession) {
        logEvent({ eventName: "web.external_page.page_view" });
      }
    };
    logAfterSession();
  }, [loadingSession]);

  useStartExperimentWhenInAudience(
    ExternalSwitches.WEB_EXTERNAL_HOMEPAGE_EXPERIMENT_2024,
    {
      isInAudience: userLanguage === "en-us",
    }
  );

  return (
    <>
      {!inHomepageExperiment && <SEO />}
      <MobileSignupButton showButton={showMobileButton} />
      <HeroSection2022 {...HeroSection2022Props} />
      <CommunitySlideshow {...CommunitySlideshowProps} />
      <AlternatedFeaturesSection {...AlternatedFeaturesSectionProps} />
      <DojoIslandsBanner utmParam="homePage" />
      <BrandLoveSection {...BrandLoveSectionProps} />
      <PrivacySection {...PrivacySectionProps} />
      <CTASection {...CTASectionProps} />
    </>
  );
};

export default function IndexPage({ pageContext }) {
  return <IndexPageContainer pageContext={pageContext} />;
}
