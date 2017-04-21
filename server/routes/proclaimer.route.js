var express = require('express');
var router = express.Router();
var auth = require('../authentication/auth');

var proclaimerController = require('../controller/proclaimer.controller');

router.post('/create', auth.isAuthenticated, proclaimerController.createProclaimer);

router.get('/search', auth.isAuthenticated, proclaimerController.getSearchProclaimers);

router.get('/:id', auth.isAuthenticated, proclaimerController.getProclaimerById);

router.get('/', auth.isAuthenticated, proclaimerController.getAllProclaimers);

router.put('/:id', auth.isAuthenticated, proclaimerController.updateProclaimer);

router.delete('/:id', auth.isAuthenticated, proclaimerController.deleteProclaimer);

module.exports = router;