import React from 'react';

interface IsInitStore {
  [key: string]: boolean
};
const isInitStore: IsInitStore = {};

interface StoreItem {
  value: any
  dispatch: Set<any>
}

interface Store {
  [key: string]: StoreItem
}
const store: Store = {} as Store;

function _setValue<T>(key: string, value: T) {
  store[key].value = value;
  store[key].dispatch.forEach((cb: any) => {
    cb(value);
  });
}

export function useSubscribe<T>(key: string, value: T | null = null) {
  const [state, setState] = React.useState<T | null>(value);

  if (!isInitStore[key]) {
    store[key] = { value, dispatch: new Set() };
    isInitStore[key] = true;
  }

  if (store[key].dispatch.has(setState) === false)
    store[key].dispatch.add(setState);

  return [state, (_value: any) => _setValue(key, _value)] as const;
}
