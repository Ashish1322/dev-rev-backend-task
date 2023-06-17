import React, { useState, useContext } from "react";
import { Link, to } from "react-router-dom";
import MainContext from "../MainContext";

export default function Adminlogin() {
  const { adminLogin, loading } = useContext(MainContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="main">
      <div className="card" style={{ width: "25rem" }}>
        <img
          src="https://t3.ftcdn.net/jpg/03/48/55/20/360_F_348552050_uSbrANL65DNj21FbaCeswpM33mat1Wll.jpg"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">Admin Login</h5>
          <p className="card-text">
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </div>
          </p>

          {loading ? (
            <button className="btn btn-primary w-100">Loading...</button>
          ) : (
            <button
              className="btn btn-primary w-100"
              onClick={() => {
                adminLogin(email, password);
              }}
            >
              Login
            </button>
          )}

          <Link className="my-2" to="/">
            {" "}
            Login as user
          </Link>
        </div>
      </div>
    </div>
  );
}
