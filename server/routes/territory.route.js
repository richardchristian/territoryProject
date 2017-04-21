var express = require('express');
var router = express.Router();
var auth = require('../authentication/auth');

var territoryController = require('../controller/territory.controller');

router.post('/create', auth.isAuthenticated, territoryController.createTerritory);

router.get('/search', territoryController.getSearchTerritories);

router.get('/:id', auth.isAuthenticated, territoryController.getTerritoryById);

router.get('/', auth.isAuthenticated, territoryController.getAllTerritories);

router.put('/:id', auth.isAuthenticated, territoryController.updateTerritory);

router.delete('/:id', auth.isAuthenticated, territoryController.deleteTerritory);

module.exports = router;