const mongoose = require("mongoose")
const Schema = mongoose.Schema;

// creating Booking Schema
const bookingSchema = new Schema({
    name: {type: String, required: true},
    gender: {type: String,required: true},
    age: {type: Number,required: true},
    user: {
        type: Schema.Types.ObjectId,
        ref: "User1",
        required: true
    },
    flight: {
        type: Schema.Types.ObjectId,
        ref: "Flights1",
        required: true
    }

})

module.exports  = mongoose.model("Bookings",bookingSchema);