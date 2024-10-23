import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";

export interface GatsbyImageData {
  file: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
}

export interface FileDiskImage {
  filename_disk: string;
}

export interface LocalImage {
  childImageSharp: {
    gatsbyImageData: IGatsbyImageData;
  };
}

export type GatsbyImageWrapped = GatsbyImageData | FileDiskImage | LocalImage | IGatsbyImageData;

export interface GatsbyImageWrapperProps {
  image: GatsbyImageWrapped;
  alt?: string;
  [key: string]: any;
}

export const FileDiskImage = ({ src, alt, ...rest }: { src: FileDiskImage; alt: string; [key: string]: any }) => {
  return <img src={`https://static.classdojo.com/uploads/${src.filename_disk}`} alt={alt} {...rest} />;
};

const GatsbyImageWrapper = ({ image, alt, ...rest }: GatsbyImageWrapperProps) => {
  if ("filename_disk" in image) {
    return <FileDiskImage src={image} alt={alt} {...rest} />;
  }

  if ("childImageSharp" in image) {
    return <GatsbyImage image={image.childImageSharp.gatsbyImageData} alt={alt} {...rest} />;
  }

  if ("file" in image) {
    return <GatsbyImage image={image.file.childImageSharp.gatsbyImageData} alt={alt} {...rest} />;
  }

  return <GatsbyImage image={image} alt={alt} {...rest} />;
};

export default GatsbyImageWrapper;
