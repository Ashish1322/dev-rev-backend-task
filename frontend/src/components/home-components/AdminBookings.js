import React from "react";
import Navbar from "./home-components/Navbar";

const Booking = () => {
  return (
    <div
      className="row  flight-card my-3"
      style={{ width: "70%", margin: "auto" }}
    >
      <div className="col col-2 flight-card-flex ">
        <div>
          <p className="text-muted flght-card-p"> ABC Airlines</p>
          <p className="text-muted flight-card-p">Uk-658</p>
        </div>
      </div>
      <div className="col col-3  flight-card-flex">
        <div>
          <p className=" flght-card-p">
            {" "}
            <i class="fas fa-map-marker-alt"></i> Mumbai
          </p>
          <p className="text-muted flight-card-p">
            <i class="fas fa-clock"></i> 10:00
          </p>
        </div>
      </div>
      <div className="col col-3 flight-card-flex">
        <div>
          <p className=" flght-card-p text-center">
            <i class="fas fa-plane-departure"> </i>
          </p>
          <p className="text-muted flght-card-p"> &#8377; 2000</p>
        </div>
      </div>
      <div className="col col-2 flight-card-flex">
        <div>
          <p className=" flght-card-p">
            {" "}
            <i class="fas fa-map-marker-alt"></i> Mumbai
          </p>
          <p className="text-muted flight-card-p">
            <i class="fas fa-clock"></i> 10:00
          </p>
        </div>
      </div>

      <div className="col col-2 flight-card-flex">
        <div>
          <p className="text-muted flght-card-p">Name</p>
          <p className="text-muted flght-card-p">female</p>
          <p className="text-muted flght-card-p">Age: 21</p>
        </div>
      </div>
    </div>
  );
};

export default function AdminBookings() {
  return (
    <div>
      <Navbar />
      <h3 className="text-center my-3">Showing All the Bookings</h3>
      <Booking />
      <Booking />
      <Booking />
    </div>
  );
}
