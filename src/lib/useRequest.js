import { useMemo } from "react";
import { parse } from "graphql";

export const useRequest = (query, variables) => {
  return useMemo(() => {
    return {
      query: typeof query === "string" ? parse(query) : query,
      variables
    };
  }, [query, variables]);
};
