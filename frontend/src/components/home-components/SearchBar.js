import React, { useContext } from "react";
import { useState } from "react";
import MainContext from "../../MainContext";

export default function SearchBar() {
  const { findFlights } = useContext(MainContext);

  const [date, setDate] = useState("");
  const [time, setTime] = useState();

  return (
    <div className="container-fluid  flight-image">
      <div
        style={{
          height: 300,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 30,
        }}
      >
        <div className="card p-3" style={{ width: "20rem" }}>
          <p className="text-center">
            <b>Search Flighs</b>
          </p>
          <div
            className="d-flex justify-content-center"
            style={{ borderRadius: 20 }}
          >
            <input
              className="input mx-2"
              onChange={(e) => setDate(e.currentTarget.value)}
              type="date"
            />
            <input
              onChange={(e) => setTime(e.currentTarget.value)}
              className="input"
              type="time"
            />
          </div>
          <button
            onClick={() => findFlights(date, time)}
            className="btn btn-primary w-100 mt-3"
          >
            {" "}
            <i className="fa fa-plane-departure"></i> View Flights
          </button>
        </div>
      </div>
    </div>
  );
}
