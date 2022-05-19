import { useRef } from 'react';

export default (function useMutable<T>(value: T) {
  const ref = useRef<T>(value);
  // 这步是核心
  ref.current = value;
  return ref;
} as typeof useRef);
