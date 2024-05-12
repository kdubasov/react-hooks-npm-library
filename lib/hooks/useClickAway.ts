import { Dispatch, RefObject, SetStateAction, useEffect } from 'react';

export const useClickAway = (
  ref: RefObject<HTMLElement>,
  show: boolean,
  setShow: Dispatch<SetStateAction<boolean>>,
) => {
  const onClose = (e: Event) => {
    if (!e?.target || !ref?.current) return;
    if (ref.current && show && !ref.current.contains(e.target as Node)) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', onClose);
    return () => {
      document.removeEventListener('mousedown', onClose);
    };
  }, [ref, show]);
};
