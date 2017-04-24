
var mongoose = require('mongoose');
var _ = require('lodash');
var { ProcessingTerritory } = require('../models/processing-territory.model');

var { Territory } = require('../models/territory.model');

module.exports = {
    addProcessingTerritory,
    getProcessingTerritoryById,
    getAllProcessingTerritories,
    getAllNonProcessingTerritories,
    getSearchProcessingTerritories,
    updateProcessingTerritory,
    setProcessingTerritorySubmitted,
    deleteProcessingTerritory
};

function addProcessingTerritory(req, res) {
    console.log("add new processing Territory Entry: (" + req.body.territoryNumber + ") " + req.body.name);
    var fromDateArr = req.body.from.split('.');
    var toDateArr = req.body.to.split('.');

    var processingTerritory = new ProcessingTerritory({
        proclaimerID: req.body.proclaimerID,
        territoryID: req.body.territoryID,
        from: new Date(fromDateArr[2], fromDateArr[1], fromDateArr[0]),
        to: new Date(toDateArr[2], toDateArr[1], toDateArr[0]),
        submitted: req.body.submitted
    });

    processingTerritory.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
}

function getProcessingTerritoryById(req, res) {
    var processingTerritoryID = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(processingTerritoryID)) {
        res.status(404).send();
    }

    ProcessingTerritory.findById(processingTerritoryID).then((processingTerritory) => {
        if (!processingTerritory) {
            res.status(404).send();
        }
        res.send({
            success: true,
            processingTerritory: processingTerritory
        });
    }).catch((e) => {
        res.status(400).send();
    });

}

function getAllProcessingTerritories(req, res) {
    ProcessingTerritory.find().then((processingTerritories) => {
        res.send({ processingTerritories });
    }, (e) => {
        res.status(400).send(e);
    });
}

function getAllNonProcessingTerritories(req, res) {
    ProcessingTerritory.find({}, 'territoryID -_id').then(processingTerritories => {
        var processingArr = _.map(processingTerritories, 'territoryID');
        Territory.find({ _id: { $nin: processingArr } }).then(territories => {
            res.send(territories);
        }, (e) => {
            res.status(400).send(e);
        });
    }, (e) => {
        res.status(400).send(e);
    });

}

function getSearchProcessingTerritories(req, res) {
    /*var searchTerm = req.query.term;
    var findArr = [{ 'name': { $regex: searchTerm, $options: 'i' } }];

    if (!isNaN(searchTerm))
        findArr.push({ 'territoryNumber': { $regex: searchTerm, $options: 'i' } });

    Territory.find({ $or: findArr }).then((territories) => {
        res.send({ territories });
    }, (e) => {
        res.status(400).send(e);
    });*/
}

function updateProcessingTerritory(req, res) {
    /*var id = req.params.id;

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
    });*/
}

function setProcessingTerritorySubmitted(req, res) {
    var processingTerritoryID = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(processingTerritoryID)) {
        res.status(404).send();
    }

    ProcessingTerritory.findByIdAndUpdate(processingTerritoryID, { $set: { 'submitted': true } }).then((processingTerritory) => {
        if (!processingTerritory) {
            res.status(404).send();
        }
        res.send({
            success: true,
            processingTerritory: processingTerritory
        });
    }).catch((e) => {
        res.status(400).send();
    });
}



function deleteProcessingTerritory(req, res) {
    /*var territoryID = req.params.id;

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
    });*/
}