// importing required modules
const User = require("../modals/Users");
const jwt = require("jsonwebtoken");
const Booking = require("../modals/Bookings");
const bcrypt = require("bcrypt");
const Flight = require("../modals/Flights");

// DESC: Method to login admin
const adminLogin = (req, res) => {
  const { email, password } = req.body;
  // check if user exists
  User.findOne({ email: email, role: 1 })
    .then((user) => {
      // if not exists
      if (!user)
        return res.status(400).json({ success: false, err: "Invalid Details" });

      // if exists then Match Password
      bcrypt.compare(password, user.password, (err, result) => {
        // password doesn't matches
        if (!result) {
          return res
            .status(404)
            .json({ success: false, message: "Invalid Details" });
        }

        // Password Matches then generate token
        const token = jwt.sign(
          {
            _id: user._id,
          },
          process.env.SECRET,
          { expiresIn: 3600 }
        ); // 1 hour

        // delete password from user response
        const newUser = { ...user }._doc;
        delete newUser.password;

        return res.send({ success: true, token, user: newUser });
      });
    })
    .catch((err) =>
      res
        .status(500)
        .json({ success: false, message: "Something Went Wrong !" })
    );
};

// DESC: Method to add flight on the database
// ACCESS: Admin
const addFlight = (req, res) => {
  const {
    name,
    source,
    destination,
    flightnumber,
    date,
    departuretime,
    arrivaltime,
    amount,
    seats,
  } = req.body;

  // arrival time must greter more than departure time
  if (parseInt(arrivaltime) <= parseInt(departuretime))
    return res.status(400).json({ success: false, message: "Invalid Timings" });

  // creating flight
  const flight = new Flight({
    name,
    source,
    destination,
    flightnumber,
    date,
    departuretime,
    arrivaltime,
    seats,
    amount,
    seats,
  });

  flight
    .save()
    .then((fl) =>
      res.status(201).json({ success: true, message: "Flight Added" })
    )
    .catch((err) =>
      res.status(500).json({ message: err.message, success: false })
    );
};

// DESC: Method to get flight on the database
// ACCESS: Admin
const getAllFlights = (req, res) => {
  Flight.find({})
    .then((flights) => {
      return res.status(200).json({ success: true, flights });
    })
    .catch((err) =>
      res
        .status(500)
        .json({ success: false, message: "Something Went Wrong !" })
    );
};

// DESC: Method to return the details of single flight including it's bookings
// ACCESS: Admin
const getSingleFlight = (req, res) => {
  const flightId = req.params.flightid;
  // find flight by taking id from params
  Flight.findById(flightId)
    .then((flight) => {
      if (!flight) {
        return res
          .status(404)
          .json({ message: "Flight doesn't exists", success: false });
      }
      // find bookins of that flight
      Booking.find({ flight: flight._id })
        .populate("flight")
        .then((bookings) => {
          return res.status(200).json({ success: true, bookings, flight });
        })
        .catch((err) =>
          res
            .status(500)
            .json({ message: "Soemthing Went Wrong", success: false })
        );
    })
    .catch((err) =>
      res.status(500).json({ message: "Soemthing Went Wrong", success: false })
    );
};

// DESC: Method to delete a flight by taking it's id
// ACCESS: Admin
const deleteFlight = (req, res) => {
  const flightId = req.params.flightid;
  Flight.findByIdAndDelete(flightId)
    .then(() => {
      return res
        .status(200)
        .json({ success: true, message: "Flight Deleted Successfully" });
    })
    .catch((err) =>
      res.status(500).json({ success: false, message: "Something Went Wrong" })
    );
};

// DESC: Return all the bookings by flight number and time
// ACCESS: Admin
const bookingBasedFlightNumberTime = (req, res) => {
  const { flightnumber, time } = req.body;
  Flight.findOne({ flightnumber, arrivaltime: time })
    .then((flight) => {
      Booking.find({ flight: flight._id })
        .populate("flight")
        .then((bookings) => res.status(200).json({ success: true, bookings }))
        .catch((err) =>
          res
            .status(500)
            .json({ success: false, message: "Something Went Wrong !" })
        );
    })
    .catch((err) =>
      res
        .status(500)
        .json({ success: false, message: "Something Went Wrong !" })
    );
};

module.exports = {
  adminLogin,
  addFlight,
  getAllFlights,
  getSingleFlight,
  deleteFlight,
  bookingBasedFlightNumberTime,
};
