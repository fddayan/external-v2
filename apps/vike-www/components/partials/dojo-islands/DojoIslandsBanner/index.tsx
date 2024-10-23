import { Heading } from "@src/components/new-nessie";
import Translate from "@src/components/translation/Translate";
import { graphql, useStaticQuery } from "gatsby";
import React, { useEffect } from "react";
import * as S from "./styles";
import { logEvent } from "@src/utils/logClient";
import GatsbyImageWrapper from "@src/components/GatsbyImageWrapper";

interface DojoIslandsBannerProps {
  utmParam: string;
}

const DojoIslandsBanner: React.FC<DojoIslandsBannerProps> = ({ utmParam }) => {
  const gqlData = useStaticQuery(graphql`
    {
      directus {
        page_dojo_islands_2023 {
          hero_image {
            filename_disk
          }
        }
      }
    }
  `);

  const {
    directus: {
      page_dojo_islands_2023: { hero_image: logo },
    },
  } = gqlData;

  useEffect(() => {
    logEvent({ eventName: "web.external_page.dojo_islands.load_banner", eventValue: utmParam });
  }, []);

  return (
    <S.Background>
      <S.StyledContainer>
        <S.Logo image={logo} alt="" />
        <Heading css={{ margin: 0 }}>
          <Translate path="directus.page_dojo_islands_2023.cta_section_title" />
        </Heading>
        <S.StyledLink
          to={`/dojo-islands?utm_campaign=DojoIslands&utm_medium=${utmParam}`}
          onClick={() =>
            logEvent({ eventName: "web.external_page.dojo_islands.banner_cta", eventValue: window.location.href })
          }
        >
          <Translate path="directus.page_dojo_islands_2023.cta_section_cta_label" />
        </S.StyledLink>
      </S.StyledContainer>
    </S.Background>
  );
};

export default DojoIslandsBanner;
