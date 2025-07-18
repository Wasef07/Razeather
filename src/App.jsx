import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = import.meta.env.VITE_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      setIsLoading(true);
      setError('');

      axios.get(url)
        .then((response) => {
          setData(response.data);
        })
        .catch(() => {
          setError("Location not found. Please try again.");
        })
        .finally(() => {
          setIsLoading(false);
          setLocation('');
        });
    }
  };

  return (
  <div className="app">
    <h1 className="logo">Razeather</h1>
    {!data.name ? (
      <div className="initial-search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          type="text"
          placeholder="Enter the Location"
        />
      </div>
    ) : (
      <>
        <div className="search">
          <input
            value={location}
            onChange={event => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            type="text"
            placeholder="Enter the Location"
          />
          {error && <p className="error">{error}</p>}
          </div>

        <div className="container">
          <div className="top">
            <div className="location">
              <h2>{data.name}</h2>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
              {console.log(data)};
            </div>
          </div>

          {data.name !== undefined && (
            <div className="bottom">
              <div className="feels">
                {data.main ? (
                  <p className="bold">{data.main.feels_like.toFixed()}°C</p>
                ) : null}
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                {data.main ? (
                  <p className="bold">{data.main.humidity}%</p>
                ) : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.wind ? (
                  <p className="bold">{data.wind.speed.toFixed()} km/h</p>
                ) : null}
                <p>Wind</p>
              </div>
            </div>
          )}
        </div>
      </>
    )}
  </div>
);
}

export default App;
