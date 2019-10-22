import { print } from "graphql";
import { CombinedError } from "./CombinedError";

const executeFetch = async (url, options) =>
  fetch(url, options).then(res => {
    if (res.status < 200 || res.status >= 300) {
      throw new Error(res.statusText);
    } else {
      return res.json();
    }
  });

export class Client {
  constructor(url) {
    this.url = url;
  }

  execute = async (operation, cb) => {
    const fetchOptions = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        query: print(operation.query),
        variables: operation.variables
      })
    };

    try {
      const { data, errors } = await executeFetch(this.url, fetchOptions);
      cb({
        operation,
        data,
        error: errors ? new CombinedError({ graphQLErrors: errors }) : null
      });
    } catch (networkError) {
      cb({
        operation,
        data: undefined,
        error: networkError ? new CombinedError({ networkError }) : null
      });
    }
  };
}
