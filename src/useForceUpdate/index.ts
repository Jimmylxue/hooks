import { useReducer } from 'react';

function useForceUpdate() {
  const [, setSate] = useReducer((v) => v + 1, 0);
  return setSate as () => void;
}

export default useForceUpdate;
