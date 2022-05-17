const mongoose = require("mongoose");

let MealSchema = new mongoose.Schema({
    name: {
        type: String
    },
    recipe: {
        type: String
    }
    //add a short description link and add an option in frontend where recipe links to actual recipe website or a note section w/ recipe
});

exports.Meal = mongoose.model('Meals', MealSchema);
exports.MealSchema = MealSchema;