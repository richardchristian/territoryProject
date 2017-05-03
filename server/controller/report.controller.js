var mongoose = require('mongoose');
var _ = require('lodash');
var moment = require('moment');

var { ProcessingData } = require('../models/processing-data.model');
var { Territory } = require('../models/territory.model');

var TerritoryCardReport = require('./report/territorycard/territorycard.report.controller');

module.exports = {
    getAllTerritoryCards,
    getTerritoryCardByID
};



function getAllTerritoryCards(req, res) {
    ProcessingData.find()
        .populate('territoryID')
        .populate('proclaimerID')
        .then((processingTerritories) => {
            var allTerritoryCards = [];
            var emptyEntry = {
                from: null,
                to: null,
                proclaimerID: {
                    firstName: "",
                    lastName: ""
                }
            };
            _.forEach(processingTerritories, (cur) => {
                var index = allTerritoryCards.map((e) => e._id).indexOf(cur.territoryID._id);
                if (index < 0) {
                    allTerritoryCards.push({
                        _id: cur.territoryID._id,
                        territoryNumber: cur.territoryID.territoryNumber,
                        name: cur.territoryID.name,
                        comment: cur.territoryID.comment,
                        entries: []
                    });
                }

                index = allTerritoryCards.map((e) => e._id).indexOf(cur.territoryID._id);
                allTerritoryCards[index].entries.push(cur);
            });

            _.forEach(allTerritoryCards, (cur) => {
                cur.entries = _.sortBy(cur.entries, ['from']).reverse().slice(0, 12);
                if (cur.entries.length < 12) {
                    var l = cur.entries.length;
                    cur.entries.length = 12;
                    cur.entries.fill(emptyEntry, l, 12);
                }
            });

            allTerritoryCards = _.sortBy(allTerritoryCards, ['territoryNumber']);

            var remaining = 10 - (allTerritoryCards.length % 10);
            if (remaining > 0)
                for (var i = 0; i < remaining; i++) {
                    allTerritoryCards.push({
                        territoryNumber: "",
                        name: "",
                        entries: new Array(12).fill(emptyEntry, 0, 12)
                    });
                }

            var text = TerritoryCardReport.getTerritoryCardHTML(allTerritoryCards);

            //res.send(allTerritoryCards);
            res.send(text);

        }, (e) => {
            res.status(400).send(e);
        });
}

function getTerritoryCardByID(req, res) {
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