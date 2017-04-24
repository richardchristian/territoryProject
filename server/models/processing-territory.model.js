var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

var ProcessingTerritorySchema = new mongoose.Schema({
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

var ProcessingTerritory = mongoose.model('processingTerritories', ProcessingTerritorySchema);

module.exports = { ProcessingTerritory };