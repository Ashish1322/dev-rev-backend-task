// importing modules
const express = require("express")
const router = express.Router()
const {body} = require("express-validator")
const rateLimit = require("express-rate-limit")

// importing user controllers
const {userlogin,signup, bookFlight, getAllBookings, searchFlights,activateAccount} = require("../controllers/userControllers")

// importing middlewares
const {validateBodyData, isLoggedIn, fetchLoggedInUserDetails, isUser, } = require("../middlewares/general")

// setting login api call limit for the admin 
const loginLimiter = rateLimit({
    windowMs: 15*60*1000, // 15 mins
    max: 10,
    message: {success: false,message: "To many requests pleae try after 15 mins"},
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false,
})

// DESC: Login the user
router.post("/login",
            loginLimiter,
            body("email").isEmail().withMessage("Invalid Email"),
            body("password").exists().isLength({min: 8}).withMessage("Invalid Password"),
            validateBodyData,
            userlogin)

// DESC: Create an un-activated Account of user and send account activation email to user, in order to verify the email of user
router.post("/signup",
            body("name").exists().withMessage("Name is required"),
            body("email").isEmail().withMessage("Invalid Email"),
            body("password").isStrongPassword().withMessage("Password is not strong !"),
            body("gender").exists().isIn(["male","female","others"]).withMessage("Invalid Feild Gender"),
            body("phone").exists().isMobilePhone().withMessage("Invalid Phone Number"),
            validateBodyData,
            signup)


// DESC: Hanlde the account activation links which are sent on the email while regitering
router.get("/activate-account/:token",
            activateAccount)


// DESC: Book Flight by taking flight id and passenger details
// ACCESS: USER Only
router.post("/book-flight/:flightid",
            isLoggedIn,
            fetchLoggedInUserDetails,
            isUser,
            body("name").exists().withMessage("Name is required"),
            body("gender").exists().isIn(["male","female","others"]).withMessage("Invalid Feild Gender"),
            body("age").exists().isNumeric().isInt({min: 1}).withMessage("Invalid Age"),
            validateBodyData,
            bookFlight
            )

// DESC: Returns all the booking of give user
// ACCESS: User Only
router.get("/get-bookings",
            isLoggedIn,
            fetchLoggedInUserDetails,
            isUser,
            getAllBookings
            )

// DESC: Search for the flights based on date and time
// ACCESS: User Only
router.post("/search-flights",
            isLoggedIn,
            fetchLoggedInUserDetails,
            isUser,
            body("date").exists().withMessage("Date is Required"),
            body("time").exists().withMessage("Time is also Required"),
            validateBodyData,
            searchFlights
            )

module.exports = router