export const collectTypes = (obj, types = new Set()) => {
  if (Array.isArray(obj)) {
    obj.forEach(inner => {
      collectTypes(inner, types);
    });
  } else if (typeof obj === "object" && obj !== null) {
    Object.keys(obj).forEach(key => {
      if (key === "__typename") {
        types.add(obj[key]);
      } else {
        collectTypes(obj[key], types);
      }
    });
  }

  return types;
};
