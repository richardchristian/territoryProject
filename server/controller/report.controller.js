var mongoose = require('mongoose');
var _ = require('lodash');
var moment = require('moment');

var { ProcessingData } = require('../models/processing-data.model');
var { Territory } = require('../models/territory.model');

var TerritoryCardReport = require('./report/territorycard/territorycard.report.controller');

module.exports = {
    getAllTerritoryCards,
    getTerritoryStatistics
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
        });
    });

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
}

function getTerritoryStatistics(req, res) {
    var fromFilterObj = getStatisticsFilter(req.params.type);
    var promiseArr = [];
    promiseArr.push(
        ProcessingData
            .find({ "submitted": false })
            .sort('from')
            .populate('territoryID')
            .populate('proclaimerID')
    );

    promiseArr.push(
        ProcessingData
            .find(fromFilterObj)
            .sort('from')
            .populate('territoryID')
            .populate('proclaimerID')
    );

    promiseArr.push(
        Territory.find().sort('terrtoryNumber')
    );

    Promise.all(promiseArr).then(result => {
        var assignedTerritories = result[0];
        var processedTerritories = result[1];
        var allTerritories = result[2];

        var notAssignedTerritories = allTerritories.filter(item => {
            return !_.some(assignedTerritories, o => o.territoryID._id.toString() == item._id.toString());
        });

        var notProcessedTerritories = allTerritories.filter(item => {
            return !_.some(processedTerritories, o => o.territoryID._id.toString() == item._id.toString());
        });

        res.send(notProcessedTerritories);
    });


    function getStatisticsFilter(type) {
        var to = moment();
        var from = moment();
        switch (type) {
            case 'OneMonth':
                from = from.subtract(1, 'months').startOf('month');
                break;
            case 'SixMonths':
                from = from.subtract(6, 'months').startOf('month');
                break;
            case 'Year':
                from = from.subtract(1, 'years').startOf('month');
                break;
            case 'TwoYear':
                from = from.subtract(2, 'years').startOf('month');
                break;
            case 'ThreeYear':
                from = from.subtract(3, 'years').startOf('month');
                break;
            case 'FourYear':
                from = from.subtract(4, 'years').startOf('month');
                break;
            case 'FiveYear':
                from = from.subtract(5, 'years').startOf('month');
                break;
            case 'AllTime':
                return "";
            case 'CurrentServiceYear':
                from = moment().subtract('year', 1).month('September').startOf('month');
                to = moment().month('August').endOf('month');
                break;
            case 'PreviousServiceYear':
                from = moment().subtract('year', 2).month('September').startOf('month');
                to = moment().subtract('year', 1).month('August').startOf('month');
                break;
        }

        return { "from": { $gt: from.toDate(), $lt: to.toDate() } };
    }
}
