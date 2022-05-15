---
nav:
  path: /hooks
---

# useWatch

`useWatch` 用法与 `useEffect` 一致，首次不会触发副作用函数，只有当监听项发生变化之后才会触发副作用函数

## Examples

下面这个示例显示出 useUpdateEffect 和 useEffect 的区别。

```tsx
import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { useWatch } from 'hooks';

export default (() => {
  const [renderCount, setRenderCount] = useState(1);
  const [effectCount, setEffectCount] = useState(0);
  const [updateEffectCount, setUpdateEffectCount] = useState(0);

  useWatch(() => {
    setUpdateEffectCount((v) => v + 1);
  }, [renderCount]);

  useEffect(() => {
    setEffectCount((v) => v + 1);
  }, [renderCount]);

  return (
    <>
      <div>effect times: {effectCount}</div>
      <div>update effect times: {updateEffectCount}</div>
      <Button onClick={() => setRenderCount((v) => v + 1)}>reRender</Button>
    </>
  );
}) as React.FC;
```

## API、Params、Action

同 useEffect

```typescript
useUpdateEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList,
)

```
