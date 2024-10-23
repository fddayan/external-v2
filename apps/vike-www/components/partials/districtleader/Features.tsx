import React, { useState, useEffect, useCallback } from "react";
import styled from "@emotion/styled";
import { Display2, Body1, Headline1, Underline } from "./styles";
import { graphql, useStaticQuery } from "gatsby";
import { mediaQueriesMax } from "@src/styles/theme";
import Container from "@src/components/Container";

const CardContainer = styled.div`
  display: flex;
  flexdirection: row;
  gap: 30px;
  margin-top: 78px;
  ${mediaQueriesMax[1]} {
    flex-direction: column;
    margin-top: 40px;
  }
`;

const HeaderContainer = styled.div`
  position: relative;
  margin-top: 60px;
  h2 {
    max-width: 600px;
    margin: auto;
    text-align: center;
  }
  img {
    position: absolute;
    right: 0;
    bottom: -120px;
  }
  ${mediaQueriesMax[1]} {
    img {
      display: none;
    }
  }
`;

const Card = styled.div`
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 48px 48px 0 48px;
  height: 472px;
  justify-content: space-between;
  z-index: 10;
  overflow: hidden;
  &:nth-of-type(1) {
    background-color: #9cf2ce;
    color: #07430b;
    h3 {
      color: #07430b;
    }
  }
  &:nth-of-type(2) {
    background-color: #ff8fd0;
    color: #64104a;
    h3 {
      color: #64104a;
    }
  }
  &:nth-of-type(3) {
    background-color: #b2eeff;
    color: #0c4689;
    h3 {
      color: #0c4689;
    }
  }

  p {
    font-size: 18px;
  }
  h3 {
    margin-top: 0;
    margin-bottom: 16px;
  }
`;
const DistrictsFeatures = () => {
  const data = useStaticQuery(graphql`
    query {
      feature1: file(relativePath: { eq: "districts/features-img1.png" }) {
        publicURL
      }
      feature2: file(relativePath: { eq: "districts/features-img2.png" }) {
        publicURL
      }
      feature3: file(relativePath: { eq: "districts/features-img3.png" }) {
        publicURL
      }
      trophy: file(relativePath: { eq: "districts/plasticine-trophy.png" }) {
        publicURL
      }
    }
  `);

  const { feature1, feature2, feature3, trophy } = data;
  const content = [
    {
      title: "Security you can trust",
      text: "Staff SSO and Rostering ensures everyone in your district has access to the platform, and no one else.",
      image: feature1.publicURL,
    },
    {
      title: "Insights that matter",
      text: "Receive monthly engagement insights to ensure you’re reaching every family in your district.",
      image: feature2.publicURL,
    },
    {
      title: "Be everywhere",
      text: "See what’s happening with access across all of your schools—from announcements, to celebrations and upcoming events.",
      image: feature3.publicURL,
    },
  ];
  return (
    <Container css={{ marginBottom: 80 }}>
      <HeaderContainer>
        <Display2 css={{ maxWidth: 600 }}>District-level security, insights and control</Display2>
        <img src={trophy.publicURL} alt="" width={250} />
      </HeaderContainer>
      <CardContainer>
        {content.map(({ title, text, image }, index) => (
          <Card key={index}>
            <div>
              <Headline1>{title}</Headline1>
              <p>{text}</p>
            </div>
            <img src={image} alt={title} />
          </Card>
        ))}
      </CardContainer>
    </Container>
  );
};

export default DistrictsFeatures;
