const mongoose = require("mongoose");
const MealModule = require("./Meal");

let MealplanSchema = new mongoose.Schema({
    name: {
        type: String
    },
    sunday: {
        type: [MealModule.MealSchema]
    },
    monday: {
        type: [MealModule.MealSchema]
    },
    tuesday: {
        type: [MealModule.MealSchema]
    },
    wednesday: {
        type: [MealModule.MealSchema]
    },
    thursday: {
        type: [MealModule.MealSchema]
    },
    friday: {
        type: [MealModule.MealSchema]
    },
    saturday: {
        type: [MealModule.MealSchema]
    },
    date_created: {
        type: String
    }
});

exports.Mealplan = mongoose.model('Mealplan', MealplanSchema);
exports.MealplanSchema = MealplanSchema;