const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    activePlanId: {
        type: String
    }
});

exports.User = mongoose.model('User', UserSchema);
exports.UserSchema = UserSchema;