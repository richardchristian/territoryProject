const mongoose = require('mongoose');
const config = require('../config/config');

mongoose.Promise = global.Promise;
mongoose.connect(config.MONGODB_URI, {
    useMongoClient: true
});

module.export = { mongoose };