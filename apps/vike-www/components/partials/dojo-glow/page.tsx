import React, { useContext, useEffect } from "react";
import Container from "../../Container";
import { DojoGlowHero } from "./DojoGlowHero";
import { BrighterWays } from "./BrighterWays";
import { SaveTime } from "./SaveTime";
import { GiveYourSchool } from "./GiveYourSchool";
import { GivePoints } from "./GivePoints";
import { PanelsA_PanelLeft } from "./PanelsA_PanelLeft";
import { PanelsA_PanelRight } from "./PanelsA_PanelRight";
import { PanelsA } from "./PanelsA";
import { YourNewSideKick } from "./YourNewSideKick";
import { PanelsB_PanelLeft } from "./PanelsB_PanelLeft";
import { PanelsB_PanelRight } from "./PanelsB_PanelRight";
import { PanelsB } from "./PanelsB";
import { DojoIslands } from "./DojoIslands";
import { PanelsC } from "./PanelsC";
import { MostImportantly } from "./MostImportantly";
import SignUps from "./SignUps";
import { logEvent } from "@src/utils/logClient";
import { buildEventLog } from "./styles";
import StickyHeader from "./StickyHeader";
import { PanelsA_PanelC } from "./PanelsA_PanelC";
import styled from "@emotion/styled";
import { mediaQueriesMax } from "@src/styles/theme";
import SEO from "@src/components/SEO";
import { AppDataContext } from "@src/components/AppDataContext";

export const MainContainer = styled(Container)`
  display: flex;
  gap: 100px;
  flex-direction: column;
  ${mediaQueriesMax[1]} {
    gap: 60px;
    padding-right: 25px;
    padding-left: 25px;
  }
`;

export const DojoGlowPage = () => {
  useEffect(() => {
    logEvent({
      eventName: "web.external.dojo_glow.page_view",
      eventValue: window.location.href,
    });
  }, []);

  const shareButtonProps = { slug: "dojo-glow", language: "en" };
  const {
    data: { locale },
  } = useContext(AppDataContext);
  const showSidekickSection = locale === "en-us" || locale === "fr-ca";

  return (
    <>
      <SEO
        title="Make back to school shine with the new ClassDojo"
        description="Now there are more ways to connect with families than ever before—from Signups that help you easily schedule parent-teacher conferences and volunteers, to 130+ instant language translations. Check out the new ClassDojo, and get your Dojo Glow!"
        image="https://static.classdojo.com/uploads/783eea71-d940-4f74-9d05-c3ef0f9cb418.png"
      />
      <StickyHeader scrollY={300} {...shareButtonProps} />
      <DojoGlowHero {...shareButtonProps} />
      <MainContainer>
        <BrighterWays />
      </MainContainer>
      <SignUps />
      <SaveTime />
      <MainContainer>
        <GiveYourSchool />
        <GivePoints />
        <PanelsA>
          <PanelsA_PanelLeft />
          <PanelsA_PanelRight />
          <PanelsA_PanelC {...shareButtonProps} />
        </PanelsA>
        {showSidekickSection && <YourNewSideKick />}
        <PanelsB>
          <PanelsB_PanelLeft />
          <PanelsB_PanelRight />
        </PanelsB>
        <DojoIslands />
        <PanelsC />
      </MainContainer>
      <MostImportantly />
    </>
  );
};
