import React from "react";
import { useData } from "vike-react/useData";
import { Data } from "./+data";

export default function Page() {
  const data = useData<Data>();

  return (
    <div>
      <h1>{data.activity.title}</h1>
      <p>{JSON.stringify(data.activity)}</p>
    </div>
  );
}
