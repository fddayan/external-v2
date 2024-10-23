import React from "react";
import Container from "@src/components/Container";
import { Caption, Headline1, GradientContainer, BlobBackground, Blockquote } from "./styles";
import Translate from "@src/components/translation/Translate";

const TestimonialSection = ({ headshot, author }) => {
  return (
    <Container marginBottom={80}>
      <BlobBackground>
        <img src={`https://static.classdojo.com/uploads/${headshot}`} alt="" />
        <Blockquote>
          <Translate path="directus.page_schoolleader_2024.testimonial_quote" />
        </Blockquote>
        <Headline1 className="author">{author}</Headline1>
        <Caption css={{ color: "#8689B8" }}>
          <Translate path="directus.page_schoolleader_2024.testimonial_location" />
        </Caption>
      </BlobBackground>
    </Container>
  );
};

export default TestimonialSection;
