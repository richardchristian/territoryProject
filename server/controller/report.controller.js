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
    var promiseArr = [];

    promiseArr.push(
        Territory.find().sort('terrtoryNumber')
    );

    promiseArr.push(
        ProcessingData
            .find({ "submitted": false })
            .sort('from')
            .populate('territoryID')
            .populate('proclaimerID')
    );


    promiseArr.push(
        ProcessingData
            .find({
                'submitDate': {
                    $gt: moment.utc().subtract(1, 'year'),
                    $lt: moment.utc()
                }
            })
            .sort('-submitDate')
            .populate('territoryID')
            .populate('proclaimerID')
    );

    if (req.params.type !== undefined) {
        var submitDateFilterObj = getStatisticsFilter(req.params.type);
        promiseArr.push(
            ProcessingData
                .find(submitDateFilterObj)
                .sort('-submitDate')
                .populate('territoryID')
                .populate('proclaimerID')
        );
    }


    Promise.all(promiseArr).then(result => {
        var allTerritories = result[0];
        var assignedTerritories = result[1];
        var oneYearProcessed = result[2];

        var notAssignedTerritories = allTerritories.filter(item => {
            return !_.some(assignedTerritories, o => o.territoryID._id.toString() == item._id.toString());
        });

        var oneYearNotProcessed = allTerritories.filter(item => {
            return !_.some(oneYearProcessed, o => o.territoryID._id.toString() == item._id.toString());
        });
        var oneYearNotProcessedData = oneYearNotProcessed.map((item) => {
            var index = _.findIndex(assignedTerritories, o => o.territoryID._id.toString() == item._id.toString());
            if (index > -1)
                return assignedTerritories[index];
            return item;
        });

        var moreThanOneYearProcessing = assignedTerritories.filter(item => {
            return moment.utc().diff(item.from, 'years') >= 1;
        });

        var moreThanSixMonthsProcessing = assignedTerritories.filter(item => {
            if (moreThanOneYearProcessing.indexOf(item) >= 0)
                return false;
            return moment.utc().diff(item.from, 'months') >= 6;
        });

        var remindBringBack = assignedTerritories.filter(item => {
            if (moreThanOneYearProcessing.indexOf(item) >= 0)
                return false;
            if (moreThanSixMonthsProcessing.indexOf(item) >= 0)
                return false;
            return moment.utc().diff(item.from, 'months') >= 4;
        });

        var ret = {
            'targetDates': {
                'greaterOneYear': moment.utc().subtract(1, 'years'),
                'greaterSixMonths': moment.utc().subtract(6, 'months'),
                'greaterFourMonths': moment.utc().subtract(4, 'months')
            },
            'assignedTerritories': _.sortBy(assignedTerritories, (o) => parseInt(o.territoryID.territoryNumber)),
            notAssignedTerritories,
            allTerritories,
            oneYearNotProcessedData,
            'moreThanOneYearProcessing': _.sortBy(moreThanOneYearProcessing, (o) => parseInt(o.territoryID.territoryNumber)),
            'moreThanSixMonthsProcessing': _.sortBy(moreThanSixMonthsProcessing, (o) => parseInt(o.territoryID.territoryNumber)),
            'remindBringBack': _.sortBy(remindBringBack, (o) => parseInt(o.territoryID.territoryNumber))
        };

        if (result.length == 4) {
            var processedTerritories = result[3];
            var notProcessedTerritories = allTerritories.filter(item => {
                return !_.some(processedTerritories, o => o.territoryID._id.toString() == item._id.toString());
            });

            ret.processedTerritories = processedTerritories;
            ret.notProcessedTerritories = notProcessedTerritories;
        }

        res.send(ret);
    });


    function getStatisticsFilter(type) {
        var to = moment.utc();
        var from = moment.utc();
        switch (type) {
            case 'OneMonth':
                from = from.subtract(1, 'months');//.startOf('month');
                break;
            case 'SixMonths':
                from = from.subtract(6, 'months');//.startOf('month');
                break;
            case 'Year':
                from = from.subtract(1, 'year');//.startOf('month');
                break;
            case 'TwoYear':
                from = from.subtract(2, 'year');//.startOf('month');
                break;
            case 'ThreeYear':
                from = from.subtract(3, 'year');//.startOf('month');
                break;
            case 'FourYear':
                from = from.subtract(4, 'year');//.startOf('month');
                break;
            case 'FiveYear':
                from = from.subtract(5, 'year');//.startOf('month');
                break;
            case 'AllTime':
                return "";
            case 'CurrentServiceYear':
                from = moment.utc().subtract(1, 'year').month('September').startOf('month');
                to = moment.utc().month('August').endOf('month');
                break;
            case 'PreviousServiceYear':
                from = moment.utc().subtract(2, 'year').month('September').startOf('month');
                to = moment.utc().subtract(1, 'year').month('August').startOf('month');
                break;
        }

        return { 'submitDate': { $gt: from, $lt: to } };
    }
}
