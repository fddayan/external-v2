import React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import { mediaQueriesMax } from "@src/styles/theme";
import { theme, Subheading } from "@src/components/nessie-web";
import { getRelativePath } from "@src/utils/routes";
import { PublicUrlImg } from "@src/types/common";
import { getFilenameDiskUrl } from "@src/utils/normalize-static-query-result";

const PreviewCard = styled(Link)`
  display: block;
  border: ${theme.borders.dt_border_card};
  border-radius: ${theme.radii.dt_radius_m};
  box-shadow: ${theme.shadows[2]};
  overflow: hidden;
  cursor: pointer;
  transition: transform ease 0.3s, box-shadow ease 0.3s;

  ${mediaQueriesMax[0]} {
    margin-bottom: ${theme.space.m}px;
  }

  &:hover {
    box-shadow: ${theme.shadows[0]};
    transform: translateY(-4px);
  }
`;

const DisabledPreviewContainer = styled.div``;

const PreviewCardImg = styled("div")`
  background-size: cover;
  background-position: center;
  height: 140px;
`;

const PreviewCardDataIsName = styled(Subheading)`
  color: ${theme.colors.aqua60} !important;
  padding: ${theme.space.s}px ${theme.space.m}px !important;
`;

export const Tag = styled("div")`
  padding: 4px 8px;
  border-radius: 6px;
  text-transform: uppercase;
  background-color: ${theme.colors.aqua60};
  color: ${theme.colors.white};
  font-size: 12px;
  font-weight: 700;
  position: absolute;
  top: 6px;
  right: 6px;
  z-index: 100;
`;

function IdeaPreviewCard(props: {
  idea: {
    note?: string;
    duration?: string;
    thumb: PublicUrlImg;
    title: string;
    preview_title: string;
    unreleased: boolean;
    release_date: string;
    slug: string;
  };
  openModal: () => void;
  preview: boolean;
}) {
  const idea = props.idea;
  const image = getFilenameDiskUrl(idea.thumb);
  const title = props.preview ? idea.preview_title : idea.title;
  let { unreleased } = idea;
  if (idea.release_date) {
    const currentDate = new Date();
    const releaseDate = new Date(`${idea.release_date}`);
    unreleased = currentDate.getTime() - releaseDate.getTime() < 0;
  }

  if (unreleased) {
    return (
      <PreviewCard to={getRelativePath(`/i/${idea.slug}`)}>
        <DisabledPreviewContainer onClick={props.openModal}></DisabledPreviewContainer>
      </PreviewCard>
    );
  }

  return (
    <PreviewCard to={getRelativePath(`/i/${idea.slug}`)}>
      <PreviewCardImg style={{ backgroundImage: `url(${image})` }} />
      <PreviewCardDataIsName>{title}</PreviewCardDataIsName>
    </PreviewCard>
  );
}

export default IdeaPreviewCard;
