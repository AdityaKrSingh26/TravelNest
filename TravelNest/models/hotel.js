const mongoose = require('mongoose')

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: String,
    city: String,
    state: String,
    country: String,
    price: Number,
    roomsAvailable: Number,
    amenities: [String],
    roomPictures: [String],
    reviews: [
        {
            reviewText: String,
            rating: Number
        }
    ],
});




const Hotel = mongoose.model('Hotel', hotelSchema)
module.exports = Hotel