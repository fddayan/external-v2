export const buildNormalizeStaticQueryResult = (baseUrl: string) => (data: Record<string, any>) => {
  return normalizeStaticQueryResult(baseUrl, data);
};

export const normalizeStaticQueryResult = (baseURL: string, data: Record<string, any>) => {
  const predicate = (_value: any, key: string) => {
    return key === "filename_disk";
  };
  const modify = (value: any, _key: string, parent: Record<string, any>) => {
    parent["file"] = { publicURL: `${baseURL}/${value}` };

    return value;
  };

  deepTraverseAndModify(data["directus"], predicate, modify);

  return data;
};

export const deepTraverseObject = (
  obj: Record<string, any> | undefined | null,
  callback: (value: any, key: string, parent: Record<string, any>) => void,
) => {
  if (!obj) return;

  Object.entries(obj).forEach(([key, value]) => {
    callback(value, key, obj);
    if (typeof value === "object" && value !== null) {
      deepTraverseObject(value, callback);
    }
  });
};

export const deepTraverseAndModify = (
  obj: Record<string, any>,
  predicate: (value: any, key: string, parent: Record<string, any>) => boolean,
  modifier: (value: any, key: string, parent: Record<string, any>) => any,
) => {
  deepTraverseObject(obj, (value, key, parent) => {
    if (predicate(value, key, parent)) {
      parent[key] = modifier(value, key, parent);
    }
  });
};

export const BASE_URL = "https://static.classdojo.com/uploads";

export const getFilenameDiskUrl = (value: { filename_disk: string }) => `${BASE_URL}/${value.filename_disk}`;

export const defaultNormalizeStaticQueryResult = buildNormalizeStaticQueryResult(BASE_URL);
