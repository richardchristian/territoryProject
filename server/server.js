const config = require('./config/config');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

var { mongoose } = require('./db/mongoose');

var app = express();

app.use(cookieParser(config.SESSION_SECRET));
app.use(bodyParser.json());
app.use(session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
var originsWhitelist = [
    'http://localhost:4200'
];
var corsOptions = {
    origin: function (origin, callback) {
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials: true
};

app.use(cors(corsOptions));

var User = require('./models/user.model');
var auth = require('./passport/passport')(app, User);

app.use('', require('./routes/common.route'));
app.use('/users', require('./routes/user.route'));
app.use('/proclaimers', require('./routes/proclaimer.route'));
app.use('/territories', require('./routes/territory.route'));
app.use('/processing', require('./routes/processing-territory.route'));

app.listen(3000, () => {
    console.log('Started on port 3000');
});