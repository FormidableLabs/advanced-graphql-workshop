import { useMemo, useRef } from "react";
import { print } from "graphql";
import hash from "djb2a";
import stringify from "fast-json-stable-stringify";

export const createRequest = (operationName, query, variables) => {
  let str = typeof query !== "string" ? print(query) : query;
  if (variables) {
    str += stringify(variables);
  }

  return {
    key: hash(str),
    operationName,
    query,
    variables
  };
};

export const useRequest = (operationName, query, variables) => {
  const prev = useRef();

  return useMemo(() => {
    const request = createRequest(operationName, query, variables);
    if (prev.current !== undefined && prev.current.key === request.key) {
      return prev.current;
    } else {
      return (prev.current = request);
    }
  }, [operationName, query, variables]);
};
