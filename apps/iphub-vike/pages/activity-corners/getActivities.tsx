import { request } from "@repo/data";
import { gql } from "graphql-request";
import { env } from "../../env";

export interface Activity {
  slug: string;
  title: string;
  description: string;
}

export interface Response {
  page_resources_hub_resources: Activity[];
}

export const getActivities = async () => {
  const res = await request({
    host: env.DIRECTUS_HOST,
    token: env.DIRECTUS_TOKEN,
  })<Response>(gql`
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
