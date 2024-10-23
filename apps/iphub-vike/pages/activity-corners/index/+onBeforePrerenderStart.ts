import { getActivities } from "../getActivities";

export { onBeforePrerenderStart };

async function onBeforePrerenderStart() {
  const response = await getActivities();
  const activityUrls = response.page_resources_hub_resources.map(
    (activity) => ({
      url: "/activity-corners/" + activity.slug,
      pageContext: { data: { activity } },
    })
  );

  const activitiesURL = {
    url: "/activity-corners",
    pageContext: {
      data: { activities: response.page_resources_hub_resources },
    },
  };

  return [activitiesURL, ...activityUrls];
}
