import React from "react";
import Container from "@src/components/Container";
import { Button, Space, Subheading, Title } from "@src/components/nessie-web";
import Translate from "@src/components/translation/Translate";
import * as S from "./styles";

type DecorationPackSectionProps = {
  decoration_pack_baloon_left_image: string;
  decoration_pack_baloon_right_image: string;
  decoration_pack_button_url: string;
};

const DecorationPackSection: React.FC<DecorationPackSectionProps> = ({
  decoration_pack_baloon_left_image,
  decoration_pack_baloon_right_image,
  decoration_pack_button_url,
}) => {
  return (
    <S.DecorationPackSectionContainer
      leftBalloon={decoration_pack_baloon_left_image}
      rightBalloon={decoration_pack_baloon_right_image}
    >
      <Container>
        <S.DecorationPackHeader>
          <Title size={2}>
            <Translate path="directus.page_mentors.decoration_pack_title" />
          </Title>
          <Space size="m" />
          <Subheading>
            <Translate path="directus.page_mentors.decoration_pack_text" />
          </Subheading>
          <Space size="m" />
          <Button href={decoration_pack_button_url}>
            <Translate path="directus.page_mentors.decoration_pack_button_text" />
          </Button>
        </S.DecorationPackHeader>
      </Container>
    </S.DecorationPackSectionContainer>
  );
};

export default DecorationPackSection;
