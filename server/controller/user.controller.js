var mongoose = require('mongoose');
var _ = require('lodash');
var logger = require('../logging/logger');

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
    User.register(new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    }), req.body.password, function (err, user) {
        if (err) {
            logger.error('Error - REGISTER ( ' + JSON.stringify(req.body, null, 2) + ')');
            logger.error(JSON.stringify(e, null, 2));
            return res.send(err);
        } else {
            logger.info('Create new User ( ' + JSON.stringify(user, null, 2) + ' )');
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
    req.logout();
    return res.send({
        success: true
    });

}

function getUserById(req, res) {
    var userID = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userID)) {
        logger.error('Error - getUserById - ID is not valid ( ' + JSON.stringify(req.params, null, 2) + ' )');
        res.status(404).send();
    }

    User.findById(userID).then((user) => {
        if (!user) {
            logger.error('Error - getUserById - ID not existing ( ' + JSON.stringify(req.params, null, 2) + ' )');
            res.status(404).send();
        }
        res.send({
            success: true,
            user: user
        });
    }).catch((e) => {
        logger.error('Error - getUserById ( ' + JSON.stringify(req.params, null, 2) + ' )');
        logger.error(JSON.stringify(e, null, 2));
        res.status(400).send();
    });

}

function getAllUser(req, res) {
    User.find().then((users) => {
        res.send({ users });
    }, (e) => {
        logger.error('Error - getAllUser');
        logger.error(JSON.stringify(e, null, 2));
        res.status(400).send(e);
    });
}

function deleteUser(req, res) {
    var userID = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userID)) {
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

    if (!mongoose.Types.ObjectId.isValid(id)) {
        logger.error('Error - updateUser - ID is not valid ( ' + JSON.stringify(req.params, null, 2) + ' )');
        return res.status(404).send();
    }

    User.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then((user) => {
        if (!user) {
            logger.error('Error - updateUser - ID not existing ( ' + JSON.stringify(req.params, null, 2) + ' )');
            return res.status(404).send();
        }

        if (req.body.password) {
            logger.info('User update Password ( ' + JSON.stringify(user, null, 2) + ' )');
            user.setPassword(req.body.password, () => {
                user.save();
                res.send({ user });
            });
        } else {
            logger.info('updateUser ( ' + JSON.stringify(user, null, 2) + ' )');
            res.send({ user });
        }
    }).catch((e) => {
        logger.error('Error - updateUser ( ' + JSON.stringify(req.params, null, 2) + ' )');
        logger.error(JSON.stringify(e, null, 2));
        res.status(400).send();
    });
}

