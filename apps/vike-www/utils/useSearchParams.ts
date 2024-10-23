import "url-search-params-polyfill";

import { useLocation } from "@reach/router";

export default function useSearchParams(...names: string[]) {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const result: string[] = [];
  for (const name of names) {
    result.push(params.get(name));
  }

  return result;
}
