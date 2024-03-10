import React, { useState } from "react"; // Import useState
import ReactAnimatedWeather from 'react-animated-weather';

const Data = ({ datas }) => {
  // State to track if the temperature is in Celsius (true by default)
  const [isCelsius, setIsCelsius] = useState(true);

  const getCurrentDate = () => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    };
    const currentDate = new Date().toLocaleDateString("en-US", options);
    return currentDate;
  };

  // Function to toggle the temperature unit
  const toggleTempUnit = () => {
    setIsCelsius(!isCelsius);
  };

  // Function to convert Celsius to Fahrenheit
  const toFahrenheit = (celsius) => (celsius * 9 / 5) + 32;

  return (
    <>
      {datas.status === 400 ? (
        <div>
          <p>Data not found <span role="img" aria-label="sad-emoji">😞</span></p>
        </div>
      ) : (
        <div>
          <div className="city-name">
            <h2>{datas.data.location.name}</h2>
          </div>
          <div className="date">
            <span>{getCurrentDate()}</span>
          </div>
          <div className="temp">
            {/* Image */}
            <img src={datas.data.current.condition.icon} height="100" />
            <div onClick={toggleTempUnit}> {/* Add onClick handler here */}
              {isCelsius ? datas.data.current.temp_c : toFahrenheit(datas.data.current.temp_c)} <sup className="temp-deg">{isCelsius ? '°C' : '°F'}</sup>
            </div>
          </div>
          <p className="weather-des">{datas.data.current.condition.text}</p>
          <div className="weather-info">
            <div className="col">
              <ReactAnimatedWeather icon="WIND" size={40} />
              <div>
                <p className="wind">{datas.data.current.wind_kph} km/h</p>
                <p>Wind speed</p>
              </div>
            </div>
            <div className="col">
              <ReactAnimatedWeather icon="RAIN" size={40} />
              <div>
                <p className="humidity">{datas.data.current.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Data;
