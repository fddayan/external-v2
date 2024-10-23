import React from "react";
import { DDSButton } from "@web-monorepo/dds";
import style from "./style.module.css";

interface MentorsPageProps {
  data: {
    title: string;
  };
}

export const ActivityCornerPage = (props: MentorsPageProps) => {
  return (
    <div className={style.container}>
      <h2>{props.data.title}</h2>
      <DDSButton data-name="Fede">Fede</DDSButton>
    </div>
  );
};
