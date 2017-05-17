var mongoose = require('mongoose');

var ProclaimerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true

    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    active: {
        type: Boolean,
        required: false
    }
});

var Proclaimer = mongoose.model('proclaimers', ProclaimerSchema);

module.exports = { Proclaimer };