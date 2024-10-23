import Container from "@src/components/Container";
import React, { useState, useEffect } from "react";
import { WhatsNewSLProvider } from "./context";
import { Slider } from "./Slider";
import { SectionC } from "./SectionC";
import { BannerB } from "./BannerB";
import { HeroC } from "./HeroC";
import { SectionA } from "./SectionA";
import { BannerA } from "./BannerA";
import { HeroB } from "./HeroB";
import { HeroA } from "./HeroA";
import { HeroD } from "./HeroD";
import styled from "@emotion/styled";
import { mediaQueriesMax } from "@src/styles/theme";
import StickyHeader from "./StickyHeader";
import MobileSlider from "./MobileSlider";
import SEO from "@src/components/SEO";
import { getQueryParams } from "react-use-query-param-string";
import { isEmpty } from "lodash";

const CustomContainer = styled.div`
  width: 100%;
  background-image: url(https://static.classdojo.com/uploads/64084124-d990-4cb2-9775-0137bd2dabbe.svg),
    url(https://static.classdojo.com/uploads/42650649-5fa8-431e-a6c8-c18faece800e.svg);
  background-position: left 50px, right 20px;
  background-repeat: no-repeat, no-repeat;
  ${mediaQueriesMax[0]} {
    background-size: 100px, 100px;
    background-position: left 150px, right 120px;
  }
`;

const InnerContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 100px;
  padding-bottom: 100px;
  maxwidth: 1000px;
  ${mediaQueriesMax[1]} {
    gap: 30px;
  }
`;
const getUTM = (params) => {
  if (params === null) return {};
  if (isEmpty(params)) return {};

  const utm = {};

  for (const key of Object.keys(params)) {
    if (key.startsWith("utm_")) {
      utm[key] = params[key];
    }
  }

  return utm;
};
export default function WhatsNewSLPage() {
  const [utmParams, setUtmParams] = useState({});

  useEffect(() => {
    const params = getQueryParams();
    const utms = getUTM(params);
    setUtmParams(utms);
  }, []);

  return (
    <WhatsNewSLProvider>
      <SEO
        title="directus.page_whats_new_2024_sl.seo_title"
        description="directus.page_whats_new_2024_sl.seo_description"
        image="https://static.classdojo.com/uploads/59d05cdd-9d1a-48d2-9cd1-f11d768e5e98.png"
        twitter={{
          card: "summary_large_image",
          site: "@classdojo",
          creator: "@classdojo",
          title: "directus.page_whats_new_2024_sl.seo_title",
          description: "directus.page_whats_new_2024_sl.seo_description",
        }}
      />
      <StickyHeader scrollY={300} utmParams={utmParams} />
      <CustomContainer>
        <InnerContainer>
          <HeroA utmParams={utmParams} />
          <HeroB />
          <BannerA />
          <SectionA />
          <HeroC />
          <Slider />
          <MobileSlider />
          <HeroD />
          <SectionC />
          <BannerB />
        </InnerContainer>
      </CustomContainer>
    </WhatsNewSLProvider>
  );
}
