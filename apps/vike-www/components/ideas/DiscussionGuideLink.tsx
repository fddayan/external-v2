import { MdPictureAsPdf } from "react-icons/md";
import React from "react";
import styled from "@emotion/styled";
import { mediaQueriesMax } from "@src/styles/theme";

const GuideLink = styled("div")`
  margin: 26px 0 0 41px;

  ${mediaQueriesMax.lesson} {
    margin: 26px 38px 0 20px;
  }

  a {
    color: #575b7d;
  }

  a > * {
    display: inline-block;
    vertical-align: middle;
  }
`;

const Label = styled("span")`
  font-size: 16px;
  line-height: 1;
  text-decoration: underline;
  margin-left: 5px;
  &:first-letter {
    text-transform: uppercase;
  }
`;

const DiscussionGuideLink = ({ label, link }: { label: string; link: string }) => {
  return (
    <GuideLink>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <MdPictureAsPdf className="is-icon" width="24" color="#d01717" />
        <Label>{label}</Label>
      </a>
    </GuideLink>
  );
};

export default DiscussionGuideLink;
