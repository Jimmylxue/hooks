# useLocalStorageState

会将状态保存在 `localStorage` 中的 `useState`

## Demo:

```tsx
import React from 'react';
import { Button } from 'antd';
import { useLocalStorageState } from 'hooks';

export default (() => {
  const [localStorage, setLocalStorage] = useLocalStorageState('dzKey', 1);
  return (
    <>
      <Button onClick={() => setLocalStorage((v) => v++)}>add</Button>
      {localStorage}
    </>
  );
}) as React.FC;
```

## TYPE

```typescript
useLocalStorageState<T>(key: string, defaultValue?: T | (() => T)): readonly [T, React.Dispatch<React.SetStateAction<T>>];
```

## API

```typescript
const [state, setState] = useLocalStorageState<T>(key: string, defaultValue?: T | (() => T));
```

### Params


|  参数 | 说明 | 类型 | 默认值 |
|  ----  | ----  |----  |----  |
| key | 必填，`localStorage` 存储的键值对的键值 |string |- |
| defaultValue | 默认值，会优先以 `localStorage` 中保存的值为准 |any |()=>any |
