const mongoose = require("mongoose")
const Schema = mongoose.Schema;

// creating Flight Schema
const flightSchema = new Schema({
    name: {type: String, required: true},
    source: {type: String, required: true},
    destination: {type: String ,required : true},
    flightnumber: {type: String, required: true},
    date: {type: String,required: true} ,
    departuretime: {type: Number,required: true},
    arrivaltime: {type: Number,required: true},
    seats: {type: Number, default: 60},
    amount: {type: Number},
   

})

module.exports = mongoose.model("Flights1",flightSchema)