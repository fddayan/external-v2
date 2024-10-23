import React from "react";
import Container from "@src/components/Container";
import { Display2, Headline2, GradientContainer } from "./styles";
import Translate from "@src/components/translation/Translate";

const CommunicationSection = ({ illustration }) => {
  return (
    <Container marginBottom={80}>
      <GradientContainer>
        <div css={{ display: "flex", flexDirection: "column", maxWidth: 750, alignItems: "center", gap: 18 }}>
          <Display2 css={{ color: "#0C4689" }}>
            <Translate path="directus.page_schoolleader_2024.communication_heading" />
          </Display2>
          <Headline2 css={{ color: "#0C4689" }}>
            <Translate path="directus.page_schoolleader_2024.communication_body" />
          </Headline2>
          <div
            css={{
              overflow: "hidden",
              borderTopLeftRadius: 50,
              marginTop: 50,
              borderTopRightRadius: 50,
              borderBottom: "solid 1px #E6E6E6",
              boxShadow:
                "0px 3px 3px 0px rgba(83, 88, 135, 0.30), 10px 4px 25px 8px rgba(0, 0, 0, 0.08), 0px -1px 1px 0px rgba(0, 0, 0, 0.10) inset",
            }}
          >
            <video
              width="313"
              autoPlay
              loop
              muted
              playsInline
              src="https://static.classdojo.com/img/2024/03/translate-animation.mp4"
              css={{ display: "block" }}
            />
          </div>
        </div>
      </GradientContainer>
    </Container>
  );
};

export default CommunicationSection;
