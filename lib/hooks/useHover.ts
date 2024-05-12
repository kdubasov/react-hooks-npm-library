import { useEventListener } from '@/main.ts';
import { RefObject, useState } from 'react';

export const useHover = (ref: RefObject<HTMLElement>) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleEnter = () => setIsHovered(true);
  const handleLeave = () => setIsHovered(false);

  useEventListener('mouseenter', handleEnter, ref);
  useEventListener('mouseleave', handleLeave, ref);

  return isHovered;
};
