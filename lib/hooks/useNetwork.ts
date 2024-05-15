import { useEffect, useState } from 'react';

interface INetworkInformation {
  downlink: number;
  effectiveType: string;
  onchange: null;
  rtt: number;
  saveData: boolean;
}

export const useNetwork = () => {
  const [data, setData] = useState<null | INetworkInformation>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // @ts-expect-error
    const network = navigator?.connection;
    if (!network) {
      setError('This browser does not support network API');
      return;
    }
    setData({
      downlink: network.downlink,
      effectiveType: network.effectiveType,
      onchange: network.onchange,
      rtt: network.rtt,
      saveData: network.rtt,
    });
  }, [navigator]);

  return { data, error };
};
