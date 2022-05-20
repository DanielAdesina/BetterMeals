const express = require("express");
const router = express.Router();
// const Mealplan = require("../models/Mealplan");
// const Weekday = require("../models/Weekday");
// const Meal = require("../models/Meal");
const MealplanModule = require("../models/Mealplan");

router.get('/', function(req, res) {
    MealplanModule.Mealplan.find(function(err, mealplans) {
        res.json(mealplans);
    });
});

// router.get('/:day', function(req, res) {
//     let day = req.params.day;
//     Mealplan.find(function(err, mealplans) {
//         let mealplan = mealplans[0];
//         let weekdayId = mealplan[day];
//         Weekday.findById(weekdayId, function(err2, weekday){
//             res.json(weekday);
//         });
//     });
// });

// router.get('/:day/:meal', function(req, res) {
//     let day = req.params.day;
//     let mealTime = req.params.meal;
//     Mealplan.find(function(err, mealplans) {
//         let mealplan = mealplans[0];
//         let weekdayId = mealplan[day];
//         Weekday.findById(weekdayId, function(err, weekday) {
//             if (!weekday){
//                 res.status(404).send("data is not found");
//             }
//             else{
//                 let mealId = weekday[mealTime];
//                 Meal.findById(mealId, function(err, meal){
//                     if(!meal){
//                         res.status(404).send("data is not found")
//                     }
//                     else{
//                         res.json(meal);
//                     }
//                 });
//             }
//         });
//     });
// });

router.post('/new', function(req, res){
    const mealTaken = await MealplanModule.Mealplan.findOne({name: req.body.name});
    if(nameTaken){
        res.json({message: "Mealplan name already taken"})
    }
    else{
        let mealplan = new MealplanModule.Mealplan(req.body);
        mealplan.save()
            .then(mealplan => {
                res.status(200).json({'mealplan': 'mealplan added successfully ' + mealplan.name});
            })
            .catch(err => {
                res.status(400).send('adding new mealplan failed');
            });
    }

});


// router.post('/update/:day/:meal', function(req, res) {
//     let id = req.params.id;
//     let day = req.params.day;
//     let mealTime = req.params.meal;
//     Mealplan.find(function(err, mealplans) {
//         let mealplan = mealplans[0];
//         let weekdayId = mealplan[day];
//         Weekday.findById(weekdayId, function(err, weekday) {
//             if (!weekday){
//                 res.status(404).send("data is not found");
//             }
//             else{
//                 weekday[mealTime] = req.body._id;
//                 let mealId = weekday[mealTime];
//                 Meal.findById(mealId, function(err, meal){
//                     console.log(meal);
//                 });
    
//                 weekday.save().then(weekday => {
//                     res.json('Weekday updated!');
//                 })
//                 .catch(err => {
//                     res.status(400).send("Update not possible");
//                 });
//             }
//         });
//     });
// });

module.exports = router;