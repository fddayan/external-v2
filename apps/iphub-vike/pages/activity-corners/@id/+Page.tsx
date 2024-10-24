import React from "react";
import { useData } from "vike-react/useData";
import { Data } from "./+data";
import styles from "./style.module.css";
import { ActivityCornerPage } from "@repo/iphub-pages/index";

export default function Page() {
  const data = useData<Data>();

  return (
    <ActivityCornerPage
      data={data}
      slots={{
        downloadButtonText: "Download",
        discussionLinkText: "Discussion",
        featureTitle: "Feature",
      }}
    />
  );
}
