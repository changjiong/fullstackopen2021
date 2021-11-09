import React from "react";

const Country = ({ country, getWeather, showCountry }) => {
  try {
    const weather = getWeather(country.capital[0]);
    console.log(weather);
    return (
      showCountry && (
        <div>
          <h1>{country.name.official}</h1>
          <div>capital {country.capital[0]}</div>
          <div>population {country.population}</div>
          <h2>Spoken languages</h2>
          <ul>
            {Object.values(country.languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt={country.name.official} />
          <h2>Weather in {country.capital[0]}</h2>
          <div>
            <b>temperature:</b> {weather.temperature} Celsius
            <img
              src={weather.weather_icons[0]}
              alt={weather.weather_descriptions[0]}
            />
          </div>
          <div>
            <b>wind:</b> {weather.wind_speed} kph direction {weather.wind_dir}
          </div>
        </div>
      )
    );
  } catch (error) {
    return <div>{error.message}</div>;
  }
};

export default Country;
