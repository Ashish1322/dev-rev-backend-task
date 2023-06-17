import React, { useState, useContext } from "react";
import { Link, to } from "react-router-dom";
import MainContext from "../MainContext";

export default function Signup() {
  const { userSignup, loading } = useContext(MainContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="main">
      <div className="card" style={{ width: "25rem" }}>
        <img
          src="https://images.moneycontrol.com/static-mcnews/2022/05/Go-First-4-770x433.jpg?impolicy=website&width=770&height=431"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">Create your Account </h5>
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
              <div className="row">
                <div className="col col-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                  />
                </div>
                <div className="col col-6">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    onChange={(e) => setGender(e.currentTarget.value)}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
              <div id="emailHelp" class="form-text">
                Combination of Numbers, Alphabets, Special Chars.
              </div>
            </div>

            <div className=" ">
              <input
                type="number"
                className="form-control"
                placeholder="Enter Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.currentTarget.value)}
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
                userSignup(email, name, gender, password, phone);
              }}
            >
              Create Account
            </button>
          )}

          <Link className="my-2" to="/" style={{ float: "left" }}>
            Already have an account ?{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}
