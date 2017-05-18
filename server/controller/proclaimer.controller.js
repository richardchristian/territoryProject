var mongoose = require('mongoose');

var logger = require('../logging/logger');

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
    var proclaimer = new Proclaimer({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    proclaimer.save().then((doc) => {
        logger.info('Create new Proclaimer ( ' + JSON.stringify(req.body, null, 2) + ' )');
        res.send(doc);
    }, (e) => {
        logger.error('Error createProclaimer ( ' + JSON.stringify(req.body, null, 2) + ' )');
        logger.error(JSON.stringify(e, null, 2));

        res.status(400).send(e);
    });
}

function getProclaimerById(req, res) {
    var proclaimerID = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(proclaimerID)) {
        logger.error('Error - getProclaimerById - ID is not valid ( ' + JSON.stringify(req.params, null, 2) + ' )');
        res.status(404).send();
    }

    Proclaimer.findById(proclaimerID).then((proclaimer) => {
        if (!proclaimer) {
            logger.error('Error - getProclaimerById - ID not existing ( ' + JSON.stringify(req.params, null, 2) + ' )');
            res.status(404).send();
        }
        res.send({
            success: true,
            proclaimer: proclaimer
        });
    }).catch((e) => {
        logger.error('Error - getProclaimerById ( ' + JSON.stringify(req.params, null, 2) + ' )');
        logger.error(JSON.stringify(e, null, 2));
        res.status(400).send();
    });

}

function getAllProclaimers(req, res) {
    Proclaimer.find()
        .sort({ lastName: 'asc', firstName: 'asc' }).then((proclaimers) => {
            res.send({ proclaimers });
        }, (e) => {
            logger.error('Error - getAllProclaimers');
            logger.error(JSON.stringify(e, null, 2));
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
        logger.error('Error - getSearchProclaimers ( ' + JSON.stringify(req.query, null, 2) + ')');
        logger.error(JSON.stringify(e, null, 2));
        res.status(400).send(e);
    });
}

function updateProclaimer(req, res) {
    var id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        logger.error('Error - updateProclaimer - ID is not valid ( ' + JSON.stringify(req.params, null, 2) + ' )');
        return res.status(404).send();
    }

    Proclaimer.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then((proclaimer) => {
        if (!proclaimer) {
            logger.error('Error - updateProclaimer - Proclaimer not exists ( ' + JSON.stringify(id, null, 2) + ')');
            return res.status(404).send();
        }
        logger.info('Update Proclaimer ( ' + JSON.stringify(req.body, null, 2) + ' )');

        res.send({ proclaimer });
    }).catch((e) => {
        logger.error('Error - updateProclaimer ( ' + JSON.stringify(req.body, null, 2) + ')');
        logger.error(JSON.stringify(e, null, 2));
        res.status(400).send();
    });
}

function deleteProclaimer(req, res) {
    var proclaimerID = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(proclaimerID)) {
        logger.error('Error - deleteProclaimer - ID is not valid ( ' + JSON.stringify(proclaimerID, null, 2) + ' )');
        return res.status(404).send();
    }

    Proclaimer.findByIdAndRemove(proclaimerID).then((proclaimer) => {
        if (!proclaimer) {
            logger.error('Error - updateProclaimer - proclaimer not exists ( ' + JSON.stringify(proclaimerID, null, 2) + ' )');
            return res.status(404).send();
        }
        res.send(proclaimer);
    }).catch((e) => {
        logger.error('Error - deleteProclaimer ( ' + JSON.stringify(proclaimerID, null, 2) + ')');
        logger.error(JSON.stringify(e, null, 2));
        res.status(400).send();
    });
}


