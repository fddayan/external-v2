import * as React from "react";
import {
  graphql,
  useStaticQuery,
  type HeadProps,
  type PageProps,
} from "gatsby";
import { MentorPages } from "@repo/pages/index";

interface Data {
  directus: {
    mentors_page: {
      title: string;
    };
  };
}

function IndexPage(_: PageProps): JSX.Element {
  const data = useStaticQuery<Data>(graphql`
    {
      directus {
        mentors_page {
          title
        }
      }
    }
  `);

  return (
    <main>
      <h1>Mentors</h1>
      <MentorPages data={data.directus.mentors_page} />
    </main>
  );
}

export default IndexPage;

export function Head(_: HeadProps): JSX.Element {
  return <title>Home Page</title>;
}
