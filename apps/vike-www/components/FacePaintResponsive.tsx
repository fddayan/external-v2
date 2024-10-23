import facepaint from "facepaint";

export type FacePaintResponsive<T> = Array<T> | T;

export const mq = facepaint(["@media(min-width: 768px)", "@media(min-width: 992px)", "@media(min-width: 1200px)"]);

export const fpProp = <T,>(
  value: FacePaintResponsive<T> | undefined | null,
  fn: (value: T) => any,
): any[] | undefined => {
  if (!value) return undefined;
  if (!Array.isArray(value)) return [fn(value)];

  return value.map(fn);
};
