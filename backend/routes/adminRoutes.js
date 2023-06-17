// importing required modules
const express = require("express")
const router = express.Router();
const {body} = require("express-validator")
const rateLimit = require("express-rate-limit")

// importing required admin controllers
const {adminLogin,addFlight,getAllFlights,getSingleFlight,deleteFlight,bookingBasedFlightNumberTime} = require("../controllers/adminControllers")

// importing requried middelwares
const {validateBodyData, isLoggedIn,fetchLoggedInUserDetails,isAdmin} = require("../middlewares/general")

// setting API-Call limit for login endpoint
const loginLimiter = rateLimit({
    window: 15*60*1000, // 15 mins
    max: 10,
    message: {success: false,message: "To many requests pleae try after 15 mins"}
})

// DESC: Login the User
router.post('/login',
            loginLimiter,
            body("email").isEmail().withMessage("Invalid Email"),
            body("password").exists().isLength({min: 8}).withMessage("Invalid Password"),
            validateBodyData,
            adminLogin)

// DESC: Add Flight on the database by ensure the loggedin user is Admin
// ACCESS: Admin Only
router.post("/add-flight",
            isLoggedIn,
            fetchLoggedInUserDetails,
            isAdmin,
            body("name").exists().isLength({min: 2}).withMessage("Flight Name is Required"),
            body("source").exists().isLength({min: 2}).withMessage("Source of flight is required"),
            body("destination").exists().isLength({min: 2}).withMessage("Destination of journey is required"),
            body("flightnumber").exists().isLength({min: 2}).withMessage("Flight Number is Required"),
            body("date").exists().isLength({min: 8}).withMessage("Date is Required"),
            body("departuretime").exists().isInt({min:0,max: 24}).withMessage("Invalid departure Time"),
            body("arrivaltime").exists().isInt({min:0,max: 24}).withMessage("Invalid arrival Time"),
            body("amount").exists().isInt({min: 0}).withMessage("Amount is requried"),
            validateBodyData,
            addFlight
            )

// DESC: Return All the Flights
// ACCESS: Admin Only
router.get("/get-all-flights",
            isLoggedIn,
            fetchLoggedInUserDetails,
            isAdmin,
            getAllFlights
            )

// DESC: Delete give flight by it's id
// ACCESS: Admin Only
router.delete("/delete-flight/:flightid",
            isLoggedIn,
            fetchLoggedInUserDetails,
            isAdmin,
            deleteFlight)

// DESC: Return details of a single flight including bookins
// ACCESS: Admin Only
router.get("/get-flight/:flightid",
            isLoggedIn,
            fetchLoggedInUserDetails,
            isAdmin,
            getSingleFlight)

// DESC: View all the booking based on flight number and time 
// ACCESS: Admin Only
router.get("/get-flight-on-time-number",
            isLoggedIn,
            fetchLoggedInUserDetails,
            isAdmin,
            body("flightnumber").isLength({min:3}).withMessage("flight number is required"),
            body("time").exists().isInt({min:0,max: 24}).withMessage("Invalid arrival Time"),
            validateBodyData,
            bookingBasedFlightNumberTime
            )
            
module.exports = router