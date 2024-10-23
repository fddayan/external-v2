import { request } from "@repo/data";
import { RequestHandler } from "express";

export const setupGraphQLForwardHandler = (): RequestHandler => {
  return async (req, res) => {
    const { query, variables } = req.body;

    try {
      // Forward the query to the target server
      const data = await request(query, variables);
      res.json(data);
    } catch (error: any) {
      res.status(500).json({
        error: "Error forwarding GraphQL request",
        details: error.message,
      });
    }
  };
};
