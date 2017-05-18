var mongoose = require('mongoose');
var _ = require('lodash');

var logger = require('../logging/logger');

var { Territory } = require('../models/territory.model');

module.exports = {
    createTerritory,
    getTerritoryById,
    getAllTerritories,
    getSearchTerritories,
    updateTerritory,
    deleteTerritory
};

function createTerritory(req, res) {
    var territory = new Territory({
        territoryNumber: req.body.territoryNumber,
        name: req.body.name,
        comment: req.body.comment
    });

    territory.save().then((doc) => {
        logger.info('Create new Territory ( ' + JSON.stringify(req.body, null, 2) + ' )');
        res.send(doc);
    }, (e) => {
        logger.error('Error createTerritory ( ' + JSON.stringify(req.body, null, 2) + ' )');
        logger.error(JSON.stringify(e, null, 2));
        res.status(400).send(e);
    });
}

function getTerritoryById(req, res) {
    var territoryID = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(territoryID)) {
        logger.error('Error - getTerritoryById - ID is not valid ( ' + JSON.stringify(req.params, null, 2) + ' )');
        res.status(404).send();
    }

    Territory.findById(territoryID).then((territory) => {
        if (!territory) {
            logger.error('Error - getTerritoryById - ID not existing ( ' + JSON.stringify(req.params, null, 2) + ' )');
            res.status(404).send();
        }
        res.send({
            success: true,
            territory: territory
        });
    }).catch((e) => {
        logger.error('Error - getTerritoryById ( ' + JSON.stringify(req.params, null, 2) + ' )');
        logger.error(JSON.stringify(e, null, 2));
        res.status(400).send();
    });

}

function getAllTerritories(req, res) {
    Territory.find()
        .then((territories) => {
            territories = _.sortBy(territories, 'territoriyNumber');
            res.send({ territories });
        }, (e) => {
            logger.error('Error - getAllTerritories');
            logger.error(JSON.stringify(e, null, 2));
            res.status(400).send(e);
        });
}

function getSearchTerritories(req, res) {
    var searchTerm = req.query.term;
    var findArr = [{ 'name': { $regex: searchTerm, $options: 'i' } }];

    if (!isNaN(searchTerm))
        findArr.push({ 'territoryNumber': { $regex: searchTerm, $options: 'i' } });
    Territory.find({ $or: findArr })
        .then((territories) => {
            territories = _.sortBy(territories, 'territoriyNumber');
            res.send({ territories });
        }, (e) => {
            logger.error('Error - getSearchTerritories ( ' + JSON.stringify(req.query, null, 2) + ')');
            logger.error(JSON.stringify(e, null, 2));
            res.status(400).send(e);
        });
}

function updateTerritory(req, res) {
    var id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        logger.error('Error - updateTerritory - ID is not valid ( ' + JSON.stringify(req.params, null, 2) + ' )');
        return res.status(404).send();
    }

    Territory.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then((territory) => {
        if (!territory) {
            logger.error('Error - updateTerritory - Territory not exists ( ' + JSON.stringify(id, null, 2) + ')');
            return res.status(404).send();
        }
        logger.info('Update Territory ( ' + JSON.stringify(req.body, null, 2) + ' )');
        res.send({ territory });
    }).catch((e) => {
        logger.error('Error - updateTerritory ( ' + JSON.stringify(req.body, null, 2) + ')');
        logger.error(JSON.stringify(e, null, 2));
        res.status(400).send();
    });
}

function deleteTerritory(req, res) {
    var territoryID = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(territoryID)) {
        logger.error('Error - deleteTerritory - ID is not valid ( ' + JSON.stringify(territoryID, null, 2) + ' )');
        return res.status(404).send();
    }

    Territory.findByIdAndRemove(territoryID).then((territory) => {
        if (!territory) {
            logger.error('Error - deleteTerritory - territory not exists ( ' + JSON.stringify(territoryID, null, 2) + ' )');
            return res.status(404).send();
        }

        res.send(territory);
    }).catch((e) => {
        logger.error('Error - deleteTerritory ( ' + JSON.stringify(territoryID, null, 2) + ')');
        logger.error(JSON.stringify(e, null, 2));
        res.status(400).send();
    });
}