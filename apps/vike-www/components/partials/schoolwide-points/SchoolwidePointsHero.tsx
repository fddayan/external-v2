import React from "react";
import Container from "@src/components/Container";
import { Display1, Headline2 } from "../schoolleader/styles";
import Translate from "@src/components/translation/Translate";
import { Button } from "@src/components/nessie-web";
import PlayVideoContainer from "../shared/PlayVideoContainer";
import { logEvent } from "@src/utils/logClient";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";

const SchoolwidePointsHero = ({ setShowFormModal }) => {
  const modalContext = React.useContext(ModalContext);

  const openModal = () => {
    setShowFormModal(true);
    logEvent("web.external.schoolwide_points.hero_cta.click");
  };

  const handleClick = () => {
    logEvent("web.external.schoolwide_points.hero_signup.click");
    modalContext.showModal(ModalType.TeacherSignup);
  };

  return (
    <div css={{ backgroundImage: "linear-gradient(180deg, #D1EBFF 20.12%, #9A7CFF 67.46%, #6B34E2 100%);" }}>
      <Container
        css={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 24,
          paddingBlock: 48,
        }}
      >
        <Display1 css={{ maxWidth: 700, textAlign: "center" }}>
          <Translate path="directus.page_schoolwide_points.Hero_title" />
        </Display1>
        <Headline2>
          <Translate path="directus.page_schoolwide_points.Hero_subtitle" />
        </Headline2>
        <div css={{ display: "flex", flexDirection: "row", gap: "16px" }}>
          <Button kind="plus" onClick={openModal}>
            <Translate path="directus.page_schoolwide_points.Hero_cta" />
          </Button>
          <Button kind="secondary" onClick={handleClick}>
            <Translate path="directus.page_schoolwide_points.hero_signup" />
          </Button>
        </div>
        <PlayVideoContainer videoId="sexbHSq2MnM" eventName="web.external.schoolwide_points.video_play" />
      </Container>
    </div>
  );
};

export default SchoolwidePointsHero;
