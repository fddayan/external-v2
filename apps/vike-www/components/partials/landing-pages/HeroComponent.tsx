import React from "react";
import Container from "@src/components/Container";
import { Button, Heading, Space, Title } from "@src/components/nessie-web";

interface HeroComponentProps {
  title: string;
  description: string;
  cta_label?: string;
  cta_url?: string;
  background_color: string;
  component_type: "hero-component";
}

const HeroComponent: React.FC<HeroComponentProps> = (props) => (
  <div style={{ backgroundColor: props.background_color, padding: "80px 0" }}>
    <Container>
      <Title size={2} color="white" textAlign="center">
        {props.title}
      </Title>
      <Space size="l" />
      <Heading color="white" textAlign="center">
        {props.description}
      </Heading>
      {props.cta_label && (
        <>
          <Space size="l" />
          <Button style={{ width: "fit-content", margin: "auto" }} kind="tertiary" href={props.cta_url}>
            {props.cta_label}
          </Button>
        </>
      )}
    </Container>
  </div>
);

export default HeroComponent;
