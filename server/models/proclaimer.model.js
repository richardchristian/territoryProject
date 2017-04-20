var mongoose = require('mongoose');

var ProclaimerSchema = new mongoose.Schema({
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

var Proclaimer = mongoose.model('Proclaimer', TerritorySchema);

module.exports = { Proclaimer };