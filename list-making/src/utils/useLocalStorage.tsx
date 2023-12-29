import {useState, useEffect} from "react";

export default function useLocalStorage<T = string | object> ( 
  key: string,
  initialValue: T
) {

  const storedValue:T = 
  JSON.parse(localStorage.getItem(key) as string)
    ?? initialValue;

  const [value, setValue] = useState<T>(storedValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}