var express = require('express');
var router = express.Router();
var auth = require('../authentication/auth');

var processingTerritoryController = require('../controller/processing-territory.controller');

router.post('/add', /*auth.isAuthenticated,*/ processingTerritoryController.addProcessingTerritory);

router.get('/not', /*auth.isAuthenticated,*/  processingTerritoryController.getAllNonProcessingTerritories);

router.get('/search', /*auth.isAuthenticated,*/ processingTerritoryController.getSearchProcessingTerritories);

router.get('/:id', /*auth.isAuthenticated,*/  processingTerritoryController.getProcessingTerritoryById);

router.get('/', /*auth.isAuthenticated,*/  processingTerritoryController.getAllProcessingTerritories);

router.put('/submit/:id',/*auth.isAuthenticated,*/  processingTerritoryController.setProcessingTerritorySubmitted);

router.put('/:id',/*auth.isAuthenticated,*/  processingTerritoryController.updateProcessingTerritory);

router.delete('/:id', /*auth.isAuthenticated,*/  processingTerritoryController.deleteProcessingTerritory);

module.exports = router;