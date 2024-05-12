import { useCallback, useState } from 'react';

type CopiedValue = string | null;
// eslint-disable-next-line no-unused-vars
type CopyFn = (text: string) => Promise<boolean>; // Return success

export function useCopy(): [CopiedValue, CopyFn] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);

  const copy: CopyFn = useCallback(async (text) => {
    if (!navigator?.clipboard) {
      console.info('Clipboard is not supported now! Please, try in another browser.');
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      //clear copied value with interval
      // setTimeout(() => setCopiedText(null), 5000);
      return true;
    } catch (error) {
      console.warn('Copy error!', error);
      setCopiedText(null);
      return false;
    }
  }, []);

  return [copiedText, copy];
}
