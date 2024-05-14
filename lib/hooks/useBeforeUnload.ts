import { useEffect } from 'react';

export const useBeforeUnload = (activeFlag: boolean) => {
  const beforeUnLoadHandler = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.returnValue = '';
  };

  useEffect(() => {
    if (!activeFlag) return;
    window.addEventListener('beforeunload', beforeUnLoadHandler);

    return () => {
      window.removeEventListener('beforeunload', beforeUnLoadHandler);
    };
  }, [activeFlag]);
};
