import { print } from "graphql";
import { CombinedError } from "./CombinedError";

const executeFetch = async operation => {
  const { query, variables, context } = operation;

  const options = {
    method: "POST",
    body: JSON.stringify({
      query: print(query),
      variables
    }),
    headers: {
      "content-type": "application/json",
      ...context.fetchOptions.headers
    },
    ...context.fetchOptions
  };

  return fetch(context.url, options)
    .then(res => {
      if (res.status < 200 || res.status >= 300) {
        throw new Error(res.statusText);
      } else {
        return res.json();
      }
    })
    .then(({ data, errors }) => ({
      operation,
      data,
      error: errors ? new CombinedError({ graphQLErrors: errors }) : undefined
    }))
    .catch(networkError => ({
      operation,
      data: undefined,
      error: new CombinedError({ networkError })
    }));
};

export class Client {
  constructor(url, context = {}) {
    this.url = url;
    this.fetchOptions = context.fetchOptions || {};
    this.requestPolicy = context.requestPolicy || "cache-first";
  }

  execute = async (operation, cb) => {
    const operationWithContext = {
      ...operation,
      context: {
        ...operation.context,
        url: this.url,
        fetchOptions: this.fetchOptions
      }
    };

    const result = await executeFetch(operationWithContext);
    cb(result);
  };
}
