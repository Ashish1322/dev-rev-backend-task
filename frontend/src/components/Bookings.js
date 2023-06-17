import React, { useEffect, useContext, useState } from "react";
import Navbar from "./home-components/Navbar";
import MainContext from "../MainContext";

export const Booking = ({ booking }) => {
  return (
    <div
      className="row  flight-card my-3"
      style={{ width: "80%", margin: "auto" }}
    >
      <div className="col col-2 flight-card-flex ">
        <div>
          <p className="text-muted flght-card-p">
            {booking && booking.flight.name}
          </p>
          <p className="text-muted flight-card-p">
            {booking && booking.flight.flightnumber}
          </p>
        </div>
      </div>
      <div className="col col-3  flight-card-flex">
        <div>
          <p className=" flght-card-p">
            <i class="fas fa-map-marker-alt"></i>{" "}
            {booking && booking.flight.source}
          </p>
          <p className="text-muted flight-card-p">
            <i class="fas fa-clock"></i>{" "}
            {booking && booking.flight.departuretime}
          </p>
        </div>
      </div>
      <div className="col col-3 flight-card-flex">
        <div>
          <p className=" flght-card-p text-center">
            <i class="fas fa-plane-departure"> </i>
          </p>
          <p className="text-muted flght-card-p">
            {" "}
            &#8377; {booking && booking.flight.amount}
          </p>
        </div>
      </div>
      <div className="col col-2 flight-card-flex">
        <div>
          <p className=" flght-card-p">
            {" "}
            <i class="fas fa-map-marker-alt"></i>{" "}
            {booking && booking.flight.destination}
          </p>
          <p className="text-muted flight-card-p">
            <i class="fas fa-clock"></i> {booking && booking.flight.arrivaltime}
          </p>
        </div>
      </div>

      <div className="col col-2 flight-card-flex">
        <div>
          <p className="text-muted flght-card-p">{booking && booking.name}</p>
          <p className="text-muted flght-card-p">{booking && booking.gender}</p>
          <p className="text-muted flght-card-p">
            Age: {booking && booking.age}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Bookings() {
  const { token, apiUrl } = useContext(MainContext);

  const [bookings, setBookings] = useState([]);

  const getAllBookingsByUser = () => {
    fetch(apiUrl + "/user/get-bookings/", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setBookings(data.bookings);
        } else {
          alert(data.message);
        }
      });
  };

  useEffect(() => {
    getAllBookingsByUser();
  }, []);

  console.log(bookings);
  return (
    <div>
      <Navbar />
      <h3 className="text-center my-3">Showing All the Bookings</h3>
      {bookings.map((booking) => (
        <Booking booking={booking} />
      ))}
    </div>
  );
}
