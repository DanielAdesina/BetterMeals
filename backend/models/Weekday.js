const mongoose = require("mongoose");

let Weekday = new mongoose.Schema({
    name: {
        type: String,
    },
    breakfast: {
        type: mongoose.Types.ObjectId, ref: 'Meal'
    },
    lunch: {
        type: mongoose.Types.ObjectId, ref: 'Meal'
    },
    dinner: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Meal'
    },
});

module.exports = mongoose.model('Weekdays', Weekday);