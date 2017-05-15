var express = require('express');
var router = express.Router();
var auth = require('../authentication/auth');

var reportController = require('../controller/report.controller');

router.get('/territorycards', auth.isAuthenticated, reportController.getAllTerritoryCards);

router.get('/statistics/:type', auth.isAuthenticated, reportController.getTerritoryStatistics);

router.get('/statistics', /*auth.isAuthenticated, */reportController.getTerritoryStatistics);

module.exports = router;