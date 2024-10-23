import React from "react";
import styled from "@emotion/styled";
import { mediaQueriesMax } from "@src/styles/theme";

const MetaTitle = styled("div")`
  width: 361px;
  font-size: 32px;
  font-weight: bold;
  color: #2c2f42;
  line-height: 1.3;

  ${mediaQueriesMax.lesson} {
    width: 100%;
    height: auto;
  }
`;

const Meta = styled("div")`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  margin: 26px 0 0 41px;

  ${mediaQueriesMax.lesson} {
    margin: 20px 38px 0 20px;
  }
`;

const MetaDuration = styled("div")`
  margin: 10px 0 0 0;

  font-size: 16px;
  font-weight: 300;
  line-height: 20px;
  color: #8c8c8c;
`;
const MetaAuthor = styled("div")`
  display: none;

  font-size: 14px;
  color: #9b9b9b;
  margin-left: 5px;
  margin-bottom: 16px;

  font-weight: lighter;

  span {
    font-weight: 500;
  }
`;
const LessonMetaTop = ({ title, author, duration }: { title: string; author: string; duration: string }) => {
  return (
    <Meta data-test-name="metaTop">
      <MetaTitle data-test-name="metaTitle">{title.split("- ").pop()}</MetaTitle>
      {duration && <MetaDuration>{duration} activity</MetaDuration>}
      <MetaAuthor>
        by <span>{author}</span>
      </MetaAuthor>
    </Meta>
  );
};

export default LessonMetaTop;
