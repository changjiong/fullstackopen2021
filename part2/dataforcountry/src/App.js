import React, { useState, useEffect } from "react";
import axios from "axios";

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
        <ul>
          {filterCountries.map((country) => (
            <li key={country.name.official}>{country.name.official}</li>
          ))}
        </ul>
      )}
      {filterCountries.length === 1 && (
        <div>
          <h1>{filterCountries[0].name.official}</h1>
          <div>capital {filterCountries[0].capital[0]}</div>
          <div>population {filterCountries[0].population}</div>
          <h2>languages</h2>
          <ul>
            {Object.values(filterCountries[0].languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img
            src={filterCountries[0].flags.png}
            alt={filterCountries[0].name.official}
          />
        </div>
      )}
      {filterCountries.length === 0 && <div>no matches</div>}
    </div>
  );
};

export default App;
