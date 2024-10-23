import { GraphQLClient, RequestDocument } from "graphql-request";

// export const directusURL = "http://localhost:8055";

// export const directusGraphQL = `${directusURL}/graphql`;

// export const getAuthToken = async () => {
//   const response = await fetch(`${directusURL}/auth/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       email: "admin@example.com",
//       password: "d1r3ctu5",
//     }),
//   });
//   const data = await response.json();
//   return data.data.access_token;
// };

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
