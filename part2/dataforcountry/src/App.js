import React, { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/Country";
import Countries from "./components/Countries";

console.log(process.env.REACT_APP_WEATHER_API_KEY);
const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [filterCountries, setFilterCountries] = useState([]);

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  }, []);

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const getWeather = (location) => {
    console.log("getWeather");
    try {
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${location}`
        )
        .then((response) => {
          console.log(response.data);
          return response.data.current;
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    const filterCountries = countries.filter((country) =>
      country.name.official
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    );
    setFilterCountries(filterCountries);
    console.log(filterCountries);
  };

  return (
    <div>
      <p>
        find countries
        <input
          value={filter}
          onChange={handleFilterChange}
          placeholder="country name"
        />
      </p>
      <div>debug: filtered country number {filterCountries.length}</div>
      {filterCountries.length > 10 && (
        <div>too many matches, specify another filter</div>
      )}
      {filterCountries.length <= 10 && filterCountries.length > 1 && (
        <Countries filterCountries={filterCountries} getWeather={getWeather}/>
      )}
      {filterCountries.length === 1 && (
        <Country
          country={filterCountries[0]}
          getWeather={getWeather}
          showCountry={true}
        />
      )}
      {filterCountries.length === 0 && <div>no matches</div>}
    </div>
  );
};

export default App;
