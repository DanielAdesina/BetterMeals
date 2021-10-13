const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient } = require("mongodb");
const mealRouter = require('./routes/mealRoutes');
const weekdayRouter = require('./routes/weekdayRoutes');
const mealPlanRouter = require('./routes/mealPlanRoutes')
const Mealplan = require('./models/Mealplan');
const Weekday = require('./models/Weekday');

const mongoose = require("mongoose");

let mealPlanExists = false;


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

    dbconn.collection('mealplans').countDocuments(function(err, count) {
        if( count > 0) {
            mealPlanExists = true;
        }
        else{
            let sun = new Weekday({name: "sunday"});
            sun.save();
            let mon = new Weekday({name: "monday"});
            mon.save();
            let tue = new Weekday({name: "tuesday"});
            tue.save();
            let wed = new Weekday({name: "wednesday"});
            wed.save();
            let thu = new Weekday({name: "thursday"});
            thu.save();
            let fri = new Weekday({name: "friday"});
            fri.save();
            let sat = new Weekday({name: "saturday"});
            sat.save();
            console.log(mon);
            let onlyMealPlan = new Mealplan({
                sunday: sun,
                monday: mon,
                tuesday: tue,
                wednesday: wed,
                thursday: thu,
                friday: fri,
                saturday: sat
            });
            
            onlyMealPlan.save();        
        }
    });


    app.use("/meals", mealRouter);
    app.use("/weekdays", weekdayRouter);
    app.use("/mealplan", mealPlanRouter);

    app.listen(5000, function() {
        console.log("Server is running on Port: 5000");
    });
});