import { useState, useEffect } from "react";
import { print } from "graphql";
import { useRequest } from "./useRequest";

export const useQuery = ({ query, variables }) => {
  const request = useRequest(query, variables);
  const [result, setResult] = useState({
    data: undefined,
    error: undefined,
    fetching: true
  });

  useEffect(() => {
    setResult(res => ({ ...res, fetching: true }));

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        query: print(request.query),
        variables: request.variables
      })
    };

    fetch("https://threed-test-api.herokuapp.com/graphql", options)
      .then(res => {
        if (res.status < 200 || res.status >= 300) {
          throw new Error(res.statusText);
        } else {
          return res.json();
        }
      })
      .then(({ data, errors }) => {
        return setResult({
          data,
          errors,
          fetching: false
        });
      })
      .catch(error => {
        return setResult({
          data: undefined,
          errors: [error],
          fetching: false
        });
      });
    // eslint-disable-next-line
  }, []);

  return result;
};
