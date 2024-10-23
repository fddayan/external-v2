import React, { useState, useEffect } from "react";
import { Button, BodyText, TextField, DetailText } from "@src/components/nessie-web";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import { graphql, useStaticQuery } from "gatsby";
import CommonModal from "@src/components/modals/CommonModal";
import { mediaQueries } from "@src/styles/theme";
import { Underline, DarkButton, Display3, Headline1 } from "./styles";
import { logEvent } from "@src/utils/logClient";

const DistrictHero = ({ openCalendly }) => {
  const data = useStaticQuery(graphql`
    {
      teacherPhoto: file(relativePath: { eq: "districts/hero-background.jpeg" }) {
        publicURL
      }
      founders: file(relativePath: { eq: "districts/founders.png" }) {
        publicURL
      }
      wavesTop: file(relativePath: { eq: "districts/waves-top.svg" }) {
        publicURL
      }
      wavesBottom: file(relativePath: { eq: "districts/waves-bottom.svg" }) {
        publicURL
      }
      underlineStroke: file(relativePath: { eq: "districts/sketch-underline.svg" }) {
        publicURL
      }
      illustrationApple: file(relativePath: { eq: "district-leader/illustration-apple.svg" }) {
        publicURL
      }
      sketchyArrow: file(relativePath: { eq: "district-leader/sketchy-arrow.png" }) {
        publicURL
      }
      illustrationPear: file(relativePath: { eq: "district-leader/illustration-pear.svg" }) {
        publicURL
      }
      illustrationStar: file(relativePath: { eq: "district-leader/illustration-star.svg" }) {
        publicURL
      }
      illustrationSparkles: file(relativePath: { eq: "district-leader/illustration-sparkles.png" }) {
        publicURL
      }
      heroKid: file(relativePath: { eq: "district-leader/hero-kid.png" }) {
        publicURL
      }
      illustrationEye: file(relativePath: { eq: "district-leader/illustration-eye.png" }) {
        publicURL
      }
      logoBaltimore: file(relativePath: { eq: "districts/logo-baltimore@2x.png" }) {
        publicURL
      }
      logoMiami: file(relativePath: { eq: "districts/logo-miami@2x.png" }) {
        publicURL
      }
      logoPGCPS: file(relativePath: { eq: "districts/logo-pgcps@2x.png" }) {
        publicURL
      }
      logoSpring: file(relativePath: { eq: "districts/logo-spring@2x.png" }) {
        publicURL
      }
      plasticineHouse: file(relativePath: { eq: "districts/plasticine-house.png" }) {
        publicURL
      }
    }
  `);

  const {
    logoBaltimore,
    logoPGCPS,
    logoMiami,
    logoSpring,
    teacherPhoto,
    wavesTop,
    wavesBottom,

    underlineStroke,
    plasticineHouse,
    founders,
  } = data;

  const [showLetter, setShowLetter] = useState(false);

  const MainCTA = styled(Button)`
    margin-inline: auto;
    ${mediaQueries[0]} {
      margin-inline: 0;
    }
  `;
  const HeroIllustration = styled("div")`
    background-image: url(${wavesTop.publicURL}), url(${wavesBottom.publicURL}), url(${teacherPhoto.publicURL});
    background-size: 102%, 102%, cover;
    background-repeat: no-repeat;
    background-position: center -2%, center 103%, right center;
    height: 400px;
    width: 100%;
    ${mediaQueries[1]} {
      height: 550px;
    }
  `;
  const PlasticineHouse = styled("img")`
    position: absolute;
    right: -50px;
    top: 400px;
    width: 250px;
    ${mediaQueries[1]} {
      left: calc(50% - 560px);
      top: 230px;
      width: 300px;
    }
  `;
  const HeroBackground = styled("div")`
    text-align: center;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-block: 30px;
    overflow: hidden;
    h1 {
      font-family: DojoDisplay !important;
      font-size: 28px;
      font-weight: 800;
      color: #1f1551;
      display: inline-block;
      position: relative;
      text-align: center;
      text-align: center;
      ${mediaQueries[0]} {
        font-size: 44px;
      }
    }
  `;

  const readLetter = () => {
    setShowLetter(true);
    logEvent({
      eventName: "web.external.districts.read_letter",
      eventValue: window.location.href,
    });
  };

  return (
    <>
      <HeroBackground>
        <Container
          css={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingBlock: 30,
          }}
        >
          <h1>
            ClassDojo for Districts: <br />
            Where happier school communities are made
          </h1>
          <div
            css={{
              display: "flex",
              flexDirection: "row",
              gap: 12,
              alignItems: "center",
              marginTop: 20,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <DarkButton size="l" onClick={openCalendly}>
              Apply for partnership
            </DarkButton>
            <Button kind="secondary" size="l" onClick={readLetter}>
              Read our story
            </Button>
          </div>
        </Container>
        <HeroIllustration />
        <PlasticineHouse src={plasticineHouse.publicURL} />
      </HeroBackground>
      <div css={{ textAlign: "center" }}>
        <h3>Trusted in 90%+ of schools nationwide</h3>
        <Container
          css={{
            paddingBlock: "40px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 36,
            marginBottom: 40,
          }}
        >
          <img src={logoBaltimore.publicURL} alt="something" width={230} />
          <img src={logoSpring.publicURL} alt="something" width={178} />
          <img src={logoMiami.publicURL} alt="something" width={115} />
          <img src={logoPGCPS.publicURL} alt="something" width={140} />
        </Container>
      </div>

      {showLetter && (
        <CommonModal noHeader closeModal={() => setShowLetter(false)}>
          <div css={{ display: "flex", flexDirection: "column" }}>
            <Display3 css={{ textAlign: "center", marginBottom: 30 }}>Our Story</Display3>

            <p>
              In ClassDojo’s first week, we were thrilled to see 80 teachers join and use it in their classrooms. It’s
              hard to believe that now, this little community has grown to millions more in over 180 countries.
              Teachers, kids and families everywhere use ClassDojo to build close-knit communities inside and outside of
              their classrooms. We’re grateful that they choose and love being part of ClassDojo. We work hard to serve
              them every day.
            </p>

            <p>
              More recently, this groundswell of grassroots love has led to something new: more and more, schools and
              districts get in touch with us, wanting to use ClassDojo beyond individual classrooms, across their whole
              school or district. As a tiny team, we haven’t been able to do much for them.
            </p>

            <p>Until now.</p>

            <p>We’ve been building something magical. And we’re proud to share it: ClassDojo for Districts is here.</p>

            <p>
              ClassDojo for Districts is everything people already love about ClassDojo—now with everything schools and
              districts have always asked for, too. That includes things like seamless single-sign on capabilities, full
              rostering control, the highest possible security standards, and world class 24/7 support.{" "}
            </p>

            <p>
              Like every ClassDojo product, ClassDojo for Districts is built hand-in-hand with our community of
              teachers, families, kids, school leaders and district leaders. This means ClassDojo for Districts is
              simple, intuitive and private by design.{" "}
            </p>

            <p>
              We are honored that tens of millions of you trust ClassDojo to be a part of your lives every day. And
              we’re excited to welcome so many school and district partners to our community. Your trust means
              everything to us. We promise we'll always work as hard as we can to earn and keep it.
            </p>
            <p>Cheers,</p>

            <div css={{ display: "flex", flexDirection: "row", gap: 20 }}>
              <img src={founders.publicURL} width={75} alt="Founders" />
              <div>
                <Headline1>Sam & Liam</Headline1>
                <p>Founder & CEO, ClassDojo</p>
              </div>
            </div>
          </div>
        </CommonModal>
      )}
    </>
  );
};

export default DistrictHero;
