var express = require('express');
var router = express.Router();
var auth = require('../authentication/auth');
var passport = require('passport');

var userController = require('../controller/user.controller');

router.post('/register', userController.register);

router.post('/login', userController.login);

router.post('/logout', userController.logout);

module.exports = router;