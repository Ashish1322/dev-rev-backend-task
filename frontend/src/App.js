import UserLogin from "./components/UserLogin";
import Signup from "./components/Signup";
import UserHome from "./components/UserHome";

import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Adminlogin from "./components/AdminLogin";
import Bookings from "./components/Bookings";
import AdminHome from "./components/AdminHome";
import MainContext from "./MainContext";

import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  // admin states
  const [flights, setFlights] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [searchFlights, setSearchFlights] = useState([]);

  const [loading, setLoading] = useState(false);

  const [apiUrl, setApiUrl] = useState("https://dev-rev.onrender.com");

  const userLogin = (email, password) => {
    setLoading(true);
    fetch(apiUrl + "/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.success) {
          setIsLoggedIn(true);
          setUser(data.user);
          setToken(data.token);

          navigate("/home");
        } else {
          if (data.message) alert(data.message);
          else alert("Invalid Credentials");
        }
      })
      .catch((err) => {
        setLoading(false);
        alert(err.message);
      });
  };

  const userSignup = (email, name, gender, password, phone) => {
    setLoading(true);
    fetch(apiUrl + "/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, gender, phone }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.success) {
          alert(data.message);
          navigate("/");
        } else {
          alert(data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        alert(err.message);
      });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  const adminLogin = (email, password) => {
    setLoading(true);
    fetch(apiUrl + "/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.success) {
          setIsLoggedIn(true);
          setUser(data.user);
          setToken(data.token);

          fethcAllFlights(data.token);
          navigate("/adminhome");
        } else {
          if (data.message) alert(data.message);
          else alert("Invalid Credentials");
        }
      })
      .catch((err) => {
        setLoading(false);
        alert(err.message);
      });
  };

  const addFlight = (
    name,
    source,
    destination,
    flightnumber,
    date,
    departuretime,
    arrivaltime,
    amount,
    seats
  ) => {
    setLoading(true);

    const s = parseInt(departuretime.substr(0, 2));
    const e = parseInt(arrivaltime.substr(0, 2));

    fetch(apiUrl + "/admin/add-flight", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        name,
        source,
        destination,
        flightnumber,
        date,
        departuretime: s,
        arrivaltime: e,
        amount,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.success) {
          fethcAllFlights(token);
          alert("Flight Added Successfully");
        } else {
          alert(data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const deleteFlight = (id) => {
    fetch(apiUrl + "/admin/delete-flight/" + id, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.success) {
          fethcAllFlights(token);
        } else {
          alert(data.message);
        }
      });
  };

  const fethcAllFlights = (token) => {
    fetch(apiUrl + "/admin/get-all-flights", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setFlights(data.flights);
        } else {
        }
      });
  };

  const getFlightDetails = (id) => {
    fetch(apiUrl + "/admin/get-flight/" + id, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setBookings(data.bookings);
          console.log(data.bookings);
        } else {
          alert(data.message);
        }
      });
  };

  const findFlights = (date, time) => {
    const t = parseInt(time.substr(0, 2));
    fetch(apiUrl + "/user/search-flights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },

      body: JSON.stringify({ date, time: t }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSearchFlights(data.flights);
        } else {
          alert(data.message);
        }
      });
  };

  const bookFlight = (name, gender, age, id) => {
    fetch(apiUrl + "/user/book-flight/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },

      body: JSON.stringify({ name, gender, age }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Flight Booked Successfully");
        } else {
          alert(data.message);
        }
      });
  };

  return (
    <MainContext.Provider
      value={{
        user,
        apiUrl,
        userLogin,
        userSignup,
        loading,
        logout,
        adminLogin,
        addFlight,
        flights,
        deleteFlight,
        getFlightDetails,
        bookings,
        findFlights,
        searchFlights,
        bookFlight,
        apiUrl,
        token,
      }}
    >
      <div>
        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/home"
            element={isLoggedIn ? <UserHome /> : <Navigate replace to={"/"} />}
          />

          <Route
            path="/mybookings"
            element={isLoggedIn ? <Bookings /> : <Navigate replace to={"/"} />}
          />
          <Route path="/adminlogin" element={<Adminlogin />} />
          <Route
            path="/adminhome"
            element={
              isLoggedIn && user && user.role != 0 ? (
                <AdminHome />
              ) : (
                <Navigate replace to={"/"} />
              )
            }
          />
        </Routes>
      </div>
    </MainContext.Provider>
  );
}

export default App;
