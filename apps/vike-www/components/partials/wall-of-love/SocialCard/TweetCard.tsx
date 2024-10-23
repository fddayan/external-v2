import React from "react";
import {
  TweetHeader,
  ProfilePhoto,
  ProfileDetails,
  TwitterName,
  Handle,
  Content,
  TweetImage,
  DateElement,
} from "./styles";
import { marginLeft } from "styled-system";

export interface TweetCardProps {
  content: string;
  date: string;
  url: string;
  user: {
    name: string;
    handle: string;
    avatar: string;
  };
  media: {
    type: "photo" | "video" | "animated_gif";
    url: string;
  }[];
}

const TweetCard: React.FC<TweetCardProps> = ({
  url,
  media,
  user,
  content,
  date,
}) => {
  return (
    <>
      <TweetHeader>
        <ProfilePhoto src={user.avatar} />
        <ProfileDetails>
          <TwitterName>{user.name}</TwitterName>
          <Handle>@{user.handle}</Handle>
        </ProfileDetails>
      </TweetHeader>
      <Content>{content}</Content>
      {!!media.length && <TweetImage src={media[0].url} alt={user.name} />}
      <a href={url} target="_blank" rel="noreferrer">
        <DateElement>
          {date}
          <svg
            style={{
              display: "inline-block",
              marginBottom: -2,
              marginLeft: 12,
              height: 16,
              width: 16,
            }}
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

export default TweetCard;
