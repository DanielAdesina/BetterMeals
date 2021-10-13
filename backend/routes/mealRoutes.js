const express = require("express");
const router = express.Router();
const Meal = require("../models/Meal");

router.get('/', function(req, res){
    Meal.find(function(err, meals){
        if(err){
            console.log(err);
        }
        else{
            res.json(meals)
        }
    });
});

router.get('/:id', function(req, res) {
    let id = req.params.id;
    Meal.findById(id, function(err, meal) {
        console.log(meal);
        res.json(meal);
    });
});

router.post('/add', function(req, res) {
    let meal = new Meal(req.body);
    meal.save()
        .then(meal => {
            res.status(200).json({'meal': 'meal added successfully' + meal.name});
        })
        .catch(err => {
            res.status(400).send('adding new meal failed');
        });
});

router.post('/delete/:id', function(req, res) {
    Meal.findByIdAndRemove(req.params.id, function(err, meal) {
        res.json('deleted a meal, probably');
    });
});



router.post('update/:id', function(req, res) {
    Meal.findById(req.params.id, function(err, meal) {
        if (!meal){
            res.status(404).send("data is not found");
        }
        else{
            meal.name = req.body.name;
            meal.recipe = req.body.recipe;

            meal.save().then(meal => {
                res.json('Meal updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    });
});

module.exports = router;