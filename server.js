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
const path = require("path")


const mongoose = require("mongoose");

app.use(cors());

app.use(express.json());



mongoose.connect(
    process.env.CONNSTR, 
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
    app.use("/weekdays", weekdayRouter);
    app.use("/mealplan", mealPlanRouter);

    app.use(express.static(path.join(__dirname, "client", "build")))

    
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });

   
    const PORT = process.env.PORT || 5000

    app.listen(PORT, function() {
        console.log("server listening on port " + PORT)
    });
});