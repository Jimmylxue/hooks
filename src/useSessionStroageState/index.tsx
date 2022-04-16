import { useState, useCallback } from 'react';

const isFunction = (fn: any): boolean => {
  return typeof fn === 'function';
};

function useSessionStroageState<T>(key: string, defaultValue?: T | (() => T)) {
  const [state, setState] = useState<T>(() => {
    try {
      const sessionValue = JSON.parse(sessionStorage.getItem(key)!);
      if (sessionValue) {
        return sessionValue;
      }
    } catch (error) {}
    // @ts-ignore
    return isFunction(defaultValue) ? defaultValue() : defaultValue;
  });

  const updateState: typeof setState = useCallback((value) => {
    const valueType = typeof value;
    if (isFunction(value)) {
      setState((val) => {
        const nextValue = (value as (value: T) => T)(val);
        setTimeout(() => sessionStorage.setItem(key, JSON.stringify(nextValue)));
        return nextValue;
      });
      return;
    }

    if (valueType === undefined) {
      setState(value);
      setTimeout(() => {
        sessionStorage.removeItem(key);
      });
      return;
    }

    setState(value);
    setTimeout(() => {
      sessionStorage.setItem(key, JSON.stringify(value));
    });
  }, []);

  return [state, updateState] as const;
}

export default useSessionStroageState;
