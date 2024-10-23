import React, { useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "@emotion/styled";
import Button from "@src/components/Button";
import Translate from "@src/components/translation/Translate";
import Container from "@src/components/Container";
import { theme } from "@src/components/nessie-web";
import scrollTo from "gatsby-plugin-smoothscroll";

const {
  colors: { white },
} = theme;

const FixedScroll = styled.div`
  background-color: ${white};
  position: fixed;
  top: -100px;
  left: 0;
  right: 0;
  transition: top 0.5s ease-in-out;
  z-index: 1035;

  &.show {
    top: 0;
  }
`;

const FixedScrollContainer = styled(Container)`
  position: relative;
  display: grid;
  grid-template-columns: auto min-content;
  height: 88px;
  align-items: center;
  justify-items: start;
  z-index: 1010;
`;

const Logo = styled.img`
  width: 176px;
`;

type ScrollCTAProps = {
  button_scroll_location: string;
  button_text: string;
};

const ScrollCTA: React.FC<ScrollCTAProps> = ({ button_scroll_location, button_text }) => {
  const data = useStaticQuery(graphql`
    {
      logo: file(name: { eq: "classdojo_logo_176@2x" }) {
        childImageSharp {
          gatsbyImageData(width: 400, placeholder: NONE, layout: CONSTRAINED)
        }
      }
    }
  `);

  const { logo } = data;

  useEffect(() => {
    const appendFixedCTAOnScrollScript = () => {
      const ctaScript = document.createElement("script");
      ctaScript.innerHTML = `
        window.addEventListener("scroll", function () {
          if (window.scrollY > 400) {
            document.querySelector(".fixed-cta").classList.add("show");
          } else {
            document.querySelector(".fixed-cta").classList.remove("show");
          }
        });`;
      document.querySelector("head")?.append(ctaScript);
    };

    appendFixedCTAOnScrollScript();
  }, []);

  return (
    <FixedScroll className="fixed-cta">
      <FixedScrollContainer>
        <Logo src={logo.childImageSharp.gatsbyImageData.src} />
        <Button as="a" onClick={() => scrollTo(button_scroll_location)}>
          <Translate path={button_text} />
        </Button>
      </FixedScrollContainer>
    </FixedScroll>
  );
};

export default ScrollCTA;
