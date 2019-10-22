import { useMemo } from "react";
import { parse, print } from "graphql";
import hash from "djb2a";
import stringify from "fast-json-stable-stringify";

export const useRequest = (operationName, query, variables) => {
  const key = useMemo(() => {
    let str = typeof query !== "string" ? print(query) : query;

    if (variables) {
      str += stringify(variables);
    }

    return hash(str);
  }, [query, variables]);

  return useMemo(() => {
    return {
      key,
      operationName,
      query: typeof query === "string" ? parse(query) : query,
      variables
    };
    // eslint-disable-next-line
  }, [operationName, key]);
};
