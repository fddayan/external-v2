import React, { useEffect } from "react";
import SEO from "../components/SEO";
import HeaderSection from "../components/partials/resources/HeaderSection";
import NavSection from "../components/partials/resources/NavSection";
import GettingSetupSection from "../components/partials/resources/GettingSetupSection";
import CustomizeForYourWorld from "../components/partials/resources/CustomizeForYourWorld";
import ShareLoveSection from "../components/partials/resources/ShareLoveSection";
import HavingFunSection from "../components/partials/resources/HavingFunSection";
import AlternatedFeaturesSection from "@src/components/partials/resources/AlternatedFeaturesSection";
import FooterSection from "../components/partials/resources/FooterSection";
import { logEvent } from "@src/utils/logClient";
import { useStaticQuery, graphql } from "gatsby";
import { TranslationType } from "@src/components/translation/TranslationContext";
import _ from "lodash";
import { getTranslatedAssetFromRepeater } from "@src/utils/getTranslatedAsset";
import getLocale from "@src/utils/getLocale";

export const resourcesLogBaseName =
  "web.external.resources_page.resource_opened.";

export const createResourceEventName = (
  resourceTitle: TranslationType
): string => {
  return (
    resourcesLogBaseName +
    resourceTitle
      .toString()
      .toLowerCase()
      .replace(/[ ]/g, "_")
      .replace(/[!?'".,]/g, "")
  );
};

export interface ResourceFeaturesData {
  title: string;
  description: string;
  label: string;
  url: string;
  hasResource: boolean;
  imageUrl?: string;
  iconName?: any;
}

const ResourcesPage = ({ pageContext }) => {
  useEffect(() => {
    logEvent("web.external.resources_page.page_view");
  }, []);

  const {
    directus: {
      page_resources_2023: {
        customization_features,
        get_started_features,
        have_fun_features,
        share_the_love_features,
        tutorial_button_urls,
        tutorials_with_translation,
        footer_button_url,
      },
    },
  } = useStaticQuery(graphql`
    query {
      directus {
        page_resources_2023 {
          customization_features
          get_started_features
          have_fun_features
          share_the_love_features
          tutorial_button_urls
          tutorials_with_translation
          nav_links
          footer_button_url
        }
      }
    }
  `);
  const userLanguage = getLocale(pageContext);
  const parseFeatures = (features, sectionName): ResourceFeaturesData[] =>
    features.map((feature, index) => {
      const { hasTranslatedAsset: hasResource, assetUrl: url } =
        getTranslatedAssetFromRepeater(
          feature["Download_URLs"],
          userLanguage,
          "Language"
        );
      return {
        title:
          `directus.page_resources_2023.${sectionName}.title_` + (index + 1),
        description:
          `directus.page_resources_2023.${sectionName}.description_` +
          (index + 1),
        label:
          `directus.page_resources_2023.${sectionName}.button_label_` +
          (index + 1),
        url,
        hasResource,
        imageUrl: feature.image_url || null,
        iconName: feature.icon || null,
      };
    });

  const videoTutorials = tutorials_with_translation.map((tutorial, index) => {
    const video =
      tutorial.youtube_ids.find(
        (id) => id.language.toLowerCase() === userLanguage
      ) ||
      tutorial.youtube_ids.find((id) => id.language.toLowerCase() === "en-us");
    const videoId = video.id;
    const thumbnail =
      tutorial.thumb_url ||
      `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    return {
      title:
        "directus.page_resources_2023.tutorials_with_translation.title_" +
        (index + 1),
      description:
        "directus.page_resources_2023.tutorials_with_translation.description_" +
        (index + 1),
      videoId,
      thumbnail,
    };
  });
  const {
    hasTranslatedAsset: hasTranslatedPlaylist,
    assetUrl: tutorialPlaylistUrl,
  } = getTranslatedAssetFromRepeater(tutorial_button_urls, userLanguage);

  const getStartedFeatures = parseFeatures(
    get_started_features,
    "get_started_features"
  );
  const customiztionFeatures = parseFeatures(
    customization_features,
    "customization_features"
  );
  const shareLoveFeatures = parseFeatures(
    share_the_love_features,
    "share_the_love_features"
  );
  const havingFunFeatures = parseFeatures(
    have_fun_features,
    "have_fun_features"
  );
  return (
    <>
      <SEO
        title="page_titles.resources"
        description="page_descriptions.resources"
        image="https://static.classdojo.com/img/page_resources/resourcesFBimage.png"
        twitter={{
          card: "summary_large_image",
          site: "@classdojo",
          creator: "@classdojo",
          title: "Beautiful classroom resources",
          description:
            "Downloadable ClassDojo artwork, presentations, and more!",
          image:
            "https://static.classdojo.com/img/page_resources/resourcesFBimage.png",
        }}
      />
      <HeaderSection />
      <NavSection
        tutorials={videoTutorials}
        url={tutorialPlaylistUrl}
        isTranslatedPlaylistAvailable={hasTranslatedPlaylist}
      />
      <GettingSetupSection features={getStartedFeatures} />
      <CustomizeForYourWorld features={customiztionFeatures} />
      <ShareLoveSection features={shareLoveFeatures} />
      <HavingFunSection />
      <AlternatedFeaturesSection features={havingFunFeatures} />
      <FooterSection url={footer_button_url} />
    </>
  );
};
export default ResourcesPage;
