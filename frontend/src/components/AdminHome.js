import React, { useContext } from "react";
import AdminNavBar from "./home-components/AdminNavBar";
import AddFlight from "./home-components/AddFlight";
import AdminFlightCard from "./home-components/AdminFlightCard";
import Modal from "@mui/material/Modal";
import { Booking } from "./Bookings";
import MainContext from "../MainContext";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  backgroundColor: "white",
  boxShadow: 24,
  padding: 5,
  borderRadius: 10,
};

export default function AdminHome() {
  const { flights, bookings } = useContext(MainContext);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style}>
          <p className="text-center my-2">All Bookings</p>
          <hr />
          {bookings.map((booking, index) => (
            <Booking key={index} booking={booking} />
          ))}
          {bookings.length == 0 ? (
            <p className="text-center">
              {" "}
              <b>No Bookings to Show !</b>
            </p>
          ) : null}
        </div>
      </Modal>

      <AdminNavBar />
      <h3 className="text-center mt-3">Admin Panel</h3>
      <div className="row my-4 p-4">
        <div className="col col-3">
          <AddFlight />
        </div>
        <div className="col col-9">
          {flights.map((flight, index) => (
            <AdminFlightCard
              openModal={handleOpen}
              flight={flight}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
