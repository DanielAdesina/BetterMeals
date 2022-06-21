const express = require("express");
const router = express.Router();
const auth = require("./authRoutes");
const mongoose = require("mongoose");
// const Mealplan = require("../models/Mealplan");
// const Weekday = require("../models/Weekday");
// const Meal = require("../models/Meal");
const Mealplan = require("../models/Mealplan");

router.get('/', auth.verifyJWT, function(req, res) {
    const MealplanModel = mongoose.model("Mealplan", Mealplan.Schema, req.username + "Mealplan");
    MealplanModel.find(function(err, mealplans) {
        res.json(mealplans);
    });
});

router.get('/:id', auth.verifyJWT, function(req, res) {
    let id = req.params.id;
    const MealplanModel = mongoose.model("Mealplan", Mealplan.Schema, req.username + "Mealplan");
    MealplanModel.findById(id, function(err, mealplan){
        if(err){
            res.json({message: "Mealplan not found", err: err});
        }
        else{
            res.json(mealplan);
        }
    })
});


router.post("/namechange/:id", auth.verifyJWT, function(req, res){
    let id = req.params.id;
    let newName = req.body.name;
    const MealplanModel = mongoose.model("Mealplan", Mealplan.Schema, req.username + "Mealplan")
    MealplanModel.findById(id, function(err, mealplan){
        if(err){
            res.json({message: "Mealplan not found", err: err});
        }
        else{
            mealplan.name = newName;
            mealplan.save().then(res.json({message: "Mealplan name changed"}))
        }
    })
})

router.post('/edit/:id/:day/:mealtime', auth.verifyJWT, function(req, res){
    let id = req.params.id;
    let day = req.params.day;
    let mealtime = req.params.mealtime;
    let newMeal = req.body.mealId;
    let newTitle = req.body.mealTitle;
    

    const MealplanModel = mongoose.model("Mealplan", Mealplan.Schema, req.username + "Mealplan");
    MealplanModel.findById(id, function(err, mealplan){
        if(err){
            res.json({message: "Mealplan not found", err: err});
        }
        else{
            mealplan[day][parseInt(mealtime)] = newMeal;
            mealplan[day][parseInt(mealtime) + 3] = newTitle;
            mealplan.markModified(day)
            mealplan.save().then(result => {
                res.json('Mealplan updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    })
})

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

router.post('/new', auth.verifyJWT, function(req, res){
    const MealplanModel = mongoose.model("Mealplan", Mealplan.Schema, req.username + "Mealplan");
    MealplanModel.findOne({name: req.body.name})
        .then(mealTaken => {
            if(mealTaken){
                res.json({message: "Mealplan name already taken"})
            }
            else{
                let mealplan = new MealplanModel(req.body);
                mealplan.save()
                    .then(mealplan => {
                        res.status(200).json({'mealplan': 'mealplan added successfully ' + mealplan.name});
                    })
                    .catch(err => {
                        res.status(400).send('adding new mealplan failed');
                    });
            }
        });
    

});

router.post('/delete', auth.verifyJWT, function(req, res){
    let id = req.body.planId
    const MealplanModel = mongoose.model("Mealplan", Mealplan.Schema, req.username + "Mealplan");
    MealplanModel.findByIdAndDelete(id, function (err, plan){
        if (err){
            res.json({message: "error" + err})
        }
        else{
            res.json({message: "deleted a plan" + plan.name});
        }
    });
    
});




module.exports = router;