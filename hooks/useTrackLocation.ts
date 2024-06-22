'use client';

interface Position {
  coords: { latitude: number; longitude: number };
}

export const useTrackLocation = () => {
  const success = (position: Position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(`Latitude: ${latitude} °, Longitude: ${longitude} °`);
  };

  const error = () => {
    console.log('Unable to retrieve your location');
  };

  const handleTrackLocation = () => {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {handleTrackLocation};
};
