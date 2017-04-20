var express = require('express');
var router = express.Router();
var auth = require('../authentication/auth');

var proclaimerController = require('../controller/proclaimer.controller');

router.post('/create', auth.isAuthenticated, proclaimerController.createProclaimer);

router.get('/:id', auth.isAuthenticated, proclaimerController.getProclaimerById);

router.get('/', auth.isAuthenticated, proclaimerController.getAllProclaimer);

router.delete('/:id', auth.isAuthenticated, proclaimerController.deleteProclaimer);

router.put('/:id', auth.isAuthenticated, proclaimerController.updateProclaimer);

module.exports = router;