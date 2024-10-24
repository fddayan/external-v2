import React from "react";
import { DDSButton } from "@web-monorepo/dds";
import style from "./style.module.css";
import { Activity } from "@repo/data";
import { SignedIn, SignedOut, useUser } from "@repo/product";

interface ActivityCornerPageProps {
  data: {
    activity: Activity;
    tags: string[];
  };
  slots: {
    downloadButtonText: string;
    discussionLinkText: string;
    featureTitle: string;
  };
}

export const ActivityCornerPage = ({
  data,
  slots,
}: ActivityCornerPageProps) => {
  const { activity, tags } = data;
  const { title, overTitle, description } = activity;
  const { downloadButtonText, discussionLinkText, featureTitle } = slots;

  const user = useUser();

  return (
    <div className={style.containerWrapper}>
      <SignedIn>
        SIGN IN {user?.firstName} {user?.lastName}
      </SignedIn>
      <SignedOut>SIGN OUT</SignedOut>
      <div className={style.container}>
        <div className={style.panel}>
          <div className={style.panelImg}>
            <img src="https://placehold.co/600x400" alt="placeholder" />
          </div>
          <div className={style.panelContent}>
            <div className={style.panelContentWrapper}>
              <div className={style.panelOverTitle}>{overTitle}</div>
              <div className={style.panelTitle}>{title}</div>
              <div className={style.panelDescription}>{description}</div>
            </div>

            <div className={style.panelButtons}>
              <DDSButton data-name="download">{downloadButtonText}</DDSButton>
              <DDSButton data-name="guide">{discussionLinkText}</DDSButton>
            </div>
          </div>
        </div>

        <div className={style.feature}>
          <div className={style.featureTitle}>{featureTitle}</div>
          <div className={style.featureTags}>
            {tags.map((tag) => (
              <span key={tag} className={style.featureTag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
