import React, { useContext } from "react";
import Button from "@src/components/Button";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import { mediaQueriesMax } from "@src/styles/theme";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import GeoFence from "../partials/GeoFence";
import { getRelativePath } from "@src/utils/routes";

const Meta = styled("div")`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  ${mediaQueriesMax.lesson} {
    flex-direction: column;
  }
`;

const FakeButton = styled("span")`
  display: inline-block;
  font-family: proxima-nova, "Helvetica Neue", Helvetica, Arial, sans-serif;
  box-sizing: border-box;
  color: white;
  background-color: #00aeef;
  padding: 5px 18px 5px 18px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 10px 32px;
  font-size: 20px;
  line-height: 1.33;
  border-radius: 30px;
`;

const MetaGuideline = styled("div")`
  ${mediaQueriesMax.lesson} {
  }

  ul {
    list-style: none;
    padding: 4px 0 4px 34px;
    margin: 0;

    li {
      position: relative;

      display: block;

      margin: 31px 0 0 0;

      font-size: 16px;
      font-weight: 600;
      color: #2c2f42;
      line-height: 1;

      &:first-of-type {
        margin: 0;
      }

      .guide-icon {
        position: absolute;
        left: -34px;
        top: -4px;

        width: 24px;
        height: 24px;
        background-repeat: no-repeat;
        background-position: center;
        border: solid 1px rgba(0, 0, 0, 0.24);
        border-radius: 24px;

        &.icon-play {
          background-size: 15px 15px;
          background-image: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMmMyZjQyIiBmaWxsLW9wYWNpdHk9IjAuMiIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+ICAgIDxwYXRoIGQ9Ik04IDV2MTRsMTEtN3oiLz4gICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==);
        }

        &.icon-message {
          background-size: 12px 12px;
          background-image: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMmMyZjQyIiBmaWxsLW9wYWNpdHk9IjAuMiIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+ICAgIDxwYXRoIGQ9Ik0yMCAySDRjLTEuMSAwLTEuOTkuOS0xLjk5IDJMMiAyMmw0LTRoMTRjMS4xIDAgMi0uOSAyLTJWNGMwLTEuMS0uOS0yLTItMnptLTIgMTJINnYtMmgxMnYyem0wLTNINlY5aDEydjJ6bTAtM0g2VjZoMTJ2MnoiLz4gICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==);
        }

        &.icon-home {
          background-size: 15px 14px;
          background-image: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMmMyZjQyIiBmaWxsLW9wYWNpdHk9IjAuMiIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+ICAgIDxwYXRoIGQ9Ik0xMCAyMHYtNmg0djZoNXYtOGgzTDEyIDMgMiAxMmgzdjh6Ii8+ICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48L3N2Zz4=);
        }

        &.icon-activity {
          background-size: 12px 12px;
          background-image: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMmMyZjQyIiBmaWxsLW9wYWNpdHk9IjAuMiIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+ICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4gICAgPHBhdGggZD0iTTIwIDEyYzAtMS4xLjktMiAyLTJWNmMwLTEuMS0uOS0yLTItMkg0Yy0xLjEgMC0xLjk5LjktMS45OSAydjRjMS4xIDAgMS45OS45IDEuOTkgMnMtLjg5IDItMiAydjRjMCAxLjEuOSAyIDIgMmgxNmMxLjEgMCAyLS45IDItMnYtNGMtMS4xIDAtMi0uOS0yLTJ6bS00LjQyIDQuOEwxMiAxNC41bC0zLjU4IDIuMyAxLjA4LTQuMTItMy4yOS0yLjY5IDQuMjQtLjI1TDEyIDUuOGwxLjU0IDMuOTUgNC4yNC4yNS0zLjI5IDIuNjkgMS4wOSA0LjExeiIvPjwvc3ZnPg==);
        }
      }

      .guide-text {
        white-space: nowrap;
        text-overflow: ellipsis;

        > a {
          color: #2c2f42;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }

    li + li:after {
      content: "";

      position: absolute;
      left: -22px;
      top: -28px;

      height: 25px;
      border-left: 1px solid rgba(0, 0, 0, 0.24);
    }
  }
`;

const LinkButton = styled("button")`
  border: 0;
  background: transparent;
  font-weight: bold;
  color: #2c2f42;
  &:hover {
    text-decoration: underline;
  }
`;

const LessonMetaBottom = (props: { slug: string; steps: { title: string; slide: number }[]; allowed: string }) => {
  const guideline = props.steps.map((e, i) => {
    return (
      <GuideLineSymbol
        key={i}
        urlSlug={props.slug}
        title={e.title}
        canWatch={true}
        slide={i}
        numSteps={Object.keys(props.steps).length}
      />
    );
  });

  return (
    <Meta>
      {props.allowed === "" ? null : props.allowed ? (
        <MetaGuideline>
          <ul>{guideline}</ul>
        </MetaGuideline>
      ) : (
        <GeoFence />
      )}
    </Meta>
  );
};

const GuideLineSymbol = ({
  canWatch,
  urlSlug,
  slide,
  title,
  numSteps,
}: {
  canWatch: boolean;
  urlSlug: string;
  title: string;
  slide: number;
  numSteps: number;
}) => {
  const modals = useContext(ModalContext);

  const symbols = {
    watch: "icon-play",
    discuss: "icon-message",
    share: "icon-home",
    activity: "icon-activity",
  };

  const lowerCaseTitle = title.toLowerCase();
  let className = "guide-icon ";

  if (lowerCaseTitle.includes("watch")) {
    className += symbols.watch;
  } else if (lowerCaseTitle.includes("discuss")) {
    className += symbols.discuss;
  } else if (lowerCaseTitle.includes("share")) {
    className += symbols.share;
    title = "Share to Class Story";
  } else {
    className += symbols.activity;
  }

  return (
    <li>
      {numSteps > 1 && <div className={className} />}
      <div className="guide-text">
        {canWatch ? (
          <Link to={getRelativePath(`/f/${urlSlug}/${slide}`)} tabIndex={0}>
            {numSteps > 1 ? title : <FakeButton>{title}</FakeButton>}
          </Link>
        ) : (
          <div>
            {numSteps > 1 ? (
              <LinkButton
                aria-label={`${title}: This will open teacher signup modal`}
                onClick={() => modals.showModal(ModalType.TeacherSignup)}
              >
                {title}
              </LinkButton>
            ) : (
              <Button
                aria-label={`${title}: This will open teacher signup modal`}
                onClick={() => modals.showModal(ModalType.TeacherSignup)}
              >
                {title}
              </Button>
            )}
          </div>
        )}
      </div>
    </li>
  );
};

export default LessonMetaBottom;
