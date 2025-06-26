import * as SecureStore from "expo-secure-store";
import { useCallback, useEffect, useReducer } from "react";

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null]
): UseStateHook<T> {
  return useReducer(
    (
      state: [boolean, T | null],
      action: T | null = null
    ): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

const setKeyPairValue = async (key: string, value: string | null) => {
  if (!value) {
    await SecureStore.deleteItemAsync(key);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
};

const useStorageState = (key: string): UseStateHook<string> => {
  const [state, setState] = useAsyncState<string>();

  useEffect(() => {
    SecureStore.getItemAsync(key).then((value) => setState(value));
  }, [key]);

  const setValue = useCallback(
    (value: string | null) => {
      setState(value);
      setKeyPairValue(key, value);
    },
    [key]
  );

  return [state, setValue];
};

export { useStorageState };