import React from "react";
import { Link } from "gatsby";
import { mediaQueriesMax } from "@src/styles/theme";
import { css } from "@emotion/react";
import { logEvent } from "@src/utils/logClient";
import { getRelativePath } from "@src/utils/routes";

const heroAction = css`
  width: 159px;
  border-radius: 8px;
  background-color: #00aeef;

  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: #ffffff;
  padding: 15px 10px;
  display: block;
  margin-bottom: 15px;

  ${mediaQueriesMax.lesson} {
    width: calc(100% - 40px);
  }

  &:hover {
    cursor: pointer;
    background-color: #00baff;
  }
`;

function ActivityButton(props: { header_type: "video" | "image" } & MediaButtonProps) {
  const type = props.header_type;

  if (type !== "video") {
    return <ImageButton {...props} />;
  }
  return <VideoButton {...props} />;
}

type MediaButtonProps = { showButton: boolean; slug: string };
function ImageButton(props: MediaButtonProps) {
  let button = null;

  if (props.showButton || props.showButton === undefined) {
    button = (
      <Link
        to={getRelativePath(`/f/${props.slug}`)}
        css={heroAction}
        onClick={() => {
          logEvent({
            eventName: "ideas.activityStart",
            eventValue: props.slug,
          });
        }}
      >
        Start activity
      </Link>
    );
  }

  return button;
}

function VideoButton(props: MediaButtonProps) {
  let button = null;

  if (props.showButton) {
    button = (
      <Link to={getRelativePath(`/f/${props.slug}`)} data-test-name="videoStartActivityButton" css={heroAction}>
        Start activity
      </Link>
    );
  }

  return button;
}

export default ActivityButton;
