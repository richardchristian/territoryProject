var express = require('express');
var router = express.Router();
var auth = require('../authentication/auth');

var reportController = require('../controller/report.controller');

router.get('/territorycards', /*auth.isAuthenticated,*/ reportController.getAllTerritoryCards);

router.get('/territorycards/:id', /*auth.isAuthenticated,*/ reportController.getTerritoryCardByID);

module.exports = router;