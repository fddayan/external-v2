import React from "react";
import styled from "@emotion/styled";
import LessonRecommendation from "@src/components/ideas/LessonRecommendation";
import { PublicUrlImg } from "@src/types/common";

const Recommendations = styled("div")`
  color: #575b7d;
  margin: 20px 0 0 0;

  &:after {
    content: " ";
    display: table;
    clear: both;
  }
`;

const RecommendationsTitle = styled("div")`
  font-weight: 600;
  line-height: 1;
  margin-bottom: 14px;
`;

const LessonRecommendations = ({
  ideas,
}: {
  ideas: {
    ideas_lesson_right: {
      thumb: PublicUrlImg;
      slug: string;
      preview_title: string;
    };
  }[];
}) => {
  if (!ideas || ideas.length === 0) {
    return null;
  }

  return (
    <Recommendations>
      <RecommendationsTitle>Up next</RecommendationsTitle>
      <div>
        {ideas.slice(0, 3).map((item, index) => (
          <LessonRecommendation key={`preview-card-${index}`} idea={item.ideas_lesson_right} />
        ))}
      </div>
    </Recommendations>
  );
};

export default LessonRecommendations;
