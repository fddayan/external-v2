import React from "react";
import { GImageProps } from "./whats-new-sl/styles";

export const GImage = ({ img, alt, ...rest }: GImageProps) => {
  return <img src={img.publicURL} alt={alt} {...rest} loading="lazy" />;
};
