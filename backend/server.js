const express = require('express');
const app = express();
const cors = require('cors');
const bcrpyt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { MongoClient } = require("mongodb");
const mealRouter = require('./routes/mealRoutes');
const weekdayRouter = require('./routes/weekdayRoutes');
const mealPlanRouter = require('./routes/mealPlanRoutes');
const authRoutes = require('./routes/authRoutes');



const mongoose = require("mongoose");

app.use(cors());

app.use(express.json());



mongoose.connect(
    "mongodb+srv://mern:mongodb@cluster0.4c2i1.mongodb.net/mealplan?retryWrites=true&w=majority", 
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }
);

dbconn = mongoose.connection;

dbconn.on('error', console.error.bind(console, 'connection error:'));

dbconn.once('open', function callback () {

    app.use("/user", authRoutes.router)
    app.use("/meals", mealRouter);
    app.use("/weekdays", weekdayRouter);
    app.use("/mealplan", mealPlanRouter);

    app.listen(5000, function() {
        console.log("Server is running on Port: 5000");
    });
});