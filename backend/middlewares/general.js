// importing required modules
const {  validationResult } = require('express-validator');
const jwt = require("jsonwebtoken")
const User = require("../modals/Users")

// DESC:  Middleware to verify the req.body data with all the express-validator validations
const validateBodyData = (req,res,next) => {
    const erros = validationResult(req)
    if(!erros.isEmpty())
    {
        return res.status(400).json({message: erros.array()[0].msg, success: false})
    }
    next();
}

// DESC:  Middleware that ensures the user is logged in by fetching the JWT Auth token from header and verify it.
const isLoggedIn = (req,res,next) => {
    
    const token = req.headers["authorization"]
    
    try {
        const decoded = jwt.verify(token,process.env.SECRET)

        if(decoded)
        {
            // if token is verified insert user in the req for further user
            req.auth = decoded;
            next();
        }
        else
        {
            throw new Error("Token 1 Expired")
        }
    }
    catch (error) {
        res.status(401).json({success: false, message:error.message})
    }
}

// DESC: Middleware to fetch all the detials of the user fetched from token and add in the req.user for further use
const fetchLoggedInUserDetails = (req,res,next) => {
    
    if(!req.auth)
        return res.status(401).json({message: "User is not logged In", success: false})
    
    // find user from database
    const id = req.auth._id;
    User.findById(id)
    .then((data) => {
        req.user = data;
        next();
    })
    .catch(() => res.status(404).json({success : false, "message": "Internal Server Error"}))


}

// DESC: Middleware that ensures that current logged in user is User
const isUser = (req,res,next) => {

    if(!req.user)
    {
        return res.status(401).json({success: false, message: "User is not logged in" })
    }

    if(req.user.role != -1)
        return res.status(401).json({success: false, message: "Permission Denied" })

    next();
}

// DESC: Middleware that ensures that current logged in user is Admin
const isAdmin = (req,res,next) => {
    if(!req.user)
    {
        return res.status(401).json({success: false, message: "User is not logged in" })
    }

    if(req.user.role != 1)
        return res.status(401).json({success: false, message: "Permission Denied" })

    next();
}

module.exports = {validateBodyData, isLoggedIn, fetchLoggedInUserDetails, isUser, isAdmin}