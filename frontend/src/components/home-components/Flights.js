import React, { useContext, useState } from "react";
import Modal from "@mui/material/Modal";

import FlightCard from "./FlightCard";
import MainContext from "../../MainContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "white",
  boxShadow: 24,
  padding: 10,
};

export default function Flights() {
  const { searchFlights, bookFlight } = useContext(MainContext);
  const [bookingTicketId, setBookingTicketId] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = useState("");
  const [gender, setGenger] = useState("male");
  const [age, setAge] = useState(0);

  return (
    <div className="p-4 flights" style={{ minHeight: 450 }}>
      {searchFlights.map((flight, index) => (
        <FlightCard
          setBookingTicketId={setBookingTicketId}
          openModal={handleOpen}
          flight={flight}
          key={index}
        />
      ))}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style}>
          <p className="text-center">Enter Passenger Details</p>
          <div className="mb-3">
            <input
              type="string"
              className="form-control"
              placeholder="Enter Passenger Name"
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </div>
          <div className="mb-3">
            <select
              onChange={(e) => setGenger(e.currentTarget.value)}
              class="form-select"
              aria-label="Default select example"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Enter Age"
              value={age}
              onChange={(e) => setAge(e.currentTarget.value)}
            />
          </div>
          <button
            onClick={() => {
              bookFlight(name, gender, age, bookingTicketId);
            }}
            className="btn btn-primary w-100"
          >
            Book Flight
          </button>
        </div>
      </Modal>
    </div>
  );
}
