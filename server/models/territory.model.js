var mongoose = require('mongoose');

var TerritorySchema = new mongoose.Schema({
    territoryNumber: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    comment: {
        type: String,
        required: false,
        trim: true
    }
});

var Territory = mongoose.model('territories', TerritorySchema);

module.exports = { Territory };