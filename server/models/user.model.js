const mongoose = require('mongoose');
const validator = require('validator');
const passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            isAsync: true,
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },/*
    password: {
        type: String,
        required: true,
        minlength: 6
    },*/
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    }
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email', usernameQueryFields: ['email'] });

var User = mongoose.model('User', UserSchema);

module.exports = User;