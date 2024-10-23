import React, { useState, useContext } from "react";
import styled from "@emotion/styled";
import { theme, Space, Subheading, BodyText } from "@src/components/nessie-web";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { graphql, useStaticQuery } from "gatsby";
import { defaultNormalizeStaticQueryResult } from "@src/utils/normalize-static-query-result";

const {
  colors: { dt_aqua10, dt_aqua50 },
  radii: { dt_radius_s },
} = theme;

const FAQTileContainer = styled.div<{ bg_white: boolean }>`
  width: 100%;
  padding: 24px;
  text-align: left;
  background-color: ${(props) => (props.bg_white ? "#fff" : dt_aqua10)};
  border-radius: ${dt_radius_s};
  margin-bottom: 12px;
`;

const FAQTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  cursor: pointer;
`;

const FAQContent = styled(BodyText)<{ show: boolean }>`
  width: 100%;
  height: ${(props) => (props.show ? "auto" : "0px")};
  overflow: hidden;
  padding-top: ${(props) => (props.show ? "16px" : "0px")};

  a {
    color: ${dt_aqua50};
  }
  ul {
    display: block;
    li {
      list-style: disc;
      margin-left: 20px;
    }
  }
`;

const CaretImage = styled.img<{ flip: boolean }>`
  width: 10px;
  height: 6px;
  margin-left: 12px;
  margin-top: 10px;
  transform: ${(props) => (props.flip ? "rotate(180deg)" : "unset")};
`;

type FAQTileProps = {
  faq_item_title: string;
  faq_item_content: string;
  faq_item_caret_alt: string;
  faq_item_bg_white?: boolean;
};

const FAQTile: React.FC<FAQTileProps> = ({
  faq_item_title,
  faq_item_content,
  faq_item_caret_alt,
  faq_item_bg_white = false,
}) => {
  const data = useStaticQuery(graphql`
    query {
      directus {
        page_schools {
          faq_item_caret_image {
            id
            filename_disk
          }
        }
      }
    }
  `);

  defaultNormalizeStaticQueryResult(data);

  const {
    directus: {
      page_schools: { faq_item_caret_image },
    },
  } = data;
  const t = useContext(TranslationContext);

  const [toggleFAQTile, setToggleFAQTile] = useState(false);

  const toggleTileHandler = () => {
    setToggleFAQTile(!toggleFAQTile);
  };

  return (
    <FAQTileContainer bg_white={faq_item_bg_white}>
      <FAQTitle onClick={toggleTileHandler}>
        <Subheading>{t.translate(faq_item_title)}</Subheading>
        <CaretImage
          src={faq_item_caret_image.file.publicURL}
          alt={t.translate(faq_item_caret_alt) as string}
          flip={toggleFAQTile}
        />
      </FAQTitle>
      <FAQContent show={toggleFAQTile}>{t.translate(faq_item_content)}</FAQContent>
    </FAQTileContainer>
  );
};

export default FAQTile;
