import { useEffect, useState } from 'react';

interface IBatteryInfo {
  charging: boolean;
  chargingTime: number;
  dischargingTime: null | number;
  level: number;
  onchargingchange: null;
  onchargingtimechange: null;
  ondischargingtimechange: null;
  onlevelchange: null;
}

export const useBattery = () => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [batteryInfo, setBatteryInfo] = useState<IBatteryInfo | null>(null);

  useEffect(() => {
    //@ts-expect-error
    if (!navigator?.getBattery) {
      setError('Battery is not available in your browser!');
      return;
    }
    navigator
      //@ts-expect-error
      .getBattery()
      .then((battery: IBatteryInfo) => {
        setIsReady(true);
        setBatteryInfo(battery);
      })
      .catch((error: never) => {
        setError((error as { message?: string })?.message ?? 'Battery is not available in your browser!');
      });
  }, []);

  return {
    isReady,
    error,
    batteryInfo,
  };
};
