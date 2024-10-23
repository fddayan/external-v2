import React, { useState, useContext } from "react";
import styled from "@emotion/styled";
import { theme, Subheading, BodyText } from "@src/components/nessie-web";
import { TranslationContext } from "@src/components/translation/TranslationContext";

const {
  colors: { dt_aqua50, dt_taro20 },
} = theme;

const FAQTileContainer = styled.div<{ index: number }>`
  width: 100%;
  padding: 24px;
  text-align: left;
  margin-bottom: 12px;
  border-bottom: 2px solid ${dt_taro20};
  ${(props) => (props.index === 1 ? "border-top: 2px solid " + dt_taro20 : "")}
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

const minusBG = `data:image/svg+xml,%3Csvg width='20' height='21' viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M10 0.500244C4.47154 0.500244 0 4.97179 0 10.5002C0 16.0287 4.47154 20.5002 10 20.5002C15.5285 20.5002 20 16.0287 20 10.5002C20 4.97179 15.5285 0.500244 10 0.500244ZM14.5122 11.6385H5.56911C4.9187 11.6385 4.39024 11.11 4.39024 10.4596C4.39024 9.80919 4.9187 9.28073 5.56911 9.28073H14.5122C15.1626 9.28073 15.6911 9.80919 15.6911 10.4596C15.6504 11.11 15.122 11.6385 14.5122 11.6385Z' fill='%2300B2F7'/%3E%3C/svg%3E%0A`;

const plusBG = `data:image/svg+xml,%3Csvg width='20' height='21' viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M10 0.500061C4.45344 0.500061 0 4.99399 0 10.5001C0 16.0466 4.49393 20.5001 10 20.5001C15.5466 20.5001 20 16.0061 20 10.5001C20 4.99399 15.5061 0.500061 10 0.500061ZM14.4939 11.6742H11.1741V14.994C11.1741 15.6418 10.6478 16.1681 10 16.1681C9.35223 16.1681 8.82591 15.6418 8.82591 14.994V11.6742H5.50607C4.8583 11.6742 4.33198 11.1478 4.33198 10.5001C4.33198 9.85229 4.8583 9.32597 5.50607 9.32597H8.82591V6.00613C8.82591 5.35836 9.35223 4.83205 10 4.83205C10.6478 4.83205 11.1741 5.35836 11.1741 6.00613V9.32597H14.4939C15.1417 9.32597 15.668 9.85229 15.668 10.5001C15.668 11.1478 15.1417 11.6742 14.4939 11.6742Z' fill='%2300B2F7'/%3E%3C/svg%3E%0A`;

const CaretImage = styled.span<{ flip: boolean }>`
  width: 20px;
  height: 20px;
  min-width: 20px;
  min-height: 20px;
  margin-left: 5px;
  background-image: url("${(props) => (props.flip ? minusBG : plusBG)}");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

type FAQTileProps = {
  faq_item_title: string;
  faq_item_content: string;
  faq_index: number;
};

const FAQTile: React.FC<FAQTileProps> = ({ faq_item_title, faq_item_content, faq_index }) => {
  const t = useContext(TranslationContext);

  const [toggleFAQTile, setToggleFAQTile] = useState(false);

  const toggleTileHandler = () => {
    setToggleFAQTile(!toggleFAQTile);
  };

  return (
    <FAQTileContainer index={faq_index}>
      <FAQTitle onClick={toggleTileHandler}>
        <Subheading>{t.translate(faq_item_title)}</Subheading>
        <CaretImage flip={toggleFAQTile} />
      </FAQTitle>
      <FAQContent show={toggleFAQTile}>{t.translate(faq_item_content)}</FAQContent>
    </FAQTileContainer>
  );
};

export default FAQTile;
