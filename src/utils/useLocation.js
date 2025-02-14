import { useState, useEffect } from 'react';

// Custom hook to fetch and reset the user's geolocation
export const useLocation = (resetLocation) => {
  const [location, setLocation] = useState(null); // Store location data
  const [error, setError] = useState(null); // Store errors
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setIsLoading(false);
      return;
    }

    setIsLoading(true); // Start loading whenever reset is triggered

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude, // Use `latitude` instead of `lat`
          longitude: position.coords.longitude, // Use `longitude` instead of `lon`
        });
        setIsLoading(false);
      },
      (err) => {
        setError('Unable to retrieve your location');
        setIsLoading(false);
      }
    );
  }, [resetLocation]); // Re-fetch location when reset is triggered

  return { location, error, isLoading };
};
