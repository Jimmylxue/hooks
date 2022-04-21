import { useEffect, useState } from 'react';
import useLoading from '..//useLoading';

/**
 * useEffect 与 useLayoutEffect 的区别：
 *  - useEffect 是异步执行的，而useLayoutEffect是同步执行的。
 *  - useEffect 的执行时机是浏览器完成渲染之后，而 useLayoutEffect 的执行时机是浏览器把内容真正渲染到界面之前，和 componentDidMount 等价。
 */

type IUseLoadingOptions = {
  onSuccess?: (result: any) => void | any;
  onError?: (err: Error) => void | any;
  onFinish?: (result: any) => void | any;
};

type preData = {
  auto?: boolean;
  initialState?: { data: []; error?: any };
  useCustomEffect?: typeof useEffect;
} & IUseLoadingOptions;

function isFunction(fn: any): boolean {
  return typeof fn === 'function';
}

function useFetch<T extends (...args: any[]) => any>(
  fn: T,
  deps: any[],
  {
    onSuccess,
    onError,
    onFinish,
    initialState,
    auto = true,
    useCustomEffect = useEffect,
  }: preData = {},
) {
  const [state, setState] = useState(() => {
    return isFunction(initialState) ? (initialState as unknown as () => any)() : initialState;
  });
  // console.log('state', initialState, state);
  const result = useLoading(fn, {
    onSuccess: (data) => {
      console.log('comming', data);
      if (onSuccess) {
        onSuccess(data);
        setState((s: any) => {
          console.log('s', s);
          return { ...s, data };
        });
        return;
      }
      console.log('none success');
      setState((s: any) => {
        console.log('s2', s, { ...s, data });
        return { ...s, data };
      });
    },
    onError: (error) => {
      // error 这里是接口的错误信息
      if (onError) {
        const errorResult = onError(error);
        console.log('error', error, errorResult);
        setState((s: { data: [] }) => {
          console.log('error2', { ...s, error, ...errorResult });
          return { ...s, error, ...errorResult };
        });
        return;
      }
      const initState = isFunction(initialState)
        ? (initialState as unknown as () => any)()
        : initialState;
      return { ...initState };
    },
    onFinish,
  });

  useCustomEffect(() => {
    if (auto) {
      (result.run as () => void)();

      return result.cancel;
    }
  }, deps);
  return { ...result, ...state, setState };
}

export default useFetch;
