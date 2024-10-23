import React from "react";
import styled from "@emotion/styled";
import { mediaQueriesMax } from "@src/styles/theme";
import { Box } from "@src/components/Boxes";
import ActivityButton from "@src/components/ideas/ActivityButton";
import LessonMetaBottom from "@src/components/ideas/LessonMetaBottom";
import DiscussionGuideLink from "@src/components/ideas/DiscussionGuideLink";
import { PublicUrlImg } from "@src/types/common";

const Cover = styled("div")`
  * > &:last-of-type {
    margin-bottom: 0;
  }

  &.is-naked {
    padding: 0;
  }

  ${mediaQueriesMax.lesson} {
    padding: 0 0 108px 0;
  }

  padding: 0 0 52px 0;
  margin: 0;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.24);
  border: solid 1px rgba(0, 0, 0, 0.12);

  ${mediaQueriesMax.lesson} {
    padding: 0 0 108px 0;
  }
`;

const Hero = styled("div")`
  width: calc(100% + 2px);
  height: 300px;
  margin: -1px -1px 0 -1px;

  ${mediaQueriesMax.lesson} {
    height: 114px;
  }
`;

const HeroContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 300px;
  border-radius: 8px 8px 0 0;

  border-bottom: 1px solid #e2e2e2;

  overflow: hidden;

  ${mediaQueriesMax.lesson} {
    height: 114px;
  }
`;

const HeroPoster = styled(`img`)`
  width: 100%;
`;

const MetaTitle = styled("div")`
  font-size: 32px;
  font-weight: bold;
  color: #2c2f42;
  line-height: 1.3;
  margin-bottom: 15px;

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

const MetaTeaser = styled("div")`
  font-size: 16px;
  line-height: 20px;
  color: #2c2f42;

  ${mediaQueriesMax.lesson} {
    width: 100%;
  }

  p {
    margin: 0 0 20px 0;
  }
`;

const MiddleContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  ${mediaQueriesMax.lesson} {
    flex-direction: column;
  }
`;

const RightContentContainer = styled("div")`
  margin: 30px;
`;

const LessonCover = (props: {
  lesson: {
    duration?: string;
    header_poster_url: PublicUrlImg;
    slug: string;
    require_auth: boolean;
    header_type: "video" | "image";
    slides: {
      title: string;
      slide: number;
    }[];
  };
  discussionGuide: { link: string; label: string };
  allowed: string;
  meta: { teaser: string; title: string };
  showButton: boolean;
}) => {
  let activityDuration = props.lesson.duration ? props.lesson.duration.trim() : "";

  activityDuration =
    activityDuration[activityDuration.length - 1] === "s" ? activityDuration.slice(0, -1) : activityDuration;
  let content = props.meta.teaser;
  if (content) {
    content = content.replace(/\\n/g, "");
  }
  return (
    <Cover>
      <Box position="relative">
        <div>
          <Hero>
            <HeroContainer>
              <HeroPoster src={props.lesson.header_poster_url.file.publicURL} />
            </HeroContainer>
          </Hero>
        </div>
        <MiddleContainer>
          <Meta data-test-name="metaTop">
            <MetaTitle data-test-name="metaTitle">{props.meta.title.split("- ").pop()}</MetaTitle>
            {activityDuration && <MetaDuration>{activityDuration} activity</MetaDuration>}
            <div>
              <MetaTeaser
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
              />
            </div>
          </Meta>
          <RightContentContainer>
            <ActivityButton {...props.lesson} slug={props.lesson.slug} showButton={props.showButton} />
            <LessonMetaBottom
              {...props.meta}
              allowed={props.allowed}
              steps={props.lesson.slides}
              slug={props.lesson.slug}
            />
          </RightContentContainer>
        </MiddleContainer>
        {props.discussionGuide.link && <DiscussionGuideLink {...props.discussionGuide} />}
      </Box>
    </Cover>
  );
};

export default LessonCover;
