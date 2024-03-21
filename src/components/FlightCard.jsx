import React from "react";
import { formatDateTime, formatDuration } from "../helper";

const FlightCard = ({
  flight: {
    id,
    origin,
    destination,
    price,
    airline,
    seatsAvailable,
    aircraft,
    arrivalTime,
    duration,
    departureTime,
    flightNumber,
  },
}) => {
  return (
    <div className="flight-card" key={id}>
      <div>
        <div className="boldFont">{airline}</div>
        <div className="aircraft-style">{flightNumber}</div>
      </div>
      <div className="time-destination">
        <div className="flex-column align-items-center">
          <div className="flight-time-info">{formatDateTime(arrivalTime)}</div>
          <div className="fontSize12">{origin}</div>
        </div>
        <div className="duration-separator-left"></div>
        <div>{formatDuration(duration)}</div>
        <div className="duration-separator-right"></div>
        <div className="flex-column align-items-center">
          <div className="flight-time-info">
            {formatDateTime(departureTime)}
          </div>
          <div className="fontSize12">{destination}</div>
        </div>
      </div>
      <div className="align-items-flex-end flex-column">
        <h3 className="price">₹{price}</h3>
        <span className="seats-available">Seats avail: {seatsAvailable}</span>
      </div>
    </div>
  );
};

export default FlightCard;
