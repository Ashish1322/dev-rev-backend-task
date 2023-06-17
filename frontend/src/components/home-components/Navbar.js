import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MainContext from "../../MainContext";

export default function Navbar() {
  const { logout, user } = useContext(MainContext);

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link to="/home" className="navbar-brand">
          <img
            src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
            alt="Logo"
            width="30"
            height="30"
            class="d-inline-block align-text-top"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/home"
                className="nav-link text-uppercase "
                aria-current="page"
              >
                <b>{user && user.name}</b>
              </Link>
            </li>
          </ul>

          <Link to="/mybookings" className="btn btn-success mx-3">
            My Bookings
          </Link>

          <button onClick={logout} className="btn btn-danger">
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
}
