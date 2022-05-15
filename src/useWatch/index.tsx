import { useEffect, useRef, EffectCallback, DependencyList } from 'react';

export default (function useWatch(effect: EffectCallback, deps: DependencyList): void {
  const isFirstRender = useRef(false);
  useEffect(() => {
    if (isFirstRender.current) {
      effect();
    } else {
      isFirstRender.current = true;
    }
  }, deps);
} as typeof useEffect);
