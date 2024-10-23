import React from "react";
import { useData } from "vike-react/useData";
import { Data } from "./+data";
import styles from "./style.module.css";

export default function Page() {
  const data = useData<Data>();

  return (
    <div className={styles.container}>
      <h1>{data.activity.title}</h1>
      <p>{JSON.stringify(data.activity)}</p>
    </div>
  );
}
