import React, { useState } from "react";
import Country from "./Country";

const Countries = ({ filterCountries, getWeather }) => {
  const [showCountry, setShowCountry] = useState(false);

  const handleShowCountry = () => {
    setShowCountry(!showCountry);
  };

  return (
    <div>
      <ul>
        {filterCountries.map((country) => (
          <li key={country.name.official}>
            {country.name.official}
            <button onClick={handleShowCountry}>show</button>
            <Country
              country={country}
              getWeather={getWeather}
              showCountry={showCountry}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Countries;
