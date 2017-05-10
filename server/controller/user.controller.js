
var mongoose = require('mongoose');
//var mongodb = require('mongodb');
var _ = require('lodash');
var User = require('../models/user.model');
var passport = require('passport');

module.exports = {
    register,
    login,
    logout,
    getUserById,
    getAllUser,
    updateUser,
    deleteUser
};

function register(req, res) {
    console.log("registering: " + req.body.firstName);
    User.register(new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    }), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.send(err);
        } else {
            passport.authenticate('local')(req, res, function (err) {
                res.send({
                    success: true,
                    user: user
                });
            });
        }
    });
}

function login(req, res) {
    passport.authenticate('local')(req, res, function (err) {
        res.send({
            success: true,
            user: req.user
        });
    });
}

function logout(req, res) {
    console.log(req.user);
    req.logout();
    return res.send({
        success: true
    });

}

function getUserById(req, res) {
    var userID = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userID)) {
        res.status(404).send();
    }

    User.findById(userID).then((user) => {
        if (!user) {
            res.status(404).send();
        }
        res.send({
            success: true,
            user: user
        });
    }).catch((e) => {
        res.status(400).send();
    });

}

function getAllUser(req, res) {
    User.find().then((users) => {
        res.send({ users });
    }, (e) => {
        res.status(400).send(e);
    });
}

function deleteUser(req, res) {
    var userID = req.params.id;

    if (!ObjectID.isValid(userID)) {
        return res.status(404).send();
    }

    User.findByIdAndRemove(userID).then((user) => {
        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    }).catch((e) => {
        res.status(400).send();
    });
}

function updateUser(req, res) {
    var id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    User.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then((user) => {
        if (!user) {
            return res.status(404).send();
        }

        res.send({ user });
    }).catch((e) => {
        res.status(400).send();
    });
}

