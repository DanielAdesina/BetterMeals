const mongoose = require("mongoose");

let Mealplan = new mongoose.Schema({
    sunday: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Weekday'
    },
    monday: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Weekday'
    },
    tuesday: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Weekday'
    },
    wednesday: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Weekday'
    },
    thursday: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Weekday'
    },
    friday: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Weekday'
    },
    saturday: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Weekday'
    }
   
});

module.exports = mongoose.model('Mealplans', Mealplan);