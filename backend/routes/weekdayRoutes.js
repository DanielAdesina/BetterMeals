const express = require("express");
const router = express.Router();
const Weekday = require("../models/Weekday");

router.get('/', function(req, res){
    Weekday.find(function(err, weekday){
        if(err){
            res.json(err)
        }
        else{
            res.json(weekday)
        }
    });
});

router.get('/:id', function(req, res) {
    let id = req.params.id;
    Weekday.findById(id, function(err, weekday) {
        res.json(weekday);
    });
});

router.post('/add', function(req, res) {
    let weekday = new Weekday(req.body);
    weekday.save()
        .then(weekday => {
            res.status(200).json({'weekday': 'weekday added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new weekday failed');
        });
});

router.post('/delete/:id', function(req, res) {
    Weekday.findByIdAndRemove(req.params.id, function(err, weekday) {
        if (err){
            return next(err);
        }
    });
});

router.post('update/:id', function(req, res) {
    Weekday.findById(req.params.id, function(err, weekday) {
        if (!weekday){
            res.status(404).send("data is not found");
        }
        else{
            weekday.name = req.body.name;
            weekday.breakfast = req.body.breakfast;
            weekday.lunch = req.body.lunch;
            weekday.dinner = req.body.dinner;

            weekday.save().then(weekday => {
                res.json('Weekday updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    });
});

module.exports = router;