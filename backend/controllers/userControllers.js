
// importing requreid modules
const User = require("../modals/Users")
const Flight = require("../modals/Flights")
const Booking = require("../modals/Bookings")
const { sendMail } = require("../helper")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

// DESC: Method to login user
const userlogin = (req,res) => {

    const {email,password} = req.body;

    // check if user exists
    User.findOne({email: email,role: -1,active: true})
    .then((user)=>{
        // if not exists
        if(!user)
        return res.status(400).json({success:false,message: "Invalid Details"})
    
        // if exists then Match Password
        bcrypt.compare(password,user.password,(err,result)=> {

            // password doesn't matches
            if(!result)
            {
                return res.status(404).json({"success":false,"message":"Invalid Details"})
            }

            // Password Matches then generate token
            const token = jwt.sign({
                _id: user._id,
            }, process.env.SECRET, {expiresIn: 3600}) // 1 hour

            // delete password of user from res
            const newUser = {...user}._doc
                delete newUser.password;

              
            return res.send({"success":true,token,user:newUser})


        })
    })
    .catch(err => res.status(500).json({"success":false,"message":"Something Went Wrong !"}))
}

// DESC: Method to create and un-activated account and send the activation link on user email
const signup = (req,res) => {

    const {name,email,password,gender,phone} = req.body;

    // if email already exists
    User.findOne({email: req.body.email})
    .then( async (user)=> {
  
        // if user exists but account not activated the again send an activation email
        if(user && user.active == false)
        {
            const token = jwt.sign({
                _id: user._id,
            }, process.env.SECRET, {expiresIn: 300})  // expires in 5 min

            // mail configurations
            let host = req.get("host")
            let url = `${host}/user/activate-account/${token}`
            let body = `<h1> Click on the following link to Activate  your Account. This link is valid just for 5 mins </h1><a href='${url}'> ${url} </a>`
            // sending email
            await  sendMail(body,"Activate your Account",email)
            return res.status(200).json({success: true, message:"You already have and account but it's not activated. An Account Activation Link has been resent to your Account."})
        }
        // if account is already   activated the return error
        if(user )
        {
            return res.status(404).json({"success":false,"message":"Account with this email already exists.\n "})
        }

        // set new pass and send activation email
        bcrypt.hash(password,10, async (err,has)=> {
            if(err)
            return res.status(500).json({"success":false,"message":"Please Try Again"})

        
            const newUser = new User({name,email,password: has,gender,phoneNumber:phone,active: false})
    
            await newUser.save()

            const token = jwt.sign({
                _id: newUser._id,
            }, process.env.SECRET, {expiresIn: 300})  // expires in 5 min

            // email params
            let host = req.get("host")
            let url = `${host}/user/activate-account/${token}`
            let body = `<h1> Click on the following link to Activate  your Account. This link is valid just for 5 mins </h1><a href=${url}> ${url} </a>`
            // sending email
            await  sendMail(body,"Activate your Account",email)
            return res.status(200).json({success: true, message:"An Account Activation Link has been sent to your Account."})
        })
      
    })
    .catch(err => res.status(500).json({"success":false,"message": err.message}))
}

// DESC: Method to book flight
// ACCESS: User
const bookFlight =  (req,res) => {

    const {name,gender,age} = req.body;
    const flightId = req.params.flightid
    Flight.findById(flightId)
    .then( async (flight) => {
        // check seats 
        if(flight.seats <= 0)
            return res.status(400).json({success:false, message:"Not Seats Available !"})

        flight.seats-=1;
        await flight.save()
        
        const booking = new Booking({name,gender,age,user: req.user._id,flight: flightId})
        await booking.save();

        return res.status(200).json({success: true,message: "Ticket Booked"})
       
    })
    .catch(err => res.status(500).json({"success":false,"message": "Something Went Wrong !"}))
 
}

// DESC: Method to get all the bookings of current user
// ACCESS: User
const getAllBookings = (req,res) => {

    Booking.find({user: req.user._id})
    .populate("flight")
    .then(bookings => {
        res.status(200).json({success: true,bookings})
    })
    .catch(err => res.status(500).json({"success":false,"message": "Something Went Wrong !"}))
}

// DESC: Method to search flights by time and date
// ACCESS: User
const searchFlights = (req,res) => {
    
    const {date,time} = req.body;

    Flight.find({date: date, departuretime: {$gt: time-1} })
    .then(flights => {
        return res.status(200).json({success: true, flights})
    })
    .catch(err => res.status(500).json({message: "Flights Not Found",success: false}))
}

// DESC: Method to hadnlde account activation links sent on email
// ACCESS: User
const activateAccount = (req,res) => {
    const token = req.params.token
    let _id;
    try{
        const decoded = jwt.verify(token, process.env.SECRET);
        _id = decoded._id
    }
    catch(err)
    {
        return res.status(400).json({success: false,message:"Link is Invalid or may be expired"})
    }
    // find the user from token and activate it's account
    User.findById(_id)
    .then( async user => {
        if(user.active)
            return res.status(200).message({message:"Account is already active"})
        user.active = true
        await user.save();
        return res.status(200).json({success: true,message:"Account Activated Successfully. Now you can login on the portal"})

    })
    .catch(err => res.status(500).json({success: false,message: err.message}))
}

module.exports = {userlogin,signup,bookFlight,getAllBookings,searchFlights,activateAccount}