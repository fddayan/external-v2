import React from "react";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import { graphql, useStaticQuery } from "gatsby";
import { mediaQueries, mediaQueriesMax } from "@src/styles/theme";
import { Button } from "@src/components/nessie-web";
import { Display1, Underline } from "./styles";
import { ChevronSmallRightIcon } from "@src/components/nessie-web";
import { getRelativePath } from "@src/utils/routes";

const GridContainer = styled(Container)`
  display: grid;
  justify-content: space-between;
  grid-template-areas:
    "a b"
    "c c";
  ${mediaQueriesMax[0]} {
    grid-template-columns: 1fr 1fr;
  }
  ${mediaQueries[1]} {
    grid-template-areas:
      "a b"
      "c b";
    gap: 30px;
  }
`;

const GridA = styled("div")`
  grid-area: a;
  align-self: center;
  ${mediaQueries[1]} {
    max-width: 600px;
    align-self: end;
    margin-bottom: 40px;
  }
`;
const GridB = styled("div")`
  grid-area: b;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mediaQueries[1]} {
    text-align: left;
  }
  ${mediaQueriesMax[0]} {
    justify-content: end;
  }
`;

const GridC = styled("div")`
  grid-area: c;
  text-align: center;
  ${mediaQueries[1]} {
    text-align: left;
    max-width: 600px;
  }
  p {
    font-family: DojoText;
    font-size: 28px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%; /* 33.6px */
    letter-spacing: -0.1px;
    color: #2c2a50;
    ${mediaQueriesMax[0]} {
      font-size: 21px;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  margin-top: 48px;
  a {
    flex-direction: row-reverse;
    div {
      margin-right: 0;
      margin-left: 6px;
    }
  }
  ${mediaQueriesMax[0]} {
    flex-direction: column;
    button,
    a {
      width: 100%;
    }
  }
`;

const ZeroCost = () => {
  const data = useStaticQuery(graphql`
    {
      desk: file(relativePath: { eq: "districts/plasticine-desk.png" }) {
        publicURL
      }
      underlineStroke: file(relativePath: { eq: "districts/sketch-underline.svg" }) {
        publicURL
      }
      yellow: file(relativePath: { eq: "district-leader/shape-yellow.svg" }) {
        publicURL
      }
      green: file(relativePath: { eq: "district-leader/shape-green.svg" }) {
        publicURL
      }
    }
  `);

  const { desk, underlineStroke } = data;
  const HeroBackground = styled("div")`
    padding-block: 60px;
    p {
      font-size: 28px;
      font-style: normal;
      font-weight: 500;
      line-height: 120%; /* 33.6px */
      letter-spacing: -0.1px;
      color: #2c2a50;
    }
  `;

  return (
    <GridContainer>
      <GridA>
        <Display1>
          Zero cost, <Underline backgroundImageUrl={underlineStroke.publicURL}>forever</Underline>
        </Display1>
      </GridA>
      <GridB>
        <img src={desk.publicURL} alt="Illustration" width="100%" />
      </GridB>
      <GridC>
        <p>We believe in giving every child an education they love, so ClassDojo is free for everyone.</p>
        <p>We offer optional services for those who are looking for more.</p>
        <ButtonContainer>
          <Button kind="secondary" icon={<ChevronSmallRightIcon />} href="https://tutor.classdojo.com" target="_blank">
            Dojo Tutor
          </Button>
          <Button kind="secondary" icon={<ChevronSmallRightIcon />} navigateTo={getRelativePath("/plus")}>
            ClassDojo Plus
          </Button>
        </ButtonContainer>
      </GridC>
    </GridContainer>
  );
};

export default ZeroCost;
