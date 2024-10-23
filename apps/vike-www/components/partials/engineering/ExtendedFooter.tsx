import React from "react";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import Translate from "@src/components/translation/Translate";
import { mediaQueries } from "@src/styles/theme";
import { Title, Action, Button, theme } from "@src/components/nessie-web";
import { FileIcon } from "@classdojo/web/nessie/icons";
import TwitterLogo from "@src/assets/images/engineering/twitter-logo.svg";
import backgroundImage from "@src/assets/images/engineering/footer-bg-engineering.png";

const {
  colors: { dt_taro90, dt_aqua50, dt_aqua60, dt_white },
} = theme;

const ExtendedFooterSection = styled.section`
  width: 100%;
  padding: 75px 0;
  position: relative;
  background-color: ${dt_taro90};
  padding-top: 132px;
  padding-bottom: 32px;
  ${mediaQueries[0]} {
    padding: 150px 0;
  }
`;

const FooterImage = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      #2c2a50 0%,
      rgba(44, 42, 80, 0.895362) 0.52%,
      rgba(44, 42, 80, 0.817693) 2.07%,
      rgba(44, 42, 80, 0.762022) 4.6%,
      rgba(44, 42, 80, 0.723376) 8.09%,
      rgba(44, 42, 80, 0.696785) 12.49%,
      rgba(44, 42, 80, 0.677275) 17.79%,
      rgba(44, 42, 80, 0.659875) 23.95%,
      rgba(44, 42, 80, 0.639613) 30.92%,
      rgba(44, 42, 80, 0.611516) 38.69%,
      rgba(44, 42, 80, 0.570615) 47.21%,
      rgba(44, 42, 80, 0.511935) 56.46%,
      rgba(44, 42, 80, 0.430505) 66.39%,
      rgba(44, 42, 80, 0.321355) 76.98%,
      rgba(44, 42, 80, 0.17951) 88.2%,
      rgba(44, 42, 80, 0) 100%
    );
  }

  ${mediaQueries[0]} {
    width: 50%;
    &:before {
      width: 60%;
      background: linear-gradient(
        90deg,
        ${dt_taro90} 0%,
        ${dt_taro90} 45.3%,
        rgba(44, 42, 80, 0.86) 56.31%,
        rgba(44, 42, 80, 0.67) 63.5%,
        rgba(44, 42, 80, 0) 77.77%
      );
    }
  }
`;

const FooterContent = styled.section`
  width: 100%;
`;

const FooterTextContent = styled.div`
  .footer-title {
    margin-bottom: 42px;
  }
  ${mediaQueries[0]} {
    width: 50%;
    .footer-title {
      margin-bottom: 30px;
    }
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
  ${mediaQueries[0]} {
    display: inline-block;
    width: 50%;
    margin-bottom: 30px;
    & > .nessie-text {
      margin-bottom: 16px;
    }
  }
  .extended-footer-button {
    display: inline-flex;
  }
  &.last {
    margin-bottom: 0px;
  }
`;

const SocialButton = styled.a`
  display: inline-flex;
  background-color: ${dt_aqua50};
  height: 42px;
  border-radius: 60px;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 24px;
  img {
    height: 20px;
  }
  &.twitter {
    width: 42px;
    padding-left: 0px;
    padding-right: 0px;
    margin-right: 0px;
  }
  &:hover {
    background-color: ${dt_aqua60};
  }
`;

const buttonProps = {};

type ExtendedFooterProps = {
  headingText: string;
  learnMoreText: string;
  followUsText: string;
  pressReleaseButtonText: string;
  pressReleaseButtonLink: string;
  twitterButtonLink: string;
};

const ExtendedFooter: React.FC<ExtendedFooterProps> = ({
  headingText,
  learnMoreText,
  followUsText,
  pressReleaseButtonText,
  pressReleaseButtonLink,
  twitterButtonLink,
}) => {
  return (
    <ExtendedFooterSection>
      <FooterImage />
      <Container>
        <FooterContent>
          <FooterTextContent>
            <Title size={2} color={dt_white} className="footer-title">
              <Translate path={headingText} />
            </Title>
            <ButtonsWrapper>
              <Action color={dt_white}>
                <Translate path={learnMoreText} />
              </Action>
              <div>
                <Button
                  className="extended-footer-button"
                  size="s"
                  as="a"
                  href={pressReleaseButtonLink}
                  icon={<FileIcon />}
                  {...buttonProps}
                >
                  <Translate path={pressReleaseButtonText} />
                </Button>
              </div>
            </ButtonsWrapper>
            <ButtonsWrapper className="last">
              <Action color={dt_white}>
                <Translate path={followUsText} />
              </Action>
              <div>
                <SocialButton className="twitter" href={twitterButtonLink}>
                  <img src={TwitterLogo} alt="Twitter" />
                </SocialButton>
              </div>
            </ButtonsWrapper>
          </FooterTextContent>
        </FooterContent>
      </Container>
    </ExtendedFooterSection>
  );
};

export default ExtendedFooter;
