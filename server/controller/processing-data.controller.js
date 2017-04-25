
var mongoose = require('mongoose');
var _ = require('lodash');
var moment = require('moment');
var { ProcessingData } = require('../models/processing-data.model');

var { Territory } = require('../models/territory.model');

module.exports = {
    addProcessingData,
    getProcessingDataById,
    getAllProcessingData,
    getAllProcessingTerritories,
    getAllNonProcessingTerritories,
    getSearchNonProcessingTerritories,
    getSearchProcessingTerritories,
    getSearchProcessingData,
    updateProcessingData,
    setProcessingDataSubmitted,
    deleteProcessingData
};

function addProcessingData(req, res) {
    console.log("add new processing Territory Entry");

    var processingData = new ProcessingData({
        proclaimerID: req.body.proclaimerID,
        territoryID: req.body.territoryID,
        from: new Date(req.body.from),
        to: new Date(req.body.to),
        submitted: req.body.submitted
    });

    processingData.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
}

function getProcessingDataById(req, res) {
    var processingDataID = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(processingDataID)) {
        res.status(404).send();
    }

    ProcessingData.findById(processingDataID).then((processingTerritory) => {
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

function getAllProcessingData(req, res) {
    ProcessingData.find().then((processingTerritories) => {
        res.send({ processingTerritories });
    }, (e) => {
        res.status(400).send(e);
    });
}

function getAllNonProcessingTerritories(req, res) {
    ProcessingData.find({ submitted: false }, 'territoryID -_id').then(processingTerritories => {
        var processingArr = _.map(processingTerritories, 'territoryID');
        Territory.find({ _id: { $nin: processingArr } }).then(territories => {
            res.send({ territories });
        }, (e) => {
            res.status(400).send(e);
        });
    }, (e) => {
        res.status(400).send(e);
    });

}

function getAllProcessingTerritories(req, res) {
    ProcessingData.find({ submitted: false }, 'territoryID -_id').then(processingTerritories => {
        var processingArr = _.map(processingTerritories, 'territoryID');
        Territory.find({ _id: { $in: processingArr } }).then(territories => {
            res.send({ territories: territories });
        }, (e) => {
            res.status(400).send(e);
        });
    }, (e) => {
        res.status(400).send(e);
    });

}

function getSearchNonProcessingTerritories(req, res) {
    var searchTerm = req.query.term;
    var findArr = [{ 'name': { $regex: searchTerm, $options: 'i' } }];

    if (!isNaN(searchTerm))
        findArr.push({ 'territoryNumber': { $regex: searchTerm, $options: 'i' } });

    ProcessingData.find({ submitted: false }, 'territoryID -_id').then(processingTerritories => {
        var processingArr = _.map(processingTerritories, 'territoryID');
        Territory.find({
            $and: [
                { _id: { $nin: processingArr } },
                { $or: findArr }
            ]
        }).then(territories => {
            res.send({ territories });
        }, (e) => {
            res.status(400).send(e);
        });
    }, (e) => {
        res.status(400).send(e);
    });

}

function getSearchProcessingTerritories(req, res) {
    var searchTerm = req.query.term;
    var findArr = [{ 'name': { $regex: searchTerm, $options: 'i' } }];

    if (!isNaN(searchTerm))
        findArr.push({ 'territoryNumber': { $regex: searchTerm, $options: 'i' } });

    ProcessingData.find({ submitted: false }, 'territoryID -_id').then(processingTerritories => {
        var processingArr = _.map(processingTerritories, 'territoryID');
        Territory.find({
            $and: [
                { _id: { $in: processingArr } },
                { $or: findArr }
            ]
        }).then(territories => {
            res.send({ territories });
        }, (e) => {
            res.status(400).send(e);
        });
    }, (e) => {
        res.status(400).send(e);
    });
}

function getSearchProcessingData(req, res) {
    var searchTerm = req.query.term;

    ProcessingData.find({ submitted: false })
        .populate('territoryID')
        .populate('proclaimerID')
        .then(processingTerritories => {
            var processingData = getSearchResult(processingTerritories, searchTerm);
            res.send({ processingData });
        }, (e) => {
            res.status(400).send(e);
        });
}

function getSearchResult(data, searchTerm) {
    return _.filter(data, entry => {

        var from = moment(entry.from).format('DD.MM.YYYY');
        var to = moment(entry.to).format('DD.MM.YYYY');

        var pattern = new RegExp(searchTerm, 'i');
        if (pattern.test(entry.proclaimerID.firstName))
            return true;
        if (pattern.test(entry.proclaimerID.lastName))
            return true;
        if (pattern.test(entry.territoryID.territoryNumber))
            return true;
        if (pattern.test(entry.territoryID.name))
            return true;
        if (pattern.test(from))
            return true;
        if (pattern.test(to))
            return true;

        return false;
    });
}

function updateProcessingData(req, res) {
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

function setProcessingDataSubmitted(req, res) {
    var processingTerritoryID = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(processingTerritoryID)) {
        res.status(404).send();
    }

    ProcessingData.findByIdAndUpdate(processingTerritoryID, { $set: { 'submitted': true } }).then((processingTerritory) => {
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



function deleteProcessingData(req, res) {
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