import { visit, Kind } from "graphql";

const isTypenameField = node =>
  node.kind === Kind.FIELD && node.name.value === "__typename";

const formatNode = node => {
  if (!node.selectionSet) {
    return false;
  } else if (node.selectionSet.selections.some(isTypenameField)) {
    return node;
  }

  node.selectionSet.selections.push({
    kind: Kind.FIELD,
    name: {
      kind: Kind.NAME,
      value: "__typename"
    }
  });

  return node;
};

export const addTypenames = (document: DocumentNode) =>
  visit(document, {
    Field: formatNode,
    InlineFragment: formatNode
  });
