import { GraphQLClient, RequestDocument } from "graphql-request";

const getGraphqlURL = (host: string) => {
  return `${host}/graphql`;
};

export interface DirectusConfig {
  host: string;
  token: string;
}

export const getGraphQLClient = async ({ host, token }: DirectusConfig) => {
  const directusGraphQL = getGraphqlURL(host);
  const graphQLClient = new GraphQLClient(directusGraphQL, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return graphQLClient;
};

export const request =
  (config: DirectusConfig) =>
  async <T>(query: RequestDocument, variables?: object) => {
    console.log(config);
    const client = await getGraphQLClient(config);
    const ret = client.request<T>(query, variables);

    return ret;
  };
