
var mongoose = require('mongoose');
var _ = require('lodash');
var moment = require('moment');
var { ProcessingData } = require('../models/processing-data.model');
var { Territory } = require('../models/territory.model');
var { Proclaimer } = require('../models/proclaimer.model');

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
    deleteProcessingData,
    importData
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
    ProcessingData.find()
        .sort({ territoryNumber: 'asc', lastName: 'asc', firstName: 'asc' })
        .then((processingTerritories) => {
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
    var sortTerm = req.query.sort || 'territoryID.territoryNumber';
    var direction = req.query.direction || 'asc';
    var sort;
    if (sortTerm === 'percentage') {
        sort = (data) => {
            var _from = moment.utc(data.from);
            var _to = moment.utc(data.to);
            var _now = moment.utc();
            return Math.round((_now.diff(_from) / _to.diff(_from)) * 100);
        };
    } else if (sortTerm === 'territoryID.territoryNumber') {
        sort = (data) => {
            return parseInt(data.territoryID.territoryNumber);
        };
    } else {
        sort = sortTerm.split(",");
    }

    ProcessingData.find({ submitted: false })
        .populate('territoryID')
        .populate('proclaimerID')
        .then(processingTerritories => {
            var processingData = _.sortBy(getSearchResult(processingTerritories, searchTerm), sort);
            processingData = direction == 'asc' ? processingData : processingData.reverse();
            res.send({ processingData });
        }, (e) => {
            res.status(400).send(e);
        });
}

function getSearchResult(data, searchTerm) {
    return _.filter(data, entry => {
        var from = moment.utc(entry.from).format('DD.MM.YYYY');
        var to = moment.utc(entry.to).format('DD.MM.YYYY');

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
    var id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    ProcessingData.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then((territory) => {
        if (!territory) {
            return res.status(404).send();
        }

        res.send({ territory });
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

function importData(req, res) {
    var data = require('../db/processing-data_db_insert.json');
    var promiseArr = [];
    promiseArr.push(Territory.find());
    promiseArr.push(Proclaimer.find());

    Promise.all(promiseArr).then(values => {

        var importArr = data.map(obj => {
            var proclaimerId;
            var territoryId;
            for (var i = 0; i < values[0].length; i++) {
                if (values[0][i].territoryNumber == obj.territoryNumber)
                    territoryId = values[0][i]._id;
            }

            var name = obj.proclaimer.split(' ');
            for (var j = 0; j < values[1].length; j++) {
                if (values[1][j].lastName.toLowerCase() == name[0].toLowerCase()) {
                    if (values[1][j].firstName.toLowerCase() == name[1].toLowerCase())
                        proclaimerId = values[1][j]._id;
                }
            }
            if (!proclaimerId)
                console.log(obj.proclaimer);

            return {
                'proclaimerID': proclaimerId,
                'territoryID': territoryId,
                'from': moment.utc(obj.from, 'DD.MM.YYYY').toDate(),
                'to': moment.utc(obj.to, 'DD.MM.YYYY').toDate(),
                'submitted': obj.submitted,
                'extend': obj.extend !== null ? moment.utc(obj.extend, 'DD.MM.YYYY').toDate() : null,
                'submitDate': obj.submitDate !== null ? moment.utc(obj.submitDate, 'DD.MM.YYYY').toDate() : null
            };
        });
        //res.send(importArr);

        ProcessingData.insertMany(importArr).then(result => {
            res.send(result);
        });
    });

}