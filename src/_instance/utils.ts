export type Nullable<T> = T | undefined | null;

export function isFunction(fn: any): fn is Function {
  return typeof fn === 'function';
}

export const delayRun = (fn: Function) => setTimeout(fn);
