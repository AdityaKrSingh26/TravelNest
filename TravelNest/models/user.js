const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    bookings: [
        {
            hotelName: String,
            hotelLocation: String,
            duration: {
                checkIn: Date,
                checkOut: Date,
            },
            reviews: String,
            rating: Number,
        },
    ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
