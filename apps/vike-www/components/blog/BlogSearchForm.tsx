import React, { useCallback, useEffect, useState } from "react";
import { Flex, FlexList } from "@src/components/Boxes";
import Link from "@src/components/UTMLink";
import { H4, H3 } from "@src/components/Text";
import styled from "@emotion/styled";
import { theme } from "@src/components/nessie-web";
import { FlexSearchStoreItem } from "@src/typings";

const LinkText = styled.span`
  color: #777;
  font-family: proxima-nova, "Helvetica Neue", Helvetica, Arial, sans-serif;

  &:hover {
    color: #00bcf2;
    text-decoration: none;
  }
`;

type FlexSearchNode = FlexSearchStoreItem["node"];

const ResultList = ({ results, closeSearch }: { results: FlexSearchNode[]; closeSearch: () => void }) => {
  function getPostPath(post: FlexSearchNode) {
    if (post.for_website === "dev-blog") {
      const date = post.publish_date.split("-");
      return `/${date[0]}/${date[1]}/${date[2]}/${post.slug}`;
    } else return `/${post.slug}`;
  }
  if (results.length > 0) {
    return (
      <>
        {results.slice(0, 10).map((page, i) => (
          <li key={i} style={{ padding: theme.space.s }}>
            <Link to={getPostPath(page)} onClick={closeSearch}>
              <LinkText id="searchResults">{page.title}</LinkText>
            </Link>
          </li>
        ))}
      </>
    );
  } else {
    return null;
  }
};

type BlogSearchFormProps = {
  closeSearch: () => void;
};
const BlogSearchForm: React.FC<BlogSearchFormProps> = ({ closeSearch }) => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<FlexSearchNode[] | null>(null);

  const search = useCallback(async () => {
    if (query.length > 2) {
      const results = await getSearchResults(query);
      setResults(results);
    } else {
      setResults(null);
    }
  }, [query]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      await search();
    }, 500);

    return () => clearTimeout(timeout);
  }, [query, search]);

  return (
    <Flex flexDirection="column">
      <Flex alignItems="center" justifyContent="center" maxWidth={"560px"} width={"80%"} mx="auto" minHeight="65px">
        <input
          id="blog-search-input"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-controls="searchResults"
          placeholder={"search here ..."}
          aria-label="Search in the blog"
          role={"searchbox"}
          autoFocus
        />
      </Flex>
      {/* for a11y reasons, these divs need to always be rendered.
      the only thing that should change is the hidden property.
      Otherwise, they are not properlly announced on nvda */}
      <div role={"status"} aria-live="polite" hidden={!results || results.length === 0} id="searchResults">
        <H3 color={theme.colors.dt_taro90}>Search Results</H3>
        <H4 style={{ marginTop: "0", marginBottom: theme.space.l }} color={theme.colors.dt_taro90}>
          {results?.length} results
        </H4>
        <FlexList flexDirection="column" marginBottom="20px">
          <ResultList results={results || []} closeSearch={closeSearch} />
        </FlexList>
      </div>
      <div role={"status"} aria-live="polite" hidden={!results || results.length > 0 || query.length < 3}>
        <Flex flexDirection="column" marginBottom="20px">
          <H4 id="searchResults">{"No results for " + query}</H4>
        </Flex>
      </div>
      <div role={"status"} aria-live="polite" hidden={query.length === 0 || query.length >= 3}>
        <Flex flexDirection="column" marginBottom="20px">
          <H4 id="searchResults">Please insert at least 3 characters</H4>
        </Flex>
      </div>
    </Flex>
  );
};

export default BlogSearchForm;

const getSearchResults = async (query: string): Promise<FlexSearchNode[]> => {
  const index = window.__FLEXSEARCH__.en.index;
  const store = window.__FLEXSEARCH__.en.store;
  if (!query || !index) {
    return [];
  } else {
    const searchPromise = index.map((indexEntry) => indexEntry.values.search(query));
    const results = (await Promise.all(searchPromise)).flat();

    // find the unique ids of the nodes
    const resultsSet = Array.from(new Set(results));

    // return the corresponding nodes in the store
    const nodes = store.filter((node) => (resultsSet.includes(node.id) ? node : null)).map((node) => node.node);

    return nodes;
  }
};
