import React from "react";
import styled from "@emotion/styled";
import { Button } from "@src/components/new-nessie";
import Translate from "@src/components/translation/Translate";
import { logEvent } from "@src/utils/logClient";

const Cta = styled(Button)`
  background-color: #1a192d;
  position: fixed;
  right: 50%;
  transform: translateX(50%);
  bottom: 24px;
  z-index: 99;
`;

export type DojoIslandsCtaProps = {
  dojoIslandsDeepLink: string;
  label: string;
};

const DojoIslandsCta: React.FC<DojoIslandsCtaProps> = (props) => {
  return (
    <Cta
      onClick={() => logEvent({ eventName: "web.external_page.dojo_islands.main_cta.click" })}
      as="a"
      target="_blank"
      rel="noreferrer"
      href={props.dojoIslandsDeepLink}
    >
      <Translate path={props.label} />
    </Cta>
  );
};

export default DojoIslandsCta;
