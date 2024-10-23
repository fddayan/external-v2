import React from "react";
import { Box } from "@src/components/Boxes";
import styled from "@emotion/styled";

const AuthorPhoto = styled("img")`
  max-width: 23px;
  max-height: 23px;
  width: 23px;
  height: 23px;
  border-radius: 16px;

  overflow: hidden;
  position: absolute;
  left: 8px;
  top: 3px;
`;

const AuthorName = styled("div")`
  font-family: proxima-nova, serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.25;
  color: #3e425d;
  margin-top: -5px;
`;
// TODO add alt
const IdeaAuthor = ({ photo, name }: { photo: string; name: string }) => {
  return (
    <Box position="relative" display="inline-block" padding="9px 0 0 40px" height="26px">
      <AuthorPhoto src={photo} alt="" />
      <AuthorName>{name}</AuthorName>
    </Box>
  );
};

export default IdeaAuthor;
