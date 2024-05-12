import { useEffect } from 'react';

export const useInterval = (callback: () => void, intervalDelay: number | undefined) => {
  useEffect(() => {
    if (intervalDelay === undefined) return;

    const interval = setInterval(() => {
      callback();
    }, intervalDelay);

    return () => clearInterval(interval);
  }, [intervalDelay]);
};
