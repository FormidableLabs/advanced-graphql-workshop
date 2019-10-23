export const dedupExchange = ({ forward }) => sendResult => {
  const activeOperations = new Set();

  const next = forward(result => {
    activeOperations.delete(result.operation.key);
    sendResult(result);
  });

  return operation => {
    if (operation.operationName === "teardown") {
      activeOperations.delete(operation.key);
      next(operation);
    } else if (!activeOperations.has(operation.key)) {
      activeOperations.add(operation.key);
      next(operation);
    }
  };
};
