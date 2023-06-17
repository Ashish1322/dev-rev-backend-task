import React, { useState, useContext } from "react";

import MainContext from "../../MainContext";

export default function AddFlight() {
  const { addFlight, loading } = useContext(MainContext);

  const [name, setName] = useState("");
  const [departureStation, setDepartureStation] = useState("");
  const [arrivalStation, setAriivalStation] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [departureTime, setDepartureTime] = useState(0);
  const [arrivalTime, setArrivalTime] = useState(0);
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [seats, setSeats] = useState(60);

  return (
    <div className="card" style={{ width: "25rem" }}>
      <img
        src="https://images.moneycontrol.com/static-mcnews/2022/05/Go-First-4-770x433.jpg?impolicy=website&width=770&height=431"
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title"> Add Flight </h5>
        <p className="card-text">
          <div className="mb-3">
            <div className="row">
              <div className="col col-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Flight Name"
                  onChange={(e) => setName(e.currentTarget.value)}
                />
              </div>
              <div className="col col-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Flight Number"
                  onChange={(e) => setFlightNumber(e.currentTarget.value)}
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <div className="row">
              <div className="col col-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Departure Station"
                  onChange={(e) => setDepartureStation(e.currentTarget.value)}
                />
              </div>
              <div className="col col-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Arrival Station"
                  onChange={(e) => setAriivalStation(e.currentTarget.value)}
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <div className="row">
              <div className="col col-6">
                <input
                  type="time"
                  className="form-control"
                  placeholder="Departure Time"
                  onChange={(e) => setDepartureTime(e.currentTarget.value)}
                />
              </div>
              <div className="col col-6">
                <input
                  type="time"
                  className="form-control"
                  placeholder="Arrival Time"
                  onChange={(e) => setArrivalTime(e.currentTarget.value)}
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <div className="row">
              <div className="col col-6">
                <input
                  type="date"
                  className="form-control"
                  onChange={(e) => setDate(e.currentTarget.value)}
                />
              </div>
              <div className="col col-6">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Number of Seats"
                  value={seats}
                  onChange={(e) => setSeats(e.currentTarget.value)}
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <div>
              <input
                type="number"
                className="form-control"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.currentTarget.value)}
              />
            </div>
          </div>
        </p>

        {loading ? (
          <button className="btn btn-primary w-100" disabled>
            Loading...
          </button>
        ) : (
          <button
            className="btn btn-primary w-100"
            onClick={() => {
              addFlight(
                name,
                departureStation,
                arrivalStation,
                flightNumber,
                date,
                departureTime,
                arrivalTime,
                amount,
                seats
              );
            }}
          >
            Add Flight
          </button>
        )}
      </div>
    </div>
  );
}
