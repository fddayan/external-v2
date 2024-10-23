import React from "react";
import { DDSButton } from "@web-monorepo/dds";

interface MentorsPageProps {
  data: {
    title: string;
  };
}

export const ActivityCornerPage = (props: MentorsPageProps) => {
  return (
    <div>
      <h2>{props.data.title}</h2>
      <DDSButton data-name="Fede">Fede</DDSButton>
    </div>
  );
};
