import express from "express";
import { ruruHTML } from "ruru/server";
import bodyParser from "body-parser";
import { setupGraphQLForwardHandler } from "./handler";

const jsonParser = bodyParser.json();

const app = express();

const graphqlForwardHandler = setupGraphQLForwardHandler();

async function main() {
  app.all("/graphql", jsonParser, graphqlForwardHandler);
  app.get("/", (_req, res) => {
    res.type("html");
    res.end(ruruHTML({ endpoint: "/graphql" }));
  });
  app.listen(4000, () => {
    console.log("Listening to port 4000");
  });
}

main().then(() => {
  console.log("Done");
});
