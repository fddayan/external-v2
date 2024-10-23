import { GraphQLClient, request } from "graphql-request";
import fs from "fs";
import { printSchema, buildClientSchema, getIntrospectionQuery } from "graphql";

export const directusURL = "http://localhost:8055";

export const directusGraphQL = `${directusURL}/graphql`;

// const introspectionQuery = `
//   {
//     __schema {
//       types {
//         name
//         kind
//         description
//         fields {
//           name
//         }
//       }
//     }
//   }
// `;

export const getAuthToken = async () => {
  const response = await fetch(`${directusURL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "admin@example.com",
      password: "d1r3ctu5",
    }),
  });
  const data = await response.json();
  return data.data.access_token;
};

export const getGraphQLClient = async () => {
  const token = await getAuthToken();
  const graphQLClient = new GraphQLClient(directusGraphQL, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return graphQLClient;
};

async function main() {
  const token = await getAuthToken();
  const client = await getGraphQLClient();
  const data = await client.request<any>(getIntrospectionQuery());
  const schema = JSON.stringify(data, null, 2);

  const v = buildClientSchema(data, { assumeValid: true });

  // console.log(printSchema(v));

  fs.writeFileSync("schema.json", schema);

  // request(
  //   {
  //     url: endpoint,
  //     headers: {
  //       authorization: `Bearer ${token}`,
  //     },
  //   },
  //   introspectionQuery
  // ).then((data) => {
  //   const schema = JSON.stringify(data, null, 2);
  //   fs.writeFileSync("schema.json", schema);
  //   console.log("Schema saved to schema.json");
  // });
}

main().then(() => {
  console.log("Done");
});
