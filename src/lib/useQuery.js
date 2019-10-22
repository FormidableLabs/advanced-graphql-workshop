import { useState, useEffect } from "react";
import { useRequest } from "./useRequest";
import { useClient } from "./Context";

export const useQuery = ({ query, variables }) => {
  const client = useClient();
  const request = useRequest("query", query, variables);

  const [result, setResult] = useState({
    fetching: true
  });

  useEffect(() => {
    setResult(res => ({ ...res, fetching: true }));

    client.execute(request, result => {
      setResult({
        ...result,
        fetching: false
      });
    });
  }, [request, client]);

  return result;
};
