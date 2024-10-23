import React from "react";
import { AppReviewHeader, AppReviewTitle, Name, Content, DateElement } from "./styles";

export interface AppReviewCardProps {
  title: string;
  stars: any[];
  description: string;
  date: string;
  link: string;
}

const ReviewStar = ({ starWidth }) => (
  <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_1_11)">
      <mask id="mask0_1_11" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="19" height="18">
        <path
          d="M8.38585 0.690984C8.68521 -0.230327 9.98861 -0.230328 10.288 0.690982L11.8066 5.36474C11.9404 5.77677 12.3244 6.05573 12.7576 6.05573H17.6719C18.6406 6.05573 19.0434 7.29534 18.2597 7.86474L14.284 10.7533C13.9335 11.0079 13.7868 11.4593 13.9207 11.8713L15.4393 16.5451C15.7386 17.4664 14.6841 18.2325 13.9004 17.6631L9.9247 14.7746C9.57421 14.5199 9.09961 14.5199 8.74913 14.7746L4.77339 17.6631C3.98967 18.2325 2.93519 17.4664 3.23454 16.5451L4.75314 11.8713C4.88702 11.4593 4.74036 11.0079 4.38987 10.7533L0.414132 7.86475C-0.369582 7.29534 0.0331932 6.05573 1.00192 6.05573H5.9162C6.34943 6.05573 6.73338 5.77677 6.86726 5.36474L8.38585 0.690984Z"
          fill="#D3D7EC"
        />
      </mask>
      <g mask="url(#mask0_1_11)">
        <rect width="18.67" height="17.86" fill="#D9D9D9" />
        <rect width={`${starWidth}%`} height="17.86" fill="#F7B100" />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_1_11">
        <rect width="18.67" height="17.86" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const AppReviewCard: React.FC<AppReviewCardProps> = ({ title, stars, description, date, link }) => {
  return (
    <>
      <AppReviewHeader>
        <AppReviewTitle>{title}</AppReviewTitle>
        <Name>{name}</Name>
        {stars.map((s: number, i: number) => (
          <ReviewStar starWidth={s} key={i} />
        ))}
      </AppReviewHeader>
      <Content>{description}</Content>
      <a href={link} target="_blank" rel="noreferrer">
        <DateElement>
          {date}
          <svg
            style={{ display: "inline-block", marginBottom: -2, marginLeft: 12, height: 16, width: 16 }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M288 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h50.7L169.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L384 141.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H288zM80 64C35.8 64 0 99.8 0 144V400c0 44.2 35.8 80 80 80H336c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v80c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16h80c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
          </svg>
        </DateElement>
      </a>
    </>
  );
};
export default AppReviewCard;
