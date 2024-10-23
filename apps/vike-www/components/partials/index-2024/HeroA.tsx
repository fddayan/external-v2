import * as React from "react";
import DojoIn90Seconds from "./DojoIn90Seconds";
import { alignItems, backgroundColor, justifyContent } from "styled-system";
import { Headline3, HeroRatingContainer, HeroContainer, HeroHeadline, HeroSubHeadline, HeroButton } from "./styles";
import { Button } from "@src/components/new-nessie";
import { Typography } from "@src/components/new-nessie/Typography2";
import Translate from "@src/components/translation/Translate";
import { BlackButton } from "./styles";
import Container from "@src/components/Container";
import { logEvent } from "@src/utils/logClient";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import { ExternalSwitches } from "@src/utils/experiments/constants";

const HeroA = () => {
  const modalContext = React.useContext(ModalContext);
  const openSignUpModal = () => {
    logEvent({
      eventValue: window.location.href,
      eventName: "web.external_page.homepage-2024.hero_a.sign_up.tap",
      experiments: [ExternalSwitches.WEB_EXTERNAL_HOMEPAGE_EXPERIMENT_2024],
    });
    modalContext.showModal(ModalType.Signup);
  };

  return (
    <div css={{ position: "relative" }}>
      <HeroContainer className="hero-a">
        <Container
          css={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 18,
            paddingBottom: 24,
            paddingInline: 24,
          }}
        >
          <HeroHeadline>
            <Translate path="directus.page_homepage_2024.Hero_headline" />
          </HeroHeadline>
          <HeroSubHeadline css={{ maxWidth: 770 }}>
            <Translate path="directus.page_homepage_2024.Hero_subheadline" />
          </HeroSubHeadline>
          <BlackButton size="l" onClick={openSignUpModal}>
            <Translate path="directus.page_homepage_2024.Hero_CTA_copy" />
          </BlackButton>
        </Container>
      </HeroContainer>
      <DojoIn90Seconds />
      <HeroRatingContainer>
        <img
          src="https://static.classdojo.com/uploads/cb00eb8a-3481-4d8e-9095-f6eb1cedea32.svg"
          alt=""
          css={{ marginLeft: -40 }}
          className="illustration"
        />
        <img src="https://static.classdojo.com/uploads/ebfc7ad7-1a3e-40df-838d-f38a1aed0d45.svg" alt="5" />
        <Headline3 css={{ maxWidth: 450, textAlign: "center" }}>
          <Translate path="directus.page_homepage_2024.Hero_star_rating_text" />
        </Headline3>
      </HeroRatingContainer>
    </div>
  );
};

export default HeroA;
