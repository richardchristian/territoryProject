var mongoose = require('mongoose');

var TerritorySchema = new mongoose.Schema({
    territoryNumber: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    }
});

var Territory = mongoose.model('Territory', TerritorySchema);

module.exports = { Territory };