import React from "react";
import Container from "@src/components/Container";
import styled from "@emotion/styled";
import Translate from "@src/components/translation/Translate";
import { Body1, Display2 } from "../schoolleader/styles";
import { mediaQueriesMax } from "@src/styles/theme";

const GridContainer = styled.div`
  display: grid;
  grid-template-areas:
    "B A"
    "C D";
  grid-gap: 24px;

  .areaA {
    grid-area: A;
  }

  .areaB {
    grid-area: B;
  }

  .areaC {
    grid-area: C;
  }

  .areaD {
    grid-area: D;
  }

  .areaA,
  .areaB,
  .areaC,
  .areaD {
    align-self: center;
  }
  h2 {
    margin-bottom: 48px;
  }
  img {
    max-height: 400px;
  }

  ${mediaQueriesMax[1]} {
    text-align: "center";
    grid-template-areas:
      "A"
      "B"
      "C"
      "D";
    .areaB,
    .areaD {
      text-align: center;
      align-self: center;
    }
    .areaA,
    .areaC {
      img {
        max-width: 400px;
        width: 70%;
        margin: auto;
        display: block;
      }
    }
    h2 {
      margin-bottom: 16px;
    }
  }
`;

const PrivacyFeatures = ({ feature1, feature2 }) => {
  return (
    <Container css={{ marginBottom: 70 }}>
      <GridContainer>
        <div className="areaA">
          <img src={feature1} alt="" />
        </div>
        <div className="areaB">
          <Display2 css={{ color: "#2C2A50" }}>
            <Translate path="directus.page_privacy_2024.Feature_1" />
          </Display2>
          <Body1>
            <Translate path="directus.page_privacy_2024.Feature_1_text" />
          </Body1>
        </div>
        <div className="areaC">
          <img src={feature2} alt="" />
        </div>
        <div className="areaD">
          <Display2 css={{ color: "#2C2A50" }}>
            <Translate path="directus.page_privacy_2024.Feature_2" />
          </Display2>
          <Body1>
            <Translate path="directus.page_privacy_2024.Feature_2_text" />
          </Body1>
        </div>
      </GridContainer>
    </Container>
  );
};

export default PrivacyFeatures;
