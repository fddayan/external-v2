import React from "react";
import { Flex } from "../Boxes";
import styled from "@emotion/styled";
import Translate from "@src/components/translation/Translate";
import { useWhatsNewSL } from "./context";
import { Heading, SubText } from "./styles";
import { GImage } from "../GImage";
import { Button } from "../nessie-web";
import { logEvent } from "@src/utils/logClient";

const Banner = styled(Flex)`
  border-radius: 24px;
  border: 1px solid rgba(26, 25, 45, 0.03);
  background: #f6f7ff;
  text-align: center;
`;

export const BannerB = () => {
  const {
    images: { note, privacyLogos },
  } = useWhatsNewSL();

  const handleLearnOn = () => {
    logEvent({
      eventName: "web.external.page_whats_new_2024_sl.learn_more",
      eventValue: window.location.href,
    });
  };

  return (
    <Banner flexDirection="column" alignItems="center" width="100%" padding={50} css={{ gap: 30 }}>
      <GImage img={note} alt="playing in card" css={{ maxWidth: 500 }} />
      <Heading>
        <Translate path="directus.page_whats_new_2024_sl.banber_b_title" />
      </Heading>
      <SubText>
        <Translate path="directus.page_whats_new_2024_sl.banner_b_text" />
      </SubText>
      <GImage img={privacyLogos} alt="playing in card" css={{ maxWidth: 500 }} />
      <Button kind="plus" href="/privacycenter" onClick={handleLearnOn}>
        Learn more
      </Button>
    </Banner>
  );
};
