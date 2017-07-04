const config = require('./config/config');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

var { mongoose } = require('./db/mongoose');

var __projectRoot = '../client/dist/';

var app = express();

//for production
//app.use(express.static(__projectRoot));

app.use(cookieParser(config.SESSION_SECRET));
app.use(bodyParser.json());
app.use(session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

var originsWhitelist = [
    'http://local.territory-ui',
    'http://localhost:4200',
    'http://territory-ui.com',
    'http://www.territory-ui.com'
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
app.use('/processing', require('./routes/processing-data.route'));
app.use('/reports', require('./routes/report.route'));

app.listen(3000, () => {
    console.log('Started on port 3000');
});