import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export default function useLocalStorage<T>(key: string, defaultValue: T) {
  const [state, setState] = useState<T>(() => {
    const value = window.localStorage.getItem(key);
    if (value) {
      return JSON.parse(value) as T;
    }
    return defaultValue;
  });
  const prevRef = useRef(key);

  useEffect(() => {
    const prevKey = prevRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(key);
    }
    prevRef.current = key;
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState] as [T, Dispatch<SetStateAction<T>>];
}
