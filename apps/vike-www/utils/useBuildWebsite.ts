import { graphql, useStaticQuery } from "gatsby";

function useBuildWebsite(): string {
  const query = useStaticQuery(graphql`
    query {
      buildInfo {
        website
        buildId
      }
    }
  `);
  return query;
}

export default useBuildWebsite;
