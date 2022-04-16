# useSEssionStorageState

会将状态保存在 `sessionStroage` 中的 `useState`

## Demo:

```tsx
import React from 'react';
import { Button } from 'antd';
import { useSessionStroageState } from 'hooks';

export default (() => {
  const [sessionStorage, setSessionStroage] = useSessionStroageState('dzKey', 11);
  return (
    <>
      <Button
        onClick={() =>
          setSessionStroage((v) => {
            alert(v);
            return v++;
          })
        }
      >
        add
      </Button>
      {sessionStorage}
    </>
  );
}) as React.FC;
```

## TYPE

```typescript
useSessionStroage<T>(key: string, defaultValue?: T | (() => T)): readonly [T, React.Dispatch<React.SetStateAction<T>>];
```

## API

```typescript
const [state, setState] = useSessionStroage<T>(key: string, defaultValue?: T | (() => T));
```

### Params

| 参数         | 说明                                             | 类型   | 默认值  |
| ------------ | ------------------------------------------------ | ------ | ------- |
| key          | 必填，`sessionStroage` 存储的键值对的键值        | string | -       |
| defaultValue | 默认值，会优先以 `sessionStroage` 中保存的值为准 | any    | ()=>any |
