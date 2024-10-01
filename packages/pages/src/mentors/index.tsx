import React from "react";

interface MentorsPageProps {
  data: {
    title: string;
  };
}

export const MentorPages = (props: MentorsPageProps) => {
  return (
    <div>
      <h2>{props.data.title}</h2>
    </div>
  );
};
