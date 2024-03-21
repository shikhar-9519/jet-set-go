import React, { useState } from "react";
import { sortingOptions, indianFlights, airlines } from "../constants";

const FilterComponent = ({
  origin,
  destination,
  setDestination,
  setOrigin,
  handleSortChange,
  setAirline,
  sortBy,
}) => {
  const handleExchange = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleOriginChange = (e) => {
    setOrigin(e.target.value);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  return (
    <div className="filter-box">
      <div className="orig-dest-container">
        <select value={origin} onChange={handleOriginChange}>
          <option value={""}>Select Origin</option>
          {indianFlights.map((airport) => (
            <option key={airport.code} value={airport.city}>
              {airport.city} ({airport.name})
            </option>
          ))}
        </select>
        <button onClick={handleExchange}>&#8644;</button>
        <select value={destination} onChange={handleDestinationChange}>
          <option value={""}>Select Destination</option>
          {indianFlights.map((airport) => (
            <option key={airport.code} value={airport.city}>
              {airport.name} ({airport.city})
            </option>
          ))}
        </select>
      </div>
      <div className="gap-8">
        <div className="sort-options">
          <span>Sort by:</span>
          {sortingOptions.map((option) => (
            <label key={option.value} className="sort-option">
              <input
                type="radio"
                name="sortOption"
                value={option.value}
                onChange={() => {
                  handleSortChange(option.value);
                }}
                checked={sortBy === option.value}
              />
              {option.label}
            </label>
          ))}
        </div>
        <div className="sort-options">
          Airline:
          <select
            className="airline-dropdown"
            onChange={(e) => setAirline(e.target.value)}
          >
            {airlines.map((airline) => (
              <option key={airline.value} value={airline.value}>
                {airline.label}
              </option>
            ))}
          </select>{" "}
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
