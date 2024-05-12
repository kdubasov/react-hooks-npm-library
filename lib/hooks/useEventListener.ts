import { RefObject, useEffect } from 'react';

export const useEventListener = <
  WEVT extends keyof WindowEventMap,
  HEVT extends keyof HTMLElementEventMap & keyof SVGElementEventMap,
  T extends HTMLElement | SVGAElement, // ref generic
>(
  eventName: WEVT | HEVT,
  // eslint-disable-next-line no-unused-vars
  handler: (event: WindowEventMap[WEVT] | HTMLElementEventMap[HEVT] | SVGElementEventMap[HEVT] | Event) => void,
  ref?: RefObject<T>,
  options?: boolean | AddEventListenerOptions,
) => {
  useEffect(() => {
    const targetElement: HTMLElement | SVGAElement | MediaQueryList | Window = ref?.current ?? window;

    targetElement.addEventListener(eventName, handler, options);
    return () => {
      targetElement.removeEventListener(eventName, handler, options);
    };
  }, [eventName, ref, options]);
};
