const connectDB = require("./config/databse")
const hotel = require("./models/hotel")

const fs = require('fs')
const data = JSON.parse(fs.readFileSync('./aajson/pune.json', 'utf-8'))

const start = async () => {
    try {
        console.log(data)
        hotel.create(data)
    } catch (error) {
        // console.log(error.message);
    }
}

start()