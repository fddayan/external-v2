import React from "react";
import { Feature, FeatureImage } from "./styles";
import { BodyText, Button, Subheading } from "@src/components/nessie-web";

interface FeatureGridComponentProps {
  title: string;
  description: string;
  image: { file: { publicURL: string } };
  cta_label?: string;
  cta_url?: string;
}

const FeatureGridComponent: React.FC<FeatureGridComponentProps> = (props) => {
  return (
    <Feature>
      <FeatureImage src={props.image.file.publicURL} alt="" />
      <Subheading>{props.title}</Subheading>
      <BodyText>{props.description}</BodyText>
      {props.cta_label && (
        <Button style={{ width: "fit-content", margin: "auto" }} href={props.cta_url}>
          {props.cta_label}
        </Button>
      )}
    </Feature>
  );
};

export default FeatureGridComponent;
