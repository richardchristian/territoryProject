
var mongoose = require('mongoose');
//var mongodb = require('mongodb');
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
    console.log("create new Territory: (" + req.body.territoryNumber + ") " + req.body.name);
    var territory = new Territory({
        territoryNumber: req.body.territoryNumber,
        name: req.body.name
    });

    territory.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
}

function getTerritoryById(req, res) {
    var territoryID = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(territoryID)) {
        res.status(404).send();
    }

    Territory.findById(territoryID).then((territory) => {
        if (!territory) {
            res.status(404).send();
        }
        res.send({
            success: true,
            territory: territory
        });
    }).catch((e) => {
        res.status(400).send();
    });

}

function getAllTerritories(req, res) {
    Territory.find().then((territories) => {
        res.send({ territories });
    }, (e) => {
        res.status(400).send(e);
    });
}

function getSearchTerritories(req, res) {
    var searchTerm = req.query.term;
    var findArr = [{ 'name': { $regex: searchTerm, $options: 'i' } }];

    if (!isNaN(searchTerm))
        findArr.push({ 'territoryNumber': { $regex: searchTerm, $options: 'i' } });

    Territory.find({ $or: findArr }).then((territories) => {
        res.send({ territories });
    }, (e) => {
        res.status(400).send(e);
    });
}

function updateTerritory(req, res) {
    var id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    Territory.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then((territory) => {
        if (!territory) {
            return res.status(404).send();
        }

        res.send({ territory });
    }).catch((e) => {
        res.status(400).send();
    });
}

function deleteTerritory(req, res) {
    var territoryID = req.params.id;

    if (!ObjectID.isValid(territoryID)) {
        return res.status(404).send();
    }

    Territory.findByIdAndRemove(territoryID).then((territory) => {
        if (!territory) {
            return res.status(404).send();
        }

        res.send(territory);
    }).catch((e) => {
        res.status(400).send();
    });
}