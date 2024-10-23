import React, { useEffect } from "react";
import s from "@emotion/styled";
import Link from "@src/components/UTMLink";
import { getRelativePath } from "@src/utils/routes";
import { DetailAction, DetailText, Button } from "./nessie-web";
import Translate from "@src/components/translation/Translate";
import { logEvent } from "@src/utils/logClient";
import { ExternalSwitches } from "@src/utils/experiments/constants";

const FloatingCTAWrapper = s.div`
  position: sticky;
  bottom: 0;
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
  div {
    margin: auto;
    padding: 12px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    gap: 6px;
    border-radius: 30px;
    background: #2C2A50;
    box-shadow: 0px 6px 0px 0px rgba(45, 64, 150, 0.06);
  }

`;

const FloatingCTA: React.FC = () => {
  useEffect(() => {
    logEvent({
      eventName: "web.external.tryitout.load_floating_cta",
    });
  }, []);

  return (
    <FloatingCTAWrapper>
      <div>
        <DetailText color="dt_white" css={{ paddingLeft: 20, paddingRight: 20 }}>
          <Translate path="try_it_out.new_to_classdojo" />
        </DetailText>{" "}
        <Button
          navigateTo={getRelativePath("/tryitout")}
          size="s"
          onClick={() =>
            logEvent({
              eventName: "web.external.tryitout.click_floating_cta",
            })
          }
        >
          <Translate path="try_it_out.play" />
        </Button>
      </div>
    </FloatingCTAWrapper>
  );
};

export default FloatingCTA;
