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

    Territory.find().then((territories) => {
        territories = _.sortBy(territories, 'territoriyNumber');

        var procData = territories.map((territory) => {
            return ProcessingData.find({ 'territoryID': territory._id })
                .sort('-from')
                .limit(12)
                .sort('from')
                .populate('proclaimerID');
        });
        Promise.all(procData).then(values => {
            values = values.filter(item => item.length > 0);

            territories = getRoundedNumTerritories(territories);

            var allTerritoryCards = territories.map((territory, id) => {
                return {
                    _id: territory._id,
                    name: territory.name,
                    territoryNumber: territory.territoryNumber,
                    entries: getTerritoryEntries(territory, values)
                };
            });

            var territoryCardReport = TerritoryCardReport.getTerritoryCardHTML(allTerritoryCards);

            res.send({
                'html': territoryCardReport.html,
                'table': territoryCardReport.table,
                'style': territoryCardReport.style
            });

            //res.send(territoryCardReport);
            /* res.send(JSON.parse({
                 'title': 'TerritoryCardReport',
                 'page': territoryCardReport
             }));*/
            /*pdf.create(territoryCardReport, config).toBuffer(function (err, buffer) {
                res.type('pdf');
                res.send(buffer);
            });*/


        });
    });
}

function getTerritoryEntries(territory, values) {
    var emptyEntry = {
        from: null,
        to: null,
        extend: null,
        submitDate: null,
        proclaimerID: {
            firstName: "",
            lastName: ""
        }
    };
    var cur_entries = _.find(values, item => item[0].territoryID.toString() == territory._id.toString()) || [];
    if (cur_entries.length < 12) {
        var l = cur_entries.length;
        cur_entries.length = 12;
        cur_entries.fill(emptyEntry, l, 12);
    }
    return cur_entries;
}

function getRoundedNumTerritories(territories) {
    var remaining = 10 - (territories.length % 10);
    if (remaining > 0)
        for (var i = 0; i < remaining; i++) {
            territories.push({
                _id: "",
                territoryNumber: "",
                name: "",
                entries: []
            });
        }
    return territories;
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