import styled from "@emotion/styled";
import { Box, Flex } from "@src/components/Boxes";
import Container from "@src/components/Container";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import { Button } from "@src/components/nessie-web";
import { mediaQueries } from "@src/styles/theme";
import * as React from "react";

const InfoBox = styled(Flex)`
  position: relative;
  max-width: none;
  background: #fff;
  margin-bottom: 20px;
  margin-left: 0;
  ${mediaQueries[0]} {
    margin-left: 40px;
    align-items: center;
  }
`;
InfoBox.defaultProps = {
  flexDirection: "column",
  alignItems: ["center", "center", "start"],
};

const Disclaimer = styled("p")`
  color: white;
  font-size: 18px;
  font-weight: bold;
  margin-top: 30px;
`;

const HeroSectionStyled = styled("div")`
  padding-bottom: 40px;
  background-color: #00b2f7;
`;

HeroSectionStyled.defaultProps = {};

const InfoBoxTitle = styled("h1")`
  color: white;
  font-size: 84px;
  text-align: center;
  padding-top: 50px;
  @media (max-width: 577px) {
    font-size: 46px;
  }
  font-weight: 800;
`;
const Subtitle = styled("h3")`
  color: white;
  font-size: 24px;
  margin-bottom: 22px;
  @media (max-width: 577px) {
    font-size: 20px;
  }
  font-weight: bold;
`;

type LPHeroProps = {
  title?: string;
  subtitle?: string;
  sentence?: string;
};

const HeroSection: React.FC<LPHeroProps> = ({ title, subtitle, sentence }) => {
  const modalContext = React.useContext(ModalContext);
  function openSignupModal() {
    modalContext.showModal(ModalType.Signup);
  }

  return (
    <HeroSectionStyled>
      <Container>
        <InfoBoxTitle>{title}</InfoBoxTitle>
        <Box textAlign="center" margin="auto" maxWidth="600px">
          <Subtitle>{subtitle}</Subtitle>
          <Button kind="secondary" onClick={() => openSignupModal()} width="100%">
            Sign up now for free
          </Button>
          <Disclaimer>
            <span aria-hidden={true}>⭐</span> {sentence} <span aria-hidden={true}>⭐</span>
          </Disclaimer>
        </Box>
      </Container>
    </HeroSectionStyled>
  );
};

export default HeroSection;
