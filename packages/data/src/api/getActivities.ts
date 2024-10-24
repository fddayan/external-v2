import { DirectusConfig, request } from "@repo/data";
import { gql } from "graphql-request";

export interface Activity {
  slug: string;
  title: string;
  overTitle: string;
  description: string;
}

export type GetActivitiesInput = never;

export interface GetActivitiesOutput {
  page_resources_hub_resources: Activity[];
}

export const getActivities = (config: DirectusConfig) => async () => {
  const res = await request(config)<GetActivitiesOutput>(gql`
    query {
      page_resources_hub_resources {
        slug
        title
        description
      }
    }
  `);

  return res;
};
