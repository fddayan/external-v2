import { PageContextServer } from "vike/types";
import { Activity, getActivities } from "../getActivities";

export interface Data {
  activities: Activity[];
}

export const data = async (context: PageContextServer) => {
  const activities = await getActivities();

  return activities;
};
