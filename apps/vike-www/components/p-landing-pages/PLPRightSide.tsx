import React, { useEffect } from "react";
import { css } from "@emotion/react";
import { IGatsbyImageData } from "gatsby-plugin-image";
import { DojoTextDisplay, DojoTextBold, DojoTextRegular, SquiglyLine, IconImage } from "./PLPStyles";
import { logEvent } from "@src/utils/logClient";
import { useLocation } from "@reach/router";

interface RightSideProps {
  icon: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
  photoSticker: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
  photo: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
  heading: string;
  subheading: string;
  copy: string;
  pageId: string;
}

const RightSide: React.FC<RightSideProps> = ({ heading, subheading, copy, pageId, photo }) => {
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  useEffect(() => {
    logEvent({
      eventName: `web.external.${pageId}.load_page`,
      eventValue: location.href,
      metadata: params,
    });
  }, []);

  return (
    <div
      css={css`
        background: #f1f3f8;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          max-width: 400px;
          text-align: center;
          align-items: center;
          gap: 30px;
          padding: 24px;
        `}
      >
        <IconImage image={photo.childImageSharp.gatsbyImageData} alt="Icon" />
        <DojoTextDisplay>{heading}</DojoTextDisplay>
        <SquiglyLine />
        <div>
          <DojoTextBold>{subheading}</DojoTextBold>
          <DojoTextRegular>{copy}</DojoTextRegular>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
