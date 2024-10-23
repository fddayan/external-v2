import React, { useEffect, useState } from "react";
import { Display3 } from "../districtleader/styles";
import { BodyText, Button } from "@src/components/nessie-web";
import styled from "@emotion/styled";
import { PrintIcon } from "@src/components/nessie-web";
import Translate from "@src/components/translation/Translate";

const SVGRenderer = styled.div`
  flex: 1;
  width: 50%;
  border-radius: 36px;
  overflow: hidden;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const SVGComponent = ({ svgUrl, replacementText, campaignName }) => {
  const [svgContent, setSvgContent] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (svgUrl) {
      fetch(svgUrl)
        .then((response) => response.text())
        .then((data) => {
          const updatedSvg = data.replace("{{REPLACE_TEXT}}", replacementText);
          setSvgContent(updatedSvg);
          setIsLoaded(true);
        })
        .catch((error) => console.error("Error fetching SVG:", error));
    }
  }, [svgUrl, replacementText]);

  const printSvg = () => {
    if (!isLoaded) return; // Prevent printing if not loaded
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print SVG</title>
          <link rel="stylesheet" href="https://static.classdojo.com/fonts/DojoText/DojoText.css">
          <style>
            body { margin: 0; padding: 0; }
            svg { width:100vw; height:100vh; }
          </style>
        </head>
        <body onload="window.print();">${svgContent}</body>
      </html>
    `);
    printWindow.document.close();
  };

  const assetName = {
    assetName: campaignName,
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", width: "100%", gap: 50, alignItems: "flex-start" }}>
      {isLoaded && (
        <SVGRenderer>
          <div dangerouslySetInnerHTML={{ __html: svgContent }} />
        </SVGRenderer>
      )}
      <div css={{ width: "50%", display: "flex", flexDirection: "column", gap: 30, alignItems: "flex-start" }}>
        <Display3>
          <Translate path="pdf_generator.celebration" subs={{ campaignName }} />
        </Display3>
        <BodyText>
          <Translate path="pdf_generator.personalized" subs={assetName} />
        </BodyText>
        <Button onClick={printSvg} disabled={!isLoaded} icon={<PrintIcon />}>
          <Translate path="pdf_generator.print" />
        </Button>
      </div>
    </div>
  );
};

export default SVGComponent;
