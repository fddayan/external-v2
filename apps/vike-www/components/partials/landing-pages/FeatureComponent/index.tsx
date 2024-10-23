import React from "react";
import { IGatsbyImageData } from "gatsby-plugin-image";
import { Feature, FeatureImage, FeatureText } from "./styles";
import { BodyText, Button, Heading } from "@src/components/nessie-web";

interface FeatureComponentProps {
  title: string;
  description: string;
  image: { file: { childImageSharp: { gatsbyImageData: IGatsbyImageData } } };
  cta_label?: string;
  cta_url?: string;
}

const FeatureComponent: React.FC<FeatureComponentProps> = (props) => {
  return (
    <Feature>
      <FeatureText>
        <Heading>{props.title}</Heading>
        <BodyText>{props.description}</BodyText>
        {props.cta_label && (
          <Button href={props.cta_url} style={{ width: "fit-content" }}>
            {props.cta_label}
          </Button>
        )}
      </FeatureText>
      <FeatureImage image={props.image.file.childImageSharp.gatsbyImageData} alt="" />
    </Feature>
  );
};

export default FeatureComponent;
