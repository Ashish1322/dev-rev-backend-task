import React, { useContext, useState } from "react";
import { Link, to } from "react-router-dom";

import MainContext from "../MainContext";

export default function UserLogin() {
  const { userLogin, loading } = useContext(MainContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="main">
      <div className="card" style={{ width: "25rem" }}>
        <img
          src="https://images.moneycontrol.com/static-mcnews/2022/05/Go-First-4-770x433.jpg?impolicy=website&width=770&height=431"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">Welcome, Please Login to go forward</h5>
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
            <button className="btn btn-primary w-100" disabled>
              Loading....
            </button>
          ) : (
            <button
              className="btn btn-primary w-100"
              onClick={() => {
                userLogin(email, password);
              }}
            >
              Login
            </button>
          )}

          <Link className="my-2" to="/signup" style={{ float: "left" }}>
            Don't have an account ?{" "}
          </Link>
          <Link className="my-2" to="/adminlogin" style={{ float: "right" }}>
            {" "}
            Login as Admin
          </Link>
        </div>
      </div>
    </div>
  );
}
