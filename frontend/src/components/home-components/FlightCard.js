import React from "react";

export default function FlightCard({ flight, openModal, setBookingTicketId }) {
  return (
    <div
      className="row  flight-card my-3"
      style={{ width: "70%", margin: "auto" }}
    >
      <div className="col col-2 flight-card-flex ">
        <div>
          <p className="text-muted flght-card-p"> {flight && flight.name}</p>
          <p className="text-muted flight-card-p">
            {" "}
            {flight && flight.flightnumber}
          </p>
        </div>
      </div>
      <div className="col col-3  flight-card-flex">
        <div>
          <p className=" flght-card-p">
            {" "}
            <i class="fas fa-map-marker-alt"></i> {flight && flight.source}
          </p>
          <p className="text-muted flight-card-p">
            <i class="fas fa-clock"></i> {flight && flight.departuretime}
          </p>
        </div>
      </div>
      <div className="col col-2 flight-card-flex">
        <div>
          <p className=" flght-card-p text-center">
            <i class="fas fa-plane-departure"> </i>
          </p>
          <p className="text-muted flght-card-p">
            Seats: {flight && flight.seats}
          </p>
        </div>
      </div>
      <div className="col col-2 flight-card-flex">
        <div>
          <p className=" flght-card-p">
            {" "}
            <i class="fas fa-map-marker-alt"></i> {flight && flight.destination}
          </p>
          <p className="text-muted flight-card-p">
            <i class="fas fa-clock"></i> {flight && flight.arrivaltime}
          </p>
        </div>
      </div>
      <div className="col col-3 flight-card-flex">
        <div>
          <p className="text-muted flght-card-p">
            {" "}
            &#8377; {flight && flight.amount}
          </p>
          <button
            onClick={() => {
              setBookingTicketId(flight._id);
              openModal();
            }}
            className="btn btn-primary btn-sm"
          >
            {" "}
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
