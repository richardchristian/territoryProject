var express = require('express');
var router = express.Router();
var auth = require('../authentication/auth');

var userController = require('../controller/user.controller');

router.get('/:id', auth.isAuthenticated, userController.getUserById);

router.get('/', auth.isAuthenticated, userController.getAllUser);

router.get('/profile', auth.isAuthenticated, function (req, res) {
    res.send('get my data');
});

router.delete('/:id', auth.isAuthenticated, userController.deleteUser);

router.put('/:id', auth.isAuthenticated, userController.updateUser);

module.exports = router;