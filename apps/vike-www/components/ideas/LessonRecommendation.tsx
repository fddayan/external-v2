import React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import { mediaQueries, mediaQueriesMax } from "@src/styles/theme";
import { getRelativePath } from "@src/utils/routes";
import { PublicUrlImg } from "@src/types/common";
import { getFilenameDiskUrl } from "@src/utils/normalize-static-query-result";

const PreviewCard = styled("div")`
  width: 49%;
  float: left;
  margin-right: 2%;
  margin-bottom: 2%;

  padding: 0;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  border: 1px solid #e9e9e5;
  border-radius: 5px;

  &:nth-child(2n) {
    margin-right: 0;
  }

  &:hover {
    border-color: darken(#f5f5f3, 8%);
    box-shadow: 0 1px 1px rgba(#000, 0.12);
  }

  a {
    display: block;
    padding: 20px;
  }

  ${mediaQueries[0]} {
    float: left;
    width: 32%;
    margin-right: 2%;
    margin-bottom: 20px;

    &:nth-child(2n) {
      margin-right: 2%;
    }

    &:nth-child(3n) {
      margin-right: 0;
    }
  }

  &:after {
    content: " ";
    display: table;
    clear: both;
  }
`;

const PreviewContainer = styled(Link)`
  position: relative;

  width: 100%;
  height: 100%;
  padding: 0;

  display: flex;
  flex-direction: column;

  ${mediaQueriesMax[0]} {
    position: unset;

    flex-direction: row;

    height: auto;
    padding: 11px 11px 11px 10.3px;
  }
`;

const PreviewCardImageContainer = styled("div")`
  margin: -20px -20px 0;
  position: relative;
  padding-bottom: 56.25%;
  overflow: hidden;
  border-radius: 5px 5px 0 0;
`;

const PreviewCardImg = styled("img")`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

const PreviewCardData = styled("div")`
  color: #575b7d;
  margin-top: 16px;
  min-height: 52px;

  &:hover {
    color: lighten(#575b7d, 10%);
  }
`;

const PreviewCardDataIsName = styled("div")`
  font-size: 16px;
  line-height: 1.2;
  font-weight: 600;
  color: #2c2f42;
`;

function LessonRecommendation(props: {
  idea: {
    thumb: PublicUrlImg;
    slug: string;
    preview_title: string;
  };
}) {
  const idea = props.idea;
  const image = getFilenameDiskUrl(idea.thumb);

  return (
    <PreviewCard>
      <PreviewContainer to={getRelativePath(`/i/${idea.slug}`)}>
        <PreviewCardImageContainer>
          <PreviewCardImg src={image} alt="" />
        </PreviewCardImageContainer>
        <PreviewCardData>
          <PreviewCardDataIsName>{idea.preview_title}</PreviewCardDataIsName>
        </PreviewCardData>
      </PreviewContainer>
    </PreviewCard>
  );
}

export default LessonRecommendation;
