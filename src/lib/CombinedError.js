import { GraphQLError } from "graphql";

const rehydrateGraphQLError = error => {
  if (typeof error === "string") {
    return new GraphQLError(error);
  } else if (typeof error === "object" && error.message) {
    return new GraphQLError(
      error.message,
      error.nodes,
      error.source,
      error.positions,
      error.path,
      error.originalError,
      error.extensions || {}
    );
  }
};

const makeErrorMessage = (networkError, graphQLErrors) => {
  if (networkError) {
    return "[Network] " + networkError.message;
  } else if (graphQLErrors) {
    return graphQLErrors
      .map(({ message }) => `[GraphQL] ${message}`)
      .join("\n");
  } else {
    return "[CombinedError]";
  }
};

export class CombinedError extends Error {
  constructor({ networkError, graphQLErrors }) {
    const rehydratedErrors = graphQLErrors
      ? graphQLErrors.map(rehydrateGraphQLError)
      : undefined;
    const message = makeErrorMessage(networkError, rehydratedErrors);

    super(message);

    this.name = "CombinedError";
    this.message = message;
    this.graphQLErrors = rehydratedErrors;
    this.networkError = networkError;
  }
}
