import React, { useEffect, useRef, useState } from "react";
import FlightCard from "./FlightCard";
import Filter from "./Filter";
import {
  BeatLoader,
  CircleLoader,
  ClipLoader,
  DotLoader,
  RingLoader,
} from "react-spinners";

export default function HomePage() {
  //boolean states
  const [loading, setLoading] = useState(false);
  //other states
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [sortBy, setSortBy] = useState("price");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [airline, setAirline] = useState("any");
  //refs
  const sortAfterFetch = useRef(null);

  useEffect(() => {
    fetchFlightData();
  }, []);

  useEffect(() => {
    applyAllFilters();
  }, [origin, destination, airline]);

  useEffect(() => {
    if (!sortAfterFetch.current && filteredFlights.length) {
      handleSortChange("price");
      sortAfterFetch.current = true;
    }
  }, [filteredFlights]);

  const applyAllFilters = () => {
    let allFlights = flights;
    if (origin === "" && destination === "") {
    } else if (origin && destination) {
      allFlights = allFlights.filter(
        (item) => item.origin === origin && item.destination === destination
      );
    } else {
      allFlights = allFlights.filter(
        (item) => item.origin === origin || item.destination === destination
      );
    }
    allFlights = allFlights.filter(
      (item) => airline === "any" || item.airline === airline
    );
    handleSortChange(sortBy, allFlights);
  };

  const fetchFlightData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.npoint.io/378e02e8e732bb1ac55b"
      );
      const data = await response.json();
      setFlights(data);
      setFilteredFlights(data);
    } catch (error) {
      console.error("Error fetching flight data:", error);
    }
    setLoading(false);
  };

  const handleSortChange = (option, data) => {
    setSortBy(option);
    const sorted = [...(data ? data : filteredFlights)].sort((a, b) => {
      switch (option) {
        case "price":
          return a.price - b.price;
        case "arrivalTime":
          return new Date(a.arrivalTime) - new Date(b.arrivalTime);
        case "departureTime":
          return a.departureTime.localeCompare(b.departureTime);
        case "duration":
          return a.duration.localeCompare(b.duration);
        default:
          return 0;
      }
    });
    setFilteredFlights(sorted);
  };

  return (
    <>
      <Filter
        origin={origin}
        destination={destination}
        setOrigin={setOrigin}
        setDestination={setDestination}
        handleSortChange={handleSortChange}
        sortBy={sortBy}
        setAirline={setAirline}
      />
      {loading ? (
        <div className="loader-style">
          <BeatLoader
            color={"grey"}
            loading={loading}
            size={50}
            aria-label="Loading..."
            data-testid="loader"
          />
        </div>
      ) : filteredFlights?.length > 0 ? (
        <div className="container">
          {filteredFlights.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Flights found</h2>
        </div>
      )}
    </>
  );
}
