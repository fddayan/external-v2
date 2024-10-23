import React from "react";
import SEO from "@src/components/SEO";

export type CustomSEOProps = {
  title: string;
  description?: string;
};
const CustomSEO: React.FC<CustomSEOProps> = ({ title, description }) => {
  return <SEO title={title} description={description}></SEO>;
};

export default CustomSEO;
