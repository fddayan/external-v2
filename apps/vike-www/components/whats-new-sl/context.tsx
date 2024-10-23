import { graphql, useStaticQuery } from "gatsby";
import { map } from "lodash";
import React, { ReactNode, useContext } from "react";

export interface GQLImage {
  publicURL: string;
}

export interface Slider {
  paragraph: string;
  subTitle: string;
  title: string;
  imageFilenameDisk: string;
  iconFilenameDisk: string;
  link?: string;
  show_button: boolean;
}

export interface WhatsNewSLState {
  images: {
    heroVideoCover: GQLImage;
    playingInClass: GQLImage;
    mobile: GQLImage;
    trending: GQLImage;
    points: GQLImage;
    engagedFamilies: GQLImage;
    schoolWideConnections: GQLImage;
    schoolSwitcher: GQLImage;
    note: GQLImage;
    privacyLogos: GQLImage;
    katieHeaders: GQLImage;
    mojoSummersault: GQLImage;
  };
  slider: Slider[];
}

export const WhatsNewSLContext = React.createContext<WhatsNewSLState | undefined>(undefined);

export const useWhatsNewSL = () => {
  const value = useContext(WhatsNewSLContext);

  if (!value) {
    throw new Error("useWhatsNewSL must be used within a WhatsNewSLProvider");
  }

  return value;
};

const QUERY = graphql`
  query {
    engagedFamilies: file(relativePath: { eq: "whats-new-sl/engaged-families.svg" }) {
      publicURL
    }
    givePoints: file(relativePath: { eq: "whats-new-sl/give-points.png" }) {
      publicURL
    }
    katieHeaders: file(relativePath: { eq: "whats-new-sl/katie-header.svg" }) {
      publicURL
    }
    mojoSummersault: file(relativePath: { eq: "whats-new-sl/mojo-summersault.svg" }) {
      publicURL
    }
    pbisIllustration: file(relativePath: { eq: "whats-new-sl/pbis-illustration.png" }) {
      publicURL
    }
    points: file(relativePath: { eq: "whats-new-sl/points.png" }) {
      publicURL
    }
    positivityPhoto: file(relativePath: { eq: "whats-new-sl/positivity-photo.jpg" }) {
      publicURL
    }
    profStillVideo: file(relativePath: { eq: "whats-new-sl/prof-still-video.jpg" }) {
      publicURL
    }
    schoolSwitcher: file(relativePath: { eq: "whats-new-sl/school-switcher.png" }) {
      publicURL
    }
    schoolWideConnections: file(relativePath: { eq: "whats-new-sl/schoolwide-connections.png" }) {
      publicURL
    }
    seeWhatsTrending: file(relativePath: { eq: "whats-new-sl/see-whats-trending.png" }) {
      publicURL
    }
    note: file(relativePath: { eq: "whats-new-sl/note.png" }) {
      publicURL
    }
    privacyLogos: file(relativePath: { eq: "whats-new-sl/privacy-logos.svg" }) {
      publicURL
    }
    directus {
      page_whats_new_2024_sl {
        slider {
          paragraph
          sub_title
          title
          image {
            filename_disk
          }
          icon {
            filename_disk
          }
          link
          show_button
        }
      }
    }
  }
`;

export const WhatsNewSLProvider = ({ children }: { children: ReactNode }) => {
  const data = useStaticQuery(QUERY);
  const {
    engagedFamilies,
    givePoints,
    katieHeaders,
    mojoSummersault,
    schoolSwitcher,
    schoolWideConnections,
    pbisIllustration,
    points,
    positivityPhoto,
    profStillVideo,
    seeWhatsTrending,
    note,
    privacyLogos,
    directus: {
      page_whats_new_2024_sl: { slider: directusSlider },
    },
  } = data;

  const slider = map(directusSlider, (s) => ({
    paragraph: s.paragraph,
    subTitle: s.sub_title,
    title: s.title,
    imageFilenameDisk: s.image?.filename_disk,
    iconFilenameDisk: s.icon?.filename_disk,
    link: s.link,
    show_button: s.show_button,
  }));

  return (
    <WhatsNewSLContext.Provider
      value={{
        slider,
        images: {
          engagedFamilies: engagedFamilies,
          heroVideoCover: profStillVideo,
          playingInClass: positivityPhoto,
          mobile: pbisIllustration,
          trending: seeWhatsTrending,
          points: points,
          schoolWideConnections,
          schoolSwitcher,
          note,
          privacyLogos,
          katieHeaders,
          mojoSummersault,
        },
      }}
    >
      {children}
    </WhatsNewSLContext.Provider>
  );
};
