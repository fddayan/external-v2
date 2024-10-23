import React from "react";

export interface BrandedImageProps {
  src: string;
  alt: string;
}

const BrandedImage: React.FC<BrandedImageProps> = ({ src, alt }) => {
  return <img style={{ marginBottom: -7 }} src={src} alt={alt} />;
};

export default BrandedImage;
