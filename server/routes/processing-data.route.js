var express = require('express');
var router = express.Router();
var auth = require('../authentication/auth');

var processingDataController = require('../controller/processing-data.controller');

router.post('/add', /*auth.isAuthenticated,*/ processingDataController.addProcessingData);

router.get('/territories/not', /*auth.isAuthenticated,*/  processingDataController.getAllNonProcessingTerritories);

router.get('/territories', /*auth.isAuthenticated,*/  processingDataController.getAllProcessingTerritories);

router.get('/territories/not/search', /*auth.isAuthenticated,*/  processingDataController.getSearchNonProcessingTerritories);

router.get('/territories/search', /*auth.isAuthenticated,*/  processingDataController.getSearchProcessingTerritories);

router.get('/search', /*auth.isAuthenticated,*/ processingDataController.getSearchProcessingData);

router.get('/:id', /*auth.isAuthenticated,*/  processingDataController.getProcessingDataById);

router.get('/', /*auth.isAuthenticated,*/  processingDataController.getAllProcessingData);

router.put('/submit/:id',/*auth.isAuthenticated,*/  processingDataController.setProcessingDataSubmitted);

router.put('/:id',/*auth.isAuthenticated,*/  processingDataController.updateProcessingData);

router.delete('/:id', /*auth.isAuthenticated,*/  processingDataController.deleteProcessingData);

module.exports = router;
