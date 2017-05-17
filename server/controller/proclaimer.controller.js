
var mongoose = require('mongoose');
//var mongodb = require('mongodb');
var { Proclaimer } = require('../models/proclaimer.model');

module.exports = {
    createProclaimer,
    getProclaimerById,
    getAllProclaimers,
    getSearchProclaimers,
    updateProclaimer,
    deleteProclaimer
};

function createProclaimer(req, res) {
    console.log("create new Proclaimer: " + req.body.firstName);
    var proclaimer = new Proclaimer({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    proclaimer.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
}

function getProclaimerById(req, res) {
    var proclaimerID = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(proclaimerID)) {
        res.status(404).send();
    }

    Proclaimer.findById(proclaimerID).then((proclaimer) => {
        if (!proclaimer) {
            res.status(404).send();
        }
        res.send({
            success: true,
            proclaimer: proclaimer
        });
    }).catch((e) => {
        res.status(400).send();
    });

}

function getAllProclaimers(req, res) {
    Proclaimer.find()
        .sort({ lastName: 'asc', firstName: 'asc' }).then((proclaimers) => {
            res.send({ proclaimers });
        }, (e) => {
            res.status(400).send(e);
        });
}

function getSearchProclaimers(req, res) {
    var searchTerm = req.query.term;

    var findObj = {
        $and: [{
            $or: [
                { 'firstName': { $regex: searchTerm, $options: 'i' } },
                { 'lastName': { $regex: searchTerm, $options: 'i' } }
            ]
        }]
    };

    if (req.query.active !== undefined)
        findObj.$and.push({ 'active': req.query.active });


    Proclaimer.find(findObj).sort({ lastName: 'asc', firstName: 'asc' }).then((proclaimers) => {
        res.send({ proclaimers });
    }, (e) => {
        res.status(400).send(e);
    });
}

function updateProclaimer(req, res) {
    var id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    Proclaimer.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then((proclaimer) => {
        if (!proclaimer) {
            return res.status(404).send();
        }

        res.send({ proclaimer });
    }).catch((e) => {
        res.status(400).send();
    });
}

function deleteProclaimer(req, res) {
    var proclaimerID = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(proclaimerID)) {
        return res.status(404).send();
    }

    Proclaimer.findByIdAndRemove(proclaimerID).then((proclaimer) => {
        if (!proclaimer) {
            return res.status(404).send();
        }
        res.send(proclaimer);
    }).catch((e) => {
        res.status(400).send();
    });
}


