import { Activity, getActivities } from "@repo/data";
import { PageContextServer } from "vike/types";
import { env } from "../../../env";
import { getDirectusConfig } from "../../../utils/directurs";

export interface Data {
  activity: Activity;
  tags: string[];
}

export const data = async (context: PageContextServer) => {
  const { id } = context.routeParams;
  const activities = await getActivities(getDirectusConfig())();

  return {
    activity: activities.page_resources_hub_resources.find(
      (activity) => activity.slug === id
    ),
    tags: ["tag1", "tag2", "tag3"],
  };
};
