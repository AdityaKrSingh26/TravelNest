const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Define your MongoDB Atlas connection string. Replace <username>, <password>, and <clustername> with your own values.
const dbUri = "mongodb+srv://aditya:aditya@cluster0.kt9us7s.mongodb.net/?retryWrites=true&w=majority";

// Connect to MongoDB Atlas using Mongoose
mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
        console.log('Connected to MongoDB Atlas');
})
.catch((err) => {
        console.error('Error connecting to MongoDB Atlas', err);
});