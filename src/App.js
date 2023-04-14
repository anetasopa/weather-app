import './App.css';
import { useState } from 'react';
import Loupe from '../src/Icon/Loupe';
import Cloudy from './Icon/Cloudy';
import Sun from './Icon/Sun';

const api = {
  key: "55e7b3a3ccbe4572d148829af1556fc5",
  base: "https://api.openweathermap.org/data/2.5/"
};

function App() {
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };

  const [query, setQuery] = useState("Vienna");
  const [weather, setWeather] = useState({});

  const fetchDataAboutWeather = () => {
    const url = `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`;

    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  };

  const getWeather = () => {
    fetchDataAboutWeather();
  };

  const search = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      fetchDataAboutWeather();
    }
  };

  return (
    <div className="app">
      <div className="containerSearch">
        <h1>Weather App</h1>
        <span>Type in city name, eg.: London, Berlin, New York, Dubai</span>
        <div className="form">
          <div>
            <Loupe />
          </div>
          <input
            type="text"
            placeholder=""
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          ></input>
          <div className="line"></div>
          <button type="submit" onClick={() => getWeather()}>
            SEARCH
          </button>
        </div>
      </div>
      {typeof weather.main != "undefined" ? (
        <div className="containerDisplay">
          <p className="titleDisplay">
            {weather.name}, {weather.sys.country}
          </p>
          <div className="textDisplay">{dateBuilder(new Date())}</div>
          <div className="textDisplay type">{weather.weather[0].main}</div>
          <div className="iconDisplay">
            {weather.weather[0].main === "Clouds" ? (
              <div>
                <Cloudy />
              </div>
            ) : (
              <div>
                <Sun />
              </div>
            )}
          </div>
          <p className="temperatureDisplay">
            {Math.round(weather.main.temp)}°C
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
