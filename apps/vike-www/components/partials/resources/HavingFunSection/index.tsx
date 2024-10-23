import React from "react";
import { theme, Title } from "@src/components/nessie-web";
import havingFunIllustration from "@src/assets/images/resources/having-fun.svg";
import { HavingFunHolder, HavingFunIllustration, HavingFunTitle } from "./styles";
import Translate from "@src/components/translation/Translate";

const {
  colors: { dt_blueberry20 },
} = theme;

const GettingStartedSection: React.FC = () => {
  return (
    <HavingFunHolder bgColor={dt_blueberry20} id="surprise">
      <HavingFunTitle size={2}>
        <Translate path="directus.page_resources_2023.having_fun_heading" />
      </HavingFunTitle>
      <HavingFunIllustration src={havingFunIllustration} />
    </HavingFunHolder>
  );
};

export default GettingStartedSection;
