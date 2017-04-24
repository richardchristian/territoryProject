var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

var ProcessingDataSchema = new mongoose.Schema({
    proclaimerID: {
        type: ObjectId,
        required: true
    },
    territoryID: {
        type: ObjectId,
        required: true,
        trim: true
    },
    from:
    {
        type: Date,
        required: true
    },
    to: {
        type: Date,
        required: true
    },
    submitted:
    {
        type: Boolean
    }
});

var ProcessingData = mongoose.model('processingdata', ProcessingDataSchema);

module.exports = { ProcessingData };