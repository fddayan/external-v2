// pages/posts/[slug].page.ts
import React from "react";
import { useData } from "vike-react/useData";
import { Data } from "./+data";

export default function Page() {
  const data = useData<Data>();

  return (
    <div>
      <ul>
        {data.activities.map(({ slug, title }) => (
          <li>
            <a href={`/activity-corners/${slug}`} key={slug}>
              {title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
