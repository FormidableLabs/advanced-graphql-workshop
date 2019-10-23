import { useState, useEffect, useCallback } from "react";
import { useRequest } from "./useRequest";
import { useClient } from "./Context";

export const useQuery = ({ query, variables }) => {
  const client = useClient();
  const request = useRequest("query", query, variables);

  const [result, setResult] = useState({
    fetching: true
  });

  const executeQuery = useCallback(async () => {
    setResult(res => ({ ...res, fetching: true }));

    return client.execute(request, result => {
      setResult({
        ...result,
        fetching: false
      });
    });
  }, [client, request]);

  useEffect(() => {
    async function fetchQuery() {
      return await executeQuery();
    }

    fetchQuery();
  }, [request, client, executeQuery]);

  return [result, executeQuery];
};
