export type FormErrors<T> = {
  [P in keyof T]?: boolean;
};
