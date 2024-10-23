import { Space, Subheading, Title } from "@src/components/nessie-web";
import React from "react";

interface SectionTitleProps {
  title: string;
  tagline?: string;
  component_type: "section-title-component";
}

const SectionTitle: React.FC<SectionTitleProps> = (props) => (
  <div style={{ padding: "60px 0" }}>
    <Title textAlign="center">{props.title}</Title>
    {props.tagline && (
      <>
        <Space size="m" />
        <Subheading color="taro50" textAlign="center">
          {props.tagline}
        </Subheading>
      </>
    )}
  </div>
);

export default SectionTitle;
