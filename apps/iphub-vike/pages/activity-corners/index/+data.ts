import { Activity, getActivities } from "@repo/data";
import { PageContextServer } from "vike/types";
import { getDirectusConfig } from "../../../utils/directurs";

export interface Data {
  activities: Activity[];
}

export const data = async (context: PageContextServer) => {
  const activities = await getActivities(getDirectusConfig())();

  return activities;
};
