import * as React from "react";
import { alignItems, backgroundColor, justifyContent } from "styled-system";
import { Headline3, HeroRatingContainer, HeroContainer, HeroHeadline, HeroSubHeadline, HeroButton } from "./styles";
import { Button } from "@src/components/new-nessie";
import { Typography } from "@src/components/new-nessie/Typography2";
import Translate from "@src/components/translation/Translate";
import { graphql, useStaticQuery } from "gatsby";
import Container from "@src/components/Container";
import styled from "@emotion/styled";
import { mediaQueriesMax } from "@src/styles/theme";
import ConstituentButtonsNew from "./ConstituentButtonsNew";
import { ConstituentButtonsType } from "./ConstituentButtonsNew";

const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  ${mediaQueriesMax[2]} {
    .illustration {
      max-width: 310px;
    }
  }
`;

const HeroB = () => {
  const data = useStaticQuery(graphql`
    {
      oval: file(relativePath: { eq: "index-2024/oval-ending.svg" }) {
        publicURL
      }
    }
  `);

  const { oval } = data;

  return (
    <HeroContainer className="hero-b">
      <Container
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 18,
          paddingBottom: 24,
        }}
      >
        <HeroHeadline>
          <Translate path="directus.page_homepage_2024.Hero_headline" />
        </HeroHeadline>
        <HeroSubHeadline css={{ maxWidth: 770 }}>
          <Translate path="directus.page_homepage_2024.Hero_subheadline" />
        </HeroSubHeadline>
        <HeroSubHeadline css={{ marginTop: 48 }}>
          <Translate path="directus.page_homepage_2024.signup_get_started_here" />
        </HeroSubHeadline>
        <ConstituentButtonsNew type={ConstituentButtonsType.SIGNUP} buttonLocation="home" />
      </Container>
      <RatingContainer>
        <img
          src="https://static.classdojo.com/uploads/f8c58071-e4a4-4c2d-8b74-38eab4e34046.svg"
          alt=""
          className="illustration"
        />

        <img src="https://static.classdojo.com/uploads/ebfc7ad7-1a3e-40df-838d-f38a1aed0d45.svg" alt="5" />
        <Headline3 css={{ maxWidth: 450, textAlign: "center", color: "#ffffff" }}>
          <Translate path="directus.page_homepage_2024.Hero_star_rating_text" />
        </Headline3>
      </RatingContainer>
      <img src={oval.publicURL} width="100%" alt="" css={{ marginTop: "60px" }} />
    </HeroContainer>
  );
};

export default HeroB;
