const mongoose = require("mongoose");

let Meal = new mongoose.Schema({
    name: {
        type: String
    },
    recipe: {
        type: String
    }
});

module.exports = mongoose.model('Meals', Meal);