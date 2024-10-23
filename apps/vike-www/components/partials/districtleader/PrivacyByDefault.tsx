import React from "react";
import { Button } from "@src/components/nessie-web";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import { graphql, useStaticQuery } from "gatsby";
import { mediaQueries } from "@src/styles/theme";
import { Display1 } from "./styles";

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
  gap: 24px;
  padding-block: 40px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const PrivacyByDefault = () => {
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
          <Display1 css={{ color: "#ffffff" }}>Private by default</Display1>
          <Paragraph css={{ textAlign: "left" }}>
            Protecting your data is our top priority. We’re certified by iKeepSafe as being fully COPPA and FERPA
            compliant, and we’re a proud signatory of the Student Privacy Pledge.
          </Paragraph>
          <div css={{ display: "flex", flexDirection: "row", gap: 24, justifyContent: "center" }}>
            <img src={coppa.publicURL} loading="lazy" alt="COPPA" width={92} />
            <img src={ferpa.publicURL} loading="lazy" alt="FERPA" width={92} />
            <img src={gdpr.publicURL} loading="lazy" alt="GDPR" width={92} />
          </div>
          <Button kind="secondary" href="/privacycenter">
            Learn more
          </Button>
        </Content>
      </Container>
    </BgContainer>
  );
};

export default PrivacyByDefault;
