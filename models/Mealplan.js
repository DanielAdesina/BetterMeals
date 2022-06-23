const mongoose = require("mongoose");
const MealModule = require("./Meal");

let MealplanSchema = new mongoose.Schema({
    name: {
        type: String
    },
    sunday: {
        type: []
    },
    monday: {
        type: []
    },
    tuesday: {
        type: []
    },
    wednesday: {
        type: []
    },
    thursday: {
        type: []
    },
    friday: {
        type: []
    },
    saturday: {
        type: []
    },
    date_created: {
        type: String
    },

});

exports.Schema = MealplanSchema;