import React, { useState, useEffect } from 'react';
import axios from "axios";

function MyLocation() {
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [city, setCity] = useState('');

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        if ("geolocation" in navigator) {
          navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
            if (result.state === 'granted') {
              navigator.geolocation.getCurrentPosition(function (position) {
                setPosition({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                });
                convertLatLongToCityName(position.coords.latitude, position.coords.longitude);
              });
            } else if (result.state === 'denied') {
              setCity('Ahmedabad');
              find_city_data(cityName);
            } else {
              // Permission prompt couldn't be shown, fallback to Ahmedabad
              setCity('Ahmedabad');
              find_city_data(cityName);
            }
          });
        } else {
          // Geolocation not supported by the browser, fallback to Ahmedabad
          setCity('Ahmedabad');
          find_city_data(cityName);
        }
      } catch (error) {
        console.error('Error fetching location:', error);
        // Handle error, fallback to Ahmedabad
        setCity('Ahmedabad');
        find_city_data(cityName);
      }
    };

    fetchLocation();
  }, []);

  const convertLatLongToCityName = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
      const data = await response.json();
      const cityName = data.address.city || data.address.town || data.address.village || data.address.county;
      setCity(cityName);
      find_city_data(cityName);
    } catch (error) {
      console.error('Error fetching city:', error);
      setCity('Ahmedabad');
    }
  };

  return (
    <div>
      <h2>My Current Location</h2>
      {position.latitude && position.longitude ? (
        <p>
          Latitude: {position.latitude}, Longitude: {position.longitude}
          City: {city}
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MyLocation;
