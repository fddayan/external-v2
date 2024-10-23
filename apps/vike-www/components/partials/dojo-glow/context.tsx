import React, { ReactNode, useContext } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { TranslationContext } from "../../translation/TranslationContext";
import { GQLImage } from "../../whats-new-sl/context";

export interface DojoGlowState {
  stickyHeader: {
    share_button_text: string;
    share_url: string;
  };
  share: {
    title: string | undefined;
    text: string | undefined;
    image: string;
  };
  dojoGlow: {
    sub_title: string | undefined;
    title: string | undefined;
    text: string | undefined;
    cta_primary_text: string | undefined;
    video_image: GQLImage;
    side_image_a: GQLImage;
    side_image_b: GQLImage;
    background: GQLImage;
    share_url: string | undefined;
  };
  brighterWays: {
    title: string | undefined;
    sub_title: string | undefined;
    text: string | undefined;
    image_a: GQLImage;
    image_b: GQLImage;
  };
  signUps: {
    title: string | undefined;
    sub_title: string | undefined;
    text: string | undefined;
    image_a: GQLImage;
    image_b: GQLImage;
    button_text: string | undefined;
  };
  saveTime: {
    title: string | undefined;
    sub_title: string | undefined;
    text: string | undefined;
    image: GQLImage;
    imageMobile: GQLImage;
    button_text: string | undefined;
  };
  giveYourSchool: {
    title: string | undefined;
    text: string | undefined;
    image: GQLImage;
  };
  givePoints: {
    title: string | undefined;
    text: string | undefined;
    image_a: GQLImage;
    image_b: GQLImage;
    card_primary_text: string | undefined;
    card_sub_title: string | undefined;
    card_secondary_text: string | undefined;
    card_image: GQLImage;
  };
  panels_a: {
    panel_left: {
      title: string | undefined;
      text: string | undefined;
      image: GQLImage;
      helper_text: string | undefined;
      cta_primary_text: string | undefined;
      share_url: string | undefined;
    };
    panel_right: {
      title: string | undefined;
      text: string | undefined;
      image: GQLImage;
    };
  };
  yourNewSideKick: {
    title: string | undefined;
    sub_title: string | undefined;
    text: string | undefined;
    cta_primary_button: string | undefined;
  };
  panels_b: {
    panel_left: {
      title: string | undefined;
      text: string | undefined;
      image: GQLImage;
    };
    panel_right: {
      title: string | undefined;
      text: string | undefined;
      image: GQLImage;
      cta_primary_text: string | undefined;
    };
    main: {
      cta_primary_text: string | undefined;
    };
  };
  dojoIslands: {
    logo: string | undefined;
    title_a: string | undefined;
    text_a: string | undefined;
    cta_primary_text: string | undefined;
    image_a: GQLImage;
    title_b: string | undefined;
    text_b: string | undefined;
    image_b: GQLImage;
    title_c: string | undefined;
    image_c_1: GQLImage;
    image_c_2: GQLImage;
    image_c_3: GQLImage;
    cta_secondary_text: string | undefined;
    cube_1: GQLImage;
    cube_2: GQLImage;
    cube_3: GQLImage;
  };
  panels_c: {
    panel_left_top: {
      title: string | undefined;
      text: string | undefined;
      image: GQLImage;
    };
    panel_right_top: {
      title: string | undefined;
      text: string | undefined;
      image: GQLImage;
    };
    panel_left_bottom: {
      title: string | undefined;
      text: string | undefined;
      image: GQLImage;
    };
    panel_right_bottom: {
      title: string | undefined;
      text: string | undefined;
      image: GQLImage;
    };
    main: {
      title: string | undefined;
      text: string | undefined;
    };
  };
  mostImportantly: {
    title: string | undefined;
    side_image_a: GQLImage;
    side_image_b: GQLImage;
  };
}

export const useDojoGlow = () => {
  const value = useContext(DojoGlowContext);

  if (!value) {
    throw new Error("must be used within a DojoGlowProvider");
  }

  return value;
};

export const DojoGlowContext = React.createContext<DojoGlowState | undefined>(undefined);

// hero_c_image: file(relativePath: { eq: "dojo-glow/announcements-illustration.png" }) {
//       publicURL
//     }
//     hero_d_image: file(relativePath: { eq: "dojo-glow/announcements-illustration.png" }) {
//       publicURL
//     }
//     panels_a_panel_left_image: file(relativePath: { eq: "dojo-glow/announcements-illustration.png" }) {
//       publicURL
//     }
//     panels_a_panel_right_image: file(relativePath: { eq: "dojo-glow/announcements-illustration.png" }) {
//       publicURL
//     }
//     panels_b_panel_left_image: file(relativePath: { eq: "dojo-glow/announcements-illustration.png" }) {
//       publicURL
//     }
//     panels_b_panel_right_image: file(relativePath: { eq: "dojo-glow/announcements-illustration.png" }) {
//       publicURL
//     }
//     panels_c_panel_left_top_image: file(relativePath: { eq: "dojo-glow/announcements-illustration.png" }) {
//       publicURL
//     }
//     panels_c_panel_right_top_image: file(relativePath: { eq: "dojo-glow/announcements-illustration.png" }) {
//       publicURL
//     }
//     panels_c_panel_left_bottom_image: file(relativePath: { eq: "dojo-glow/announcements-illustration.png" }) {
//       publicURL
//     }
//     panels_c_panel_right_bottom_image: file(relativePath: { eq: "dojo-glow/announcements-illustration.png" }) {
//       publicURL
//     }
//     hero_e_side_image_a: file(relativePath: { eq: "dojo-glow/announcements-illustration.png" }) {
//       publicURL
//     }

const QUERY = graphql`
  query {
    hero_a_side_image_a: file(relativePath: { eq: "dojo-glow/hero1.svg" }) {
      publicURL
    }
    hero_a_side_image_b: file(relativePath: { eq: "dojo-glow/hero2.svg" }) {
      publicURL
    }
    hero_a_video_image: file(relativePath: { eq: "dojo-glow/video-preview.png" }) {
      publicURL
    }
    hero_b_image_b: file(relativePath: { eq: "dojo-glow/brighter-ways.svg" }) {
      publicURL
    }
    hero_c_image: file(relativePath: { eq: "dojo-glow/illustration-clock.png" }) {
      publicURL
    }
    hero_c_image_mobile: file(relativePath: { eq: "dojo-glow/mobile-time.png" }) {
      publicURL
    }
    hero_d_image: file(relativePath: { eq: "dojo-glow/glow-up.png" }) {
      publicURL
    }
    banner_a_image_b: file(relativePath: { eq: "dojo-glow/illustration-points.png" }) {
      publicURL
    }
    panels_a_panel_left_image: file(relativePath: { eq: "dojo-glow/announcements-illustration.png" }) {
      publicURL
    }
    panels_a_panel_right_image: file(relativePath: { eq: "dojo-glow/translation.png" }) {
      publicURL
    }
    panels_b_panel_left_image: file(relativePath: { eq: "dojo-glow/stories.png" }) {
      publicURL
    }
    panels_b_panel_right_image: file(relativePath: { eq: "dojo-glow/thread.png" }) {
      publicURL
    }
    banner_c_image_a: file(relativePath: { eq: "dojo-glow/banner-v2.png" }) {
      publicURL
    }
    banner_c_image_b: file(relativePath: { eq: "dojo-glow/math_house_ss_rough.png" }) {
      publicURL
    }
    banner_c_image_c_1: file(relativePath: { eq: "dojo-glow/super_food.png" }) {
      publicURL
    }
    banner_c_image_c_2: file(relativePath: { eq: "dojo-glow/board_game.png" }) {
      publicURL
    }
    banner_c_image_c_3: file(relativePath: { eq: "dojo-glow/friendship_castle.png" }) {
      publicURL
    }
    sign_ups_image_a: file(relativePath: { eq: "dojo-glow/pencil_checkbox.png" }) {
      publicURL
    }
    sign_ups_image_b: file(relativePath: { eq: "dojo-glow/signups.png" }) {
      publicURL
    }
    panels_c_panel_left_top_image: file(relativePath: { eq: "dojo-glow/searchable-messages.png" }) {
      publicURL
    }
    panels_c_panel_right_top_image: file(relativePath: { eq: "dojo-glow/dojo-photobooks.jpg" }) {
      publicURL
    }
    panels_c_panel_left_bottom_image: file(relativePath: { eq: "dojo-glow/videos-message.png" }) {
      publicURL
    }
    panels_c_panel_right_bottom_image: file(relativePath: { eq: "dojo-glow/events.png" }) {
      publicURL
    }
    hero_e_side_image_a: file(relativePath: { eq: "dojo-glow/footer-left.svg" }) {
      publicURL
    }
    hero_e_side_image_b: file(relativePath: { eq: "dojo-glow/footer-right.svg" }) {
      publicURL
    }
    card_image: file(relativePath: { eq: "dojo-glow/caitlin.jpg" }) {
      publicURL
    }
    hero_a_background: file(relativePath: { eq: "dojo-glow/stars-bg.svg" }) {
      publicURL
    }
    banner_c_cube_1: file(relativePath: { eq: "dojo-glow/cube_yellow.png" }) {
      publicURL
    }
    banner_c_cube_2: file(relativePath: { eq: "dojo-glow/cube_purple.png" }) {
      publicURL
    }
    banner_c_cube_3: file(relativePath: { eq: "dojo-glow/cube_blue.png" }) {
      publicURL
    }
  }
`;

const PLACEHOLDER_IMAGE = {
  publicURL: "https://via.placeholder.com/150",
};

const useMockedImages = () => {
  return {
    hero_a_side_image_a: PLACEHOLDER_IMAGE,
    hero_a_side_image_b: PLACEHOLDER_IMAGE,
    hero_c_image: PLACEHOLDER_IMAGE,
    hero_d_image: PLACEHOLDER_IMAGE,
    panels_a_panel_left_image: PLACEHOLDER_IMAGE,
    panels_a_panel_right_image: PLACEHOLDER_IMAGE,
    panels_b_panel_left_image: PLACEHOLDER_IMAGE,
    panels_b_panel_right_image: PLACEHOLDER_IMAGE,
    panels_c_panel_left_top_image: PLACEHOLDER_IMAGE,
    panels_c_panel_right_top_image: PLACEHOLDER_IMAGE,
    panels_c_panel_left_bottom_image: PLACEHOLDER_IMAGE,
    panels_c_panel_right_bottom_image: PLACEHOLDER_IMAGE,
    hero_e_side_image_a: PLACEHOLDER_IMAGE,
    hero_e_side_image_b: PLACEHOLDER_IMAGE,
    hero_b_image_a: PLACEHOLDER_IMAGE,
    hero_b_image_b: PLACEHOLDER_IMAGE,
    banner_a_image_a: PLACEHOLDER_IMAGE,
    banner_a_image_b: PLACEHOLDER_IMAGE,
    banner_c_image_a: PLACEHOLDER_IMAGE,
    banner_c_image_b: PLACEHOLDER_IMAGE,
    banner_c_image_c_1: PLACEHOLDER_IMAGE,
    banner_c_image_c_2: PLACEHOLDER_IMAGE,
    banner_c_image_c_3: PLACEHOLDER_IMAGE,
    hero_a_video_image: PLACEHOLDER_IMAGE,
  };
};

export const DojoGlowProvider = ({ children }: { children: ReactNode }) => {
  const t = useContext(TranslationContext);
  const gqlData = useStaticQuery(QUERY);
  const mockedData = useMockedImages();

  const data = { ...mockedData, ...gqlData };

  const getTranslation = (value: string) => {
    return t.translate(`directus.page_dojo_glow.${value}`)?.toString();
  };

  const value: DojoGlowState = {
    stickyHeader: {
      share_button_text: getTranslation("hero_a_cta_primary_text"), //NOTE: temporary to make it work, we should add the key to directus
      share_url: "https://www.classdojo.com/dojoglow/?utm_source=share_button&utm_campaign=teachers_whats_new",
    },
    share: {
      title: "Make back to school shine with the new ClassDojo",
      text: "Check out the new ClassDojo with easier ways to engage families than ever before. From Signups for easy parent scheduling, to 130+ instant language translations. Check out the new ClassDojo, and get your Dojo Glow!",
      image: "xxxx",
    },
    dojoGlow: {
      sub_title: getTranslation("hero_a_sub_title"),
      title: getTranslation("hero_a_title"),
      text: getTranslation("hero_a_text"),
      cta_primary_text: getTranslation("hero_a_cta_primary_text"),
      video_image: data.hero_a_video_image,
      side_image_a: data.hero_a_side_image_a,
      side_image_b: data.hero_a_side_image_b,
      background: data.hero_a_background,
      share_url: "https://www.classdojo.com/dojoglow/?utm_source=share_button&utm_campaign=teachers_whats_new",
    },
    brighterWays: {
      title: getTranslation("hero_b_title"),
      sub_title: getTranslation("hero_b_sub_title"),
      text: getTranslation("hero_b_text"),
      image_a: data.hero_b_image_a,
      image_b: data.hero_b_image_b,
    },
    signUps: {
      title: getTranslation("sign_ups_title"),
      sub_title: getTranslation("sign_ups_sub_title"),
      text: getTranslation("sign_ups_text"),
      image_a: data.sign_ups_image_a,
      image_b: data.sign_ups_image_b,
      button_text: getTranslation("sign_ups_button_text"), //"Try now",
    },
    saveTime: {
      title: getTranslation("hero_c_title"),
      sub_title: getTranslation("hero_c_sub_title"),
      text: getTranslation("hero_c_text"),
      image: data.hero_c_image,
      imageMobile: data.hero_c_image_mobile,
      button_text: getTranslation("hero_c_button_text"), //"Try now",
    },
    giveYourSchool: {
      title: getTranslation("hero_d_title"),
      text: getTranslation("hero_d_text"),
      image: data.hero_d_image,
    },
    givePoints: {
      title: getTranslation("banner_a_title"),
      text: getTranslation("banner_a_text"),
      image_a: data.banner_a_image_a,
      image_b: data.banner_a_image_b,
      card_image: data.card_image,
      card_primary_text: getTranslation("card_primary_text"),
      card_secondary_text: getTranslation("card_secondary_text"),
      card_sub_title: getTranslation("card_sub_title"),
    },
    panels_a: {
      panel_left: {
        title: getTranslation("panel_a_panel_left_title"),
        text: getTranslation("panel_a_panel_left_text"),
        image: data.panels_a_panel_left_image,
        helper_text: getTranslation("panel_a_panel_left_helper_text"),
        cta_primary_text: getTranslation("panel_a_panel_left_cta_primary_text"),
        share_url:
          "https://www.classdojo.com/sayhello/?utm_source=dojo_glow_lp&utm_medium=share_with_principal_cta&utm_campaign=teachers_whats_new",
      },
      panel_right: {
        title: getTranslation("panel_a_panel_right_title"),
        text: getTranslation("panel_a_panel_right_text"),
        image: data.panels_a_panel_right_image,
      },
    },
    yourNewSideKick: {
      title: getTranslation("banner_b_title"),
      sub_title: getTranslation("banner_b_sub_title"),
      text: getTranslation("banner_b_text"),
      cta_primary_button: getTranslation("banner_b_cta_primary_button"),
    },
    panels_b: {
      panel_left: {
        title: getTranslation("panels_b_panel_left_title"),
        text: getTranslation("panels_b_panel_left_text"),
        image: data.panels_b_panel_left_image,
      },
      panel_right: {
        title: getTranslation("panels_b_panel_right_title"),
        text: getTranslation("panels_b_panel_right_text"),
        image: data.panels_b_panel_right_image,
      },
      main: {
        cta_primary_text: getTranslation("panels_b_main_cta_primary_text"),
      },
    },
    dojoIslands: {
      logo: getTranslation("banner_c_logo"),
      title_a: getTranslation("banner_c_title_a"),
      text_a: getTranslation("banner_c_text_a"),
      cta_primary_text: getTranslation("banner_c_cta_primary_text"),
      image_a: data.banner_c_image_a,
      title_b: getTranslation("banner_c_title_b"),
      text_b: getTranslation("banner_c_text_b"),
      image_b: data.banner_c_image_b,
      title_c: getTranslation("banner_c_title_c"),
      image_c_1: data.banner_c_image_c_1,
      image_c_2: data.banner_c_image_c_2,
      image_c_3: data.banner_c_image_c_3,
      cta_secondary_text: getTranslation("banner_c_cta_secondary_text"),
      cube_1: data.banner_c_cube_1,
      cube_2: data.banner_c_cube_2,
      cube_3: data.banner_c_cube_3,
    },
    panels_c: {
      panel_left_top: {
        title: getTranslation("panels_c_panel_left_top_title"),
        text: getTranslation("panels_c_panel_left_top_text"),
        image: data.panels_c_panel_left_top_image,
      },
      panel_right_top: {
        title: getTranslation("panels_c_panel_right_top_title"),
        text: getTranslation("panels_c_panel_right_top_text"),
        image: data.panels_c_panel_right_top_image,
      },
      panel_left_bottom: {
        title: getTranslation("panels_c_panel_left_bottom_title"),
        text: getTranslation("panels_c_panel_left_bottom_text"),
        image: data.panels_c_panel_left_bottom_image,
      },
      panel_right_bottom: {
        title: getTranslation("panels_c_panel_right_bottom_title"),
        text: getTranslation("panels_c_panel_right_bottom_text"),
        image: data.panels_c_panel_right_bottom_image,
      },
      main: {
        title: getTranslation("panels_c_main_title"),
        text: getTranslation("panels_c_main_text"),
      },
    },
    mostImportantly: {
      title: getTranslation("hero_e_title"),
      side_image_a: data.hero_e_side_image_a,
      side_image_b: data.hero_e_side_image_b,
    },
  };

  return <DojoGlowContext.Provider value={value}>{children}</DojoGlowContext.Provider>;
};
