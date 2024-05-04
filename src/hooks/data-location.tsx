import { useState, useEffect } from 'react';

const useCurrentDateTimeAndLocation = () => {
  const [dateTime, setDateTime] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };

    const date = new Date();
    const formattedDate = new Intl.DateTimeFormat('pt-BR', options).format(date);
    setDateTime(formattedDate);

    const getLocation = async () => {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        setLocation(`Latitude: ${latitude}, Longitude: ${longitude}`);
      } catch (error) {
        console.error('Error getting location:', error);
      }
    };

    getLocation();
  }, []);

  return { dateTime, location };
};

export default useCurrentDateTimeAndLocation;