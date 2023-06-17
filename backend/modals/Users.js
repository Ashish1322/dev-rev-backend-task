const mongoose = require("mongoose")
const Schema = mongoose.Schema;

// creating user Schema
const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String,required: true,unique: true},
    password: {type: String,required: true},
    gender: {
        type: String, 
        enum: ["male","female","others"],
        required: true

    },
    phoneNumber: {type: String,required: true},
    role: {
        type: Number,
        enum: [-1,1],
        default: -1,
        required: true
        },
    active: {
        type: Boolean,
        detault: false,
        required: true

    }
})

module.exports  = mongoose.model("User1",UserSchema);