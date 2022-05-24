const express = require("express");
const router = express.Router();
const UserModule = require("../models/User")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

process.env.JWT_SECRET = require('crypto').randomBytes(64).toString('hex');


router.post("/register", function(req, res){
    const user = req.body;

    UserModule.User.findOne({username: user.username})
        .then(nameTaken => {
            if(nameTaken){
                res.json({message: "Username already taken"})
            }
            else{
                bcrypt.hash(req.body.password, 10)
                    .then(password => {
                        user.password = password;
                        const savedUser = new UserModule.User({
                            username: user.username,
                            password: user.password
                        });
                        savedUser.save()
                            .then(user => {
                                res.status(200).json({message: 'user added successfully' + user.username});
                            })
                            .catch(err => {
                                res.status(400).json({message: 'adding user failed: ' + err});
                            })
                    });
            }
        });
    
        
         
    
});

router.post("/login", function(req, res){
    const userLoggingIn = req.body;
    UserModule.User.findOne({username: userLoggingIn.username})
        .then(savedUser => {
            if(!savedUser){
                return res.json({message: 'Invalid Username or Password'});
            }
            bcrypt.compare(userLoggingIn.password, savedUser.password)
                .then(isCorrect => {
                    if(isCorrect){
                        const payload = {
                            id: savedUser._id,
                            username: savedUser.username,
                        }
                        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 3600}, (err, token) => {
                            if(err){
                                return res.json({message: "uh oh: " + err,
                                                token: token});
                            }
                            return res.json({message: "Success",
                                            token: 'Bearer ' + token});
                        })
                    }
                    else{
                        return res.json({message: "Invalid Username or Password"})
                    }
                })
        })
});



function verifyJWT(req, res, next){
    req.username = "";
    req.userId = null;
    if(!req.headers["x-access-token"]){
        res.json({message: "No token present", isAuth: false})
    }
    else{
        const token = req.headers["x-access-token"].split(' ')[1];
        if(token){
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>{
                if(err){
                    return res.json({isAuth: false,
                                    message: "Failed to Authenticate",
                                    token: token});
                }
                req.username = decoded.username;
                req.userId = decoded.id;
                next();
            })
        }
        else{
            res.json({message: "Incorrect token: " + token, isAuth: false})
        }
    }
}

router.get("/isUserAuth", verifyJWT, function(req, res){
    res.json({username: req.username,
            userId: req.userId,
            isAuth: true})
});


exports.router = router;
exports.verifyJWT = verifyJWT;
