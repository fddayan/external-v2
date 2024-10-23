import { PageContextServer } from "vike/types";
import { Activity, getActivities } from "../getActivities";

export interface Data {
  activity: Activity;
}

export const data = async (context: PageContextServer) => {
  const { id } = context.routeParams;
  const activities = await getActivities();

  return {
    activity: activities.page_resources_hub_resources.find(
      (activity) => activity.slug === id
    ),
  };
};
