import { useState } from 'react';
import { Book } from '../types/alltypes';

function UseLocalStorage(key:string, initialValue:Book[]) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value:string) => {
    try {
      setStoredValue(value);
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

export default UseLocalStorage;
