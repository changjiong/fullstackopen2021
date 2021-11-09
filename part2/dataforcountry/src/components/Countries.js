import React from "react";

const Countries = ({ filterCountries }) => {
  return (
    <div>
      <ul>
        {filterCountries.map((country) => (
          <li key={country.name.official}>{country.name.official}</li>
        ))}
      </ul>
    </div>
  );
};

export default Countries;
