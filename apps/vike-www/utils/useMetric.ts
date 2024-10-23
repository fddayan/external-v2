import { useEffect } from "react";
import { incrementMetric } from "./logClient";

export default function useMetric(metric: string) {
  useEffect(() => {
    incrementMetric(metric);
  }, [metric]);
}
