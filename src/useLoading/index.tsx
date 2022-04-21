import { useState, useMemo, useRef } from 'react';

type IUseLoadingState = {
  loading: boolean;
};

type IUseLoadingOptions<T> = {
  onSuccess: (result: T) => void;
  onError: (err: Error) => void;
  onFinish?: (result: T) => void;
};

export default function useLoading<T>(
  fn: any,
  options?: IUseLoadingOptions<T>,
  initState?: IUseLoadingState,
) {
  const [state, setState] = useState({
    loading: false,
    ...initState, // 这里如果我们传了初始值 这里会对初始值做一个更新
  });

  /**
   * useRef 的基础使用就是 有一个 current 属性
   *  这点和 vue3 的 ref API 是一样的 只是 vue3 是 .value 这个是 .ref
   * useRef 一般最常用的是用于 绑定DOM 元素
   * 这个demo中 用于充当一个不被render的对象，因为它可以 “跨渲染周期” 保存数据。
   */
  const fnsRef = useRef<any>({
    fn,
    ...options,
  });

  fnsRef.current = {
    cancel: fnsRef.current.cancel,
    fn,
    ...options,
  };

  const method = useMemo(
    () => ({
      run: async (...args: any) => {
        let abort = false;
        const { fn, cancel, onSuccess, onError, onFinish } = fnsRef.current;
        cancel && cancel();
        fnsRef.current.cancel = () => (abort = true);

        setState((s) => ({ ...s, loading: true }));

        return fn(...args)
          .then((result: T) => {
            if (abort) return;
            console.log(result, 'result');
            onSuccess && onSuccess(result);
            setState((s) => ({ ...s, loading: false }));
            onFinish && onFinish({ successful: true, payload: result }, ...args);
          })
          .catch((error: Error) => {
            if (abort) return;
            onError && onError(error, ...args);
            setState((s) => ({ ...s, loading: false }));
            onFinish && onFinish({ successful: false, payload: error }, ...args);
          });
      },
      cancel: () => {
        const { cancel } = fnsRef.current;
        cancel && cancel();
      },
    }),
    [],
  );
  return {
    ...state,
    ...method,
  };
}
