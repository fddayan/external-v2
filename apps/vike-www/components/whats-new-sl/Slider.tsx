import { range } from "lodash";
import React, { useContext } from "react";
import { Flex } from "../Boxes";
import Translate from "../translation/Translate";
import { TranslationContext } from "../translation/TranslationContext";
import { useWhatsNewSL } from "./context";
import StickyCarousel from "./StickyCarousel/StickyCarousel";
import { BlackButtonLink, Display2, Headline2, LinkButton, StickyCarouselWrapper } from "./StickyCarousel/styles";
import { Headline3 } from "./StickyCarousel/styles";
import { TryItOut } from "./styles";

export const Slider = () => {
  const { slider } = useWhatsNewSL();
  const openCalendly = (id: string) => {
    throw new Error("Not implemented");
  };

  const textSlots = {
    carousel_primary_cta_copy: "directus.page_schoolleader_2024.carousel_primary_cta_copy",
    carousel_secondary_cta_copy: "directus.page_schoolleader_2024.carousel_secondary_cta_copy",
  };

  return (
    <StickyCarouselWrapper>
      <StickyCarousel
        openCalendly={openCalendly}
        content={slider}
        textSlots={textSlots}
        renderImage={({ imageFilenameDisk }, index, activePanel) => (
          <img
            key={index}
            src={`https://static.classdojo.com/uploads/${imageFilenameDisk}`}
            alt={`Panel ${index}`}
            style={{ opacity: index === activePanel ? 1 : 0 }}
          />
        )}
        renderContent={({ title, subTitle, paragraph, link, iconFilenameDisk, show_button }) => {
          return (
            <Flex flexDirection="row" css={{ width: "100%", position: "relative" }}>
              <div className="content-container" css={{ flex: 1 }}>
                <img
                  src={`https://static.classdojo.com/uploads/${iconFilenameDisk}`}
                  alt="icon"
                  width={100}
                  className="icon"
                />
                <Headline3 css={{ color: "#2C2A50", textTransform: "uppercase" }}>{subTitle}</Headline3>
                <Display2 css={{ color: "#2C2A50" }} dangerouslySetInnerHTML={{ __html: title }} />
                <Headline2 css={{ color: "#2C2A50" }}>{paragraph}</Headline2>
                {show_button && <TryItOut href={link} color="#2C2A50" />}
              </div>
            </Flex>
          );
        }}
      />
    </StickyCarouselWrapper>
  );
};
