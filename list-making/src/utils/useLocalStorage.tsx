import {useState, useEffect} from "react";

export default function useLocalStorage<T> ( 
  key: string,
  initialValue: T 
) {

  const storedValue:T = JSON.parse(localStorage.getItem(key) as string) ?? initialValue;

  function isArray(object: unknown): object is unknown[] {
    return Array.isArray(object);
  }

  //please ignore how jank this is
  const [value, setValue] = useState<T>(isArray(storedValue) ? storedValue.filter(n => n) as T : storedValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(isArray(value) ? value.filter(n => n) : value));
  }, [key, value]);

  return [value, setValue] as const;
}