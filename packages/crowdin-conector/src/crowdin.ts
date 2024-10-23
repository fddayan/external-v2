import { gql, GraphQLClient } from "graphql-request";

// Directus GraphQL endpoint
const endpoint = "https://your-directus-instance-url/graphql";

const graphQLClient = new GraphQLClient(endpoint);

const query = gql`
  query {
    posts {
      id
      title
      content
    }
  }
`;

export const fetchData = async () => graphQLClient.request(query);
