import React from "react";
import Container from "@src/components/Container";
import { Caption, Headline1, PurpleBox, Blockquote } from "./styles";
import Translate from "@src/components/translation/Translate";

const FactSection = ({ illustration }) => {
  return (
    <Container marginBottom={80}>
      <PurpleBox>
        <img src={`https://static.classdojo.com/uploads/${illustration}`} alt="" />
        <Caption css={{ color: "#F0E7FF" }}>
          <Translate path="directus.page_schoolleader_2024.testimonial_question" />
        </Caption>
        <Blockquote css={{ color: "#ffffff" }}>
          <Translate path="directus.page_schoolleader_2024.testimonial_fact" />
        </Blockquote>
      </PurpleBox>
    </Container>
  );
};

export default FactSection;
