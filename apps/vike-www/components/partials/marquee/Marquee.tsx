import React, { useEffect, useState, useRef } from "react";
import styled from "@emotion/styled";
import Translate from "@src/components/translation/Translate";
import Marquee from "react-fast-marquee";

const MarqueeText = styled.span`
  font-size: 24px;
  color: white;
  text-transform: uppercase;
  margin-left: 6px;
  margin-right: 6px;
  font-family: DojoDisplay, Helvetica, Arial, sans-serif;
  font-weight: 800;
`;

type Props = {
  marqueeItems: {
    text: string;
    icon: string;
  }[];
};

const MarqueeSection: React.FC<Props> = (props) => {
  return (
    <Marquee autoFill={true} css={{ marginBottom: 30 }}>
      <img src={props.marqueeItems[0].icon} alt="" width={24} height={24} css={{ display: "inline-block" }} />
      <MarqueeText>
        <Translate path={props.marqueeItems[0].text} />
      </MarqueeText>
      <img src={props.marqueeItems[1].icon} alt="" width={24} height={24} css={{ display: "inline-block" }} />
      <MarqueeText>
        <Translate path={props.marqueeItems[1].text} />
      </MarqueeText>
      <img src={props.marqueeItems[2].icon} alt="" width={24} height={24} css={{ display: "inline-block" }} />
      <MarqueeText>
        <Translate path={props.marqueeItems[2].text} />
      </MarqueeText>
    </Marquee>
  );
};

export default MarqueeSection;
