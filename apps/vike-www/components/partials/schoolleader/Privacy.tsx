import React from "react";
import { Button } from "@src/components/nessie-web";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import { graphql, useStaticQuery } from "gatsby";
import { mediaQueries, mediaQueriesMax } from "@src/styles/theme";
import { Display1, Headline1 } from "./styles";
import Translate from "@src/components/translation/Translate";

const Paragraph = styled("p")`
  color: #fff;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  letter-spacing: -0.1px;
  margin: 0;
  font-size: 18px;
  ${mediaQueries[0]} {
    font-size: 28px;
  }
`;

const Content = styled("div")`
  max-width: 600px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 36px;
  padding-block: 40px;
  justify-content: center;
  align-items: center;
  text-align: center;
  ${mediaQueriesMax[0]} {
    .text {
      font-size: 18px;
    }
    a {
      width: 100%;
    }
  }
`;

const Privacy = ({ logos }) => {
  const altTags = ["COPPA", "FERPA", "GDPR"];

  const logosArray = logos.map((item, index) => ({
    filename_disk: item.directus_files_id.filename_disk,
    alt: altTags[index],
  }));

  const data = useStaticQuery(graphql`
    {
      shield: file(relativePath: { eq: "districts/plasticine-shield.png" }) {
        publicURL
      }
      curveTop: file(relativePath: { eq: "districts/curve-top.svg" }) {
        publicURL
      }
      curveBottom: file(relativePath: { eq: "districts/curve-bottom.svg" }) {
        publicURL
      }
      coppa: file(relativePath: { eq: "districts/coppa.svg" }) {
        publicURL
      }
      ferpa: file(relativePath: { eq: "districts/ferpa.svg" }) {
        publicURL
      }
      gdpr: file(relativePath: { eq: "districts/gdpr.svg" }) {
        publicURL
      }
    }
  `);

  const { shield, coppa, ferpa, gdpr, curveTop, curveBottom } = data;

  const BgContainer = styled("div")`
    background-image: url(${curveTop.publicURL}), url(${curveBottom.publicURL});
    background-color: #8047ff;
    background-position: center calc(0% - 3px), center calc(100% + 3px);
    background-repeat: no-repeat;
    background-size: 100%, 100%;
  `;

  return (
    <BgContainer>
      <Container css={{ paddingBlock: 60 }}>
        <Content>
          <img src={shield.publicURL} width={330} alt="" />
          <Display1 css={{ color: "#ffffff" }}>
            <Translate path="directus.page_schoolleader_2024.privacy_heading" />
          </Display1>
          <Headline1 className="text" css={{ color: "#ffffff", fontWeight: 500 }}>
            <Translate path="directus.page_schoolleader_2024.privacy_copy" />
          </Headline1>
          <Button kind="secondary" href="/privacycenter">
            <Translate path="directus.page_schoolleader_2024.privacy_cta" />
          </Button>
          <div css={{ display: "flex", flexDirection: "row", gap: 24, justifyContent: "center" }}>
            {logosArray.map((logo, index) => (
              <img
                key={index}
                alt={logo.alt}
                src={`https://static.classdojo.com/uploads/${logo.filename_disk}`}
                loading="lazy"
                width={92}
              />
            ))}
          </div>
        </Content>
      </Container>
    </BgContainer>
  );
};

export default Privacy;
