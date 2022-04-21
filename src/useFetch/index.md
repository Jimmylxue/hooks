---
nav:
  path: /hooks
---

# useFetch

在 `useLoading` 基础上，增加了一个类似 useEffect 的副效应函数。

## Examples

```tsx
import React from 'react';
import { Button, Table } from 'antd';
import { useFetch } from '@shihengtech/hooks';

export default (() => {
  const sleep = (ms: number) => {
    return new Promise(function (resolve, reject) {
      setTimeout(resolve, ms);
    });
  };
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '名字',
      dataIndex: 'name',
    },
    {
      title: '性别',
      dataIndex: 'sex',
    },
  ];
  const { run, loading, data } = useFetch(
    async () => {
      // 实际开发中使用接口拉取数据
      await sleep(2000);
      return [
        { id: 1, name: 'Kevin', sex: 'male' },
        { id: 2, name: 'Rem', sex: 'female' },
      ];
    },
    [],
    {
      initialState: { data: [] },
      onSuccess: (res) => {
        console.log(res);
      },
    },
  );
  return (
    <>
      <Button loading={loading} onClick={run}>
        点击
      </Button>
      <Table dataSource={data} columns={columns}></Table>
    </>
  );
}) as React.FC;
```

## Types

```typescript
type IUseFetchState<D> = {
  data?: D;
  error?: any;
};

interface IUseFetchOptions<T extends (...args: any[]) => any> {
  auto?: boolean;
  initialState?:
    | IUseFetchState<PromiseReturnType<T>>
    | (() => IUseFetchState<PromiseReturnType<T>>);
  onSuccess?: (
    result: PromiseReturnType<T>,
    ...params: Parameters<T>
  ) => void | IUseFetchState<PromiseReturnType<T>>;
  onError?: (error: Error, ...params: Parameters<T>) => void | IUseFetchState<PromiseReturnType<T>>;
  onFinished?: (...args: FinishedParams<T>) => void;
  useCustomEffect?: typeof useEffect;
}
```

## API

```typescript
const { run, loading, data, setState, error, cancel, params } = useFetch(fnc: (...args: any[]) => Promise<any>>, deps: DependencyList = [], option: IUseFetchOptions)
```

### Params

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| func | 必填，在这个异步函数执行期间，返回得 loading 为 true | `(...args: any[]) => Promise<any>>` | - |
| deps | 依赖项，同 useEffect 的依赖项，是一个数组。依赖项发生变化，就会执行 func 函数。 | `DependencyList` | [] |
| option | 相关配置，详见下面的 option | `IUseFetchOptions` | - |

### Options

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onSuccess | 当异步函数执行`成功`后，将返回值传入该函数中作为第一个参数，第二个参数为 fn 中的 params，并执行。 | `(result,parms) => void` | - |
| onError | 当异步函数执行`失败`后，将返回值传入该函数中作为第一个参数，第二个参数为 fn 中的 params，并执行。 | `(result,parms) => void` | - |
| onFinished | 当异步函数执行后，无论`成功`、`失败`，将返回值与函数成功与否的信息传入该函数中作为第一个参数，第二个参数为 fn 的 params，并执行。 | `({successful, paylod}, parms) => void` | - |
| auto | auto 的值决定了依赖项如果发生改变，是否需要自动执行 func | `boolean` | true |
| initialState | initialState 的值会作为 useFetch 函数返回的默认值 | `any` | - |
| useCustomEffect | 默认是 useEffect，可以修改成自己配置的 effect，如：useLayoutEffect 等。 | 类似`useEffect`结构的`hook` | useEffect### initialState |

### Result

| 参数     | 说明                                     | 类型                      |
| -------- | ---------------------------------------- | ------------------------- |
| setState | 提供一个修改{error,data}的函数           | `React.useState`          |
| error    | 当 fn 报错时，报错的结果                 | `Error`                   |
| data     | 执行 fn 返回的数据                       | any                       |
| run      | 触发执行 fn，函数参数将会传递给 fn       | `(...args: any[]) => any` |
| cancel   | 取消 onSuccess、onError、onFinished 效果 | `() => void`              |
| loading  | 返回的 loading 值                        | `boolean`                 |
| params   | fn 的参数                                | `any`                     |
