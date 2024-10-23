import React from "react";
import styled from "@emotion/styled";

const Header = styled("h1")`
  color: #939393;
  font-size: 24px;
  font-weight: 300;
  line-height: 1;
  border-style: none;
  display: block;
  margin: 0;
  padding-bottom: 0;
  text-align: center;
`;
const BlogPageTitle = ({ text }: { text: string }) => {
  return <Header>{text}</Header>;
};

export default BlogPageTitle;
