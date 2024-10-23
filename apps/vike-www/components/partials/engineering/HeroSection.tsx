import React from "react";
import styled from "@emotion/styled";
import Button from "@src/components/Button";
import Translate from "@src/components/translation/Translate";
import { mediaQueries } from "@src/styles/theme";
import Container from "@src/components/Container";
import { Space, theme } from "@src/components/nessie-web";
import scrollTo from "gatsby-plugin-smoothscroll";

const {
  colors: { dt_taro20, dt_taro40, dt_aqua50, dt_white },
} = theme;

const HeroSectionContainer = styled.section`
  width: 100%;
  background-color: ${dt_taro20};
`;

const HeroBackgroundContainer = styled.div<{ bgImage: string }>`
  background: url("${(props) => props.bgImage}");
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  width: 100%;
  height: 400px;
  position: relative;
  display: flex;
  align-items: flex-end;
  ${mediaQueries[0]} {
    height: 620px;
    align-items: center;
  }
`;

const HeroContainer = styled(Container)`
  z-index: 2;
`;

const HeroContent = styled.div`
  width: 65%;
  padding-bottom: 54px;
  max-width: 600px;
  ${mediaQueries[0]} {
    padding-bottom: 0px;
    width: auto;
  }
`;

const HeroTitle = styled.div`
  letter-spacing: -0.3px;
  font-weight: 800;
  font-size: 30px;
  line-height: 30px;
  color: ${dt_white};

  ${mediaQueries[0]} {
    letter-spacing: -1px;
    font-size: 42px;
    line-height: 42px;
  }
`;

const PressContent = styled.div`
  width: 100%;
  padding: 30px 0;
  margin: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  ${mediaQueries[1]} {
    flex-direction: row;
  }
`;

const PressInnerContent = styled.div`
  h2 {
    font-weight: 800;
    font-size: 24px;
    line-height: 36px;
    letter-spacing: -0.35px;
    color: ${dt_aqua50};
    margin: 0px;
  }
  .subtitle {
    font-weight: 800;
    font-size: 18px;
    line-height: 22px;
  }
  margin-bottom: 12px;
  ${mediaQueries[1]} {
    margin-bottom: 0px;
    margin-right: 24px;
  }
`;

const PressLogoHolder = styled.div`
  margin-bottom: 12px;
  ${mediaQueries[1]} {
    padding-right: 24px;
    border-right: 1px solid ${dt_taro40};
    margin-right: 24px;
    margin-bottom: 0px;
  }
`;

const PressButtonHolder = styled.div`
  width: 100%;
  a {
    width: 100%;
  }
  ${mediaQueries[1]} {
    width: auto;
    a {
      width: auto;
    }
  }
`;

type HeroSectionProps = {
  hero_text: string;
  hero_button_text: string;
  hero_button_url: string;
  hero_image: {
    file: {
      publicURL: string;
    };
  };
  press_logo: {
    file: {
      publicURL: string;
    };
  };
  press_button_url: string;
  press_button_text: string;
  press_heading: string;
  press_sub_heading: string;
  button_scroll_location: string;
};

const buttonProps = {
  big: true,
};

const HeroSection: React.FC<HeroSectionProps> = ({
  hero_text,
  hero_button_text,
  hero_image,
  press_logo,
  press_heading,
  press_sub_heading,
  press_button_url,
  press_button_text,
  button_scroll_location,
}) => {
  return (
    <HeroSectionContainer>
      <HeroBackgroundContainer bgImage={hero_image.file.publicURL}>
        <HeroContainer>
          <HeroContent>
            <HeroTitle>
              <Translate path={hero_text} />
            </HeroTitle>
            <Space size="l" />
            <Button as="a" onClick={() => scrollTo(button_scroll_location)} {...buttonProps}>
              <Translate path={hero_button_text} />
            </Button>
          </HeroContent>
        </HeroContainer>
      </HeroBackgroundContainer>
      <Container>
        <PressContent>
          <PressLogoHolder>
            <img src={press_logo.file.publicURL} alt="press-logo" />
          </PressLogoHolder>
          <PressInnerContent>
            <h2>
              <Translate path={press_heading} />
            </h2>
            <div className="subtitle">
              <Translate path={press_sub_heading} />
            </div>
          </PressInnerContent>
          <PressButtonHolder>
            <Button as="a" href={press_button_url} {...buttonProps}>
              <Translate path={press_button_text} />
            </Button>
          </PressButtonHolder>
        </PressContent>
      </Container>
    </HeroSectionContainer>
  );
};

export default HeroSection;
