import { useEffect, useState } from 'react';

export const useGeolocation = () => {
  const [data, setData] = useState<GeolocationCoordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSuccess = (data: GeolocationPosition) => {
    setData(data.coords);
    setIsLoading(false);
  };

  const onError = (err: GeolocationPositionError) => {
    setError(err.message);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const location = navigator?.geolocation;
    if (!location) {
      setError('This browser does not support geolocation API');
      return;
    }
    location.getCurrentPosition(onSuccess, onError);
  }, [navigator]);

  return {
    data: data
      ? {
          accuracy: data.accuracy,
          altitude: data.altitude,
          altitudeAccuracy: data.altitudeAccuracy,
          heading: data.heading,
          latitude: data.latitude,
          longitude: data.longitude,
          speed: data.speed,
        }
      : null,
    error,
    isLoading,
  };
};
