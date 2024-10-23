import React from "react";
import Container from "@src/components/Container";
import { Display4, Headline2 } from "../schoolleader/styles";
import styled from "@emotion/styled";
import { mediaQueriesMax } from "@src/styles/theme";
import Translate from "@src/components/translation/Translate";

const FeatureGrid = styled("div")`
  display: flex;
  flex-direction: row;
  gap: 24px;
  align-items: center;
  max-width: 900px;
  &:nth-of-type(2) {
    flex-direction: row-reverse;
  }
  ${mediaQueriesMax[1]} {
    flex-direction: column-reverse;
    margin-bottom: 24px;
    text-align: center;
    &:nth-of-type(2) {
      flex-direction: column-reverse;
    }
  }
  img {
    border-radius: 24px;
    max-width: 400px;
    width: 100%;
  }
`;

const SchoolwidePointsContent = ({ feature1, feature2, feature3 }) => {
  return (
    <div>
      <Container
        css={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 24,
          paddingBlock: 48,
        }}
      >
        <Display4 css={{ maxWidth: 900, textAlign: "center", marginBottom: 36 }}>
          <Translate path="directus.page_schoolwide_points.features_title" />
        </Display4>
        <div css={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <FeatureGrid>
            <img src={`https://static.classdojo.com/uploads/${feature1}`} alt="" />
            <Headline2>
              <Translate path="directus.page_schoolwide_points.feature_1_text" />
            </Headline2>
          </FeatureGrid>
          <FeatureGrid>
            <img src={`https://static.classdojo.com/uploads/${feature2}`} alt="" />
            <Headline2>
              <Translate path="directus.page_schoolwide_points.feature_2_text" />
            </Headline2>
          </FeatureGrid>
          <FeatureGrid>
            <img src={`https://static.classdojo.com/uploads/${feature3}`} alt="" />
            <Headline2>
              <Translate path="directus.page_schoolwide_points.feature_3_text" />
            </Headline2>
          </FeatureGrid>
        </div>
      </Container>
    </div>
  );
};

export default SchoolwidePointsContent;
