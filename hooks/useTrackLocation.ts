'use client';

import { useState } from 'react';

interface PositionCoords {
  coords: { latitude: number; longitude: number };
}

type Position = {
  latitude: number;
  longitude: number;
};

export const useTrackLocation = () => {
  const [isLoacationLoading, setIsLocationLoading] = useState(false);
  const [longLat, setLongLat] = useState<Position | null>(null);
  const [locationErrorMessage, setLocationErrorMessage] = useState('');

  const success = async (position: PositionCoords) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLongLat({
      longitude,
      latitude,
    });
    setLocationErrorMessage('');
    setIsLocationLoading(false);

    console.log(`Latitude: ${latitude} °, Longitude: ${longitude} °`);
  };

  const error = () => {
    setIsLocationLoading(false);
    console.log('Unable to retrieve your location');
    setLocationErrorMessage('Unable to retrieve your location');
  };

  const handleTrackLocation = () => {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
      setLocationErrorMessage('Geolocation is not supported by your browser');
    } else {
      setIsLocationLoading(true);
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    isLoacationLoading,
    longLat,
    handleTrackLocation,
    locationErrorMessage,
  };
};
