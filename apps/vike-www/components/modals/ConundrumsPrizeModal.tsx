import React, { useContext } from "react";
import CommonModal, { CommonModalProps } from "./CommonModal";
import isMobile from "@src/utils/isMobile";
import { graphql, useStaticQuery } from "gatsby";
import { TranslationContext } from "@src/components/translation/TranslationContext";

const ConundrumsPrizeModal = (props: CommonModalProps) => {
  const data = useStaticQuery(graphql`
    query {
      directus {
        conundrums_page {
          videos: video
        }
      }
    }
  `);

  const {
    directus: {
      conundrums_page: { videos },
    },
  } = data;

  const t = useContext(TranslationContext);

  return (
    <CommonModal noHeader fullScreen={isMobile().apple.device} {...props}>
      {t.translate("directus.conundrums_page.terms_conditions_html")}
    </CommonModal>
  );
};

export default ConundrumsPrizeModal;
