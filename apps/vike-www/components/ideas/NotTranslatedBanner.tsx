import React from "react";
import styled from "@emotion/styled";
import { Subheading, theme } from "../nessie-web";
import T from "../translation/Translate";
import { getRelativePath } from "@src/utils/routes";

const Banner = styled("div")`
  background-color: ${theme.colors.aqua20};
  padding: ${theme.space.s}px ${theme.space.l}px;
  border-radius: 9999px;
  margin-bottom: ${theme.space.l}px;
`;

const BannerText = styled(Subheading)`
  color: ${theme.colors.taro50};
`;

const NotTranslatedBanner = () => (
  <Banner>
    <BannerText>
      <T path="ideas.not_translated_message" />{" "}
      <a href={getRelativePath("/")}>
        <T path="ideas.not_translated_cta" />
      </a>
    </BannerText>
  </Banner>
);

export default NotTranslatedBanner;
