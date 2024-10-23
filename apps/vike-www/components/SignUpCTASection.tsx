import React, { useContext } from "react";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import { Button } from "@src/components/nessie-web";
import { TranslationContext } from "@src/components/translation/TranslationContext";

const SolidBGContainer = styled.div<{ backgroundColor: string }>`
  padding: 40px 0;
  background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : "transparent")};
`;

const ButtonContainer = styled.div`
  max-width: 600px;
  display: flex;
  justify-content: center;
  margin: auto;
`;

type SignUpCTASectionProps = {
  BGColor?: string;
  hero_button_text?: string;
  fullWidth?: boolean;
};

const SignUpCTASection: React.FC<SignUpCTASectionProps> = ({ BGColor, hero_button_text, fullWidth }) => {
  const t = useContext(TranslationContext);
  const modalContext = React.useContext(ModalContext);
  function openSignupModal() {
    modalContext.showModal(ModalType.Signup);
  }

  return (
    <SolidBGContainer backgroundColor={BGColor}>
      <Container>
        <ButtonContainer>
          <Button kind="secondary" onClick={() => openSignupModal()} width={fullWidth ? "100%" : ""}>
            {hero_button_text
              ? t.translate(hero_button_text)
              : t.translate("directus.page_landing_common_data.hero_button_text" as string)}
          </Button>
        </ButtonContainer>
      </Container>
    </SolidBGContainer>
  );
};

export default SignUpCTASection;
