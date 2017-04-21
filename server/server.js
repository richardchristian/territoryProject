require('./config/config');
/*
const _ = require('lodash');
//var express = require('express');
//var cors = require('cors');
//var bodyParser = require('body-parser');
var { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Territory } = require('./models/territory');
var { User } = require('./models/user');
var { authenticate } = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password', 'firstName', 'lastName']);

    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.send({ user, 'token': token });
    }).catch((e) => {
        console.log(e);
        res.status(400).send(e);

    });
});

app.get('/users', authenticate, (req, res) => {
    User.find().then((users) => {
        res.send({ users });
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/users/:id', authenticate, (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    User.findById(id).then((user) => {
        if (!user) {
            return res.status(404).send();
        }

        res.send({ user });
    }).catch((e) => {
        res.status(400).send();
    });
});

app.delete('/users/:id', authenticate, (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    User.findByIdAndRemove(id).then((user) => {
        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    }).catch((e) => {
        res.status(400).send();
    });
});

app.put('/users/:id', authenticate, (req, res) => {
    var id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    User.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then((territuserory) => {
        if (!user) {
            return res.status(404).send();
        }

        res.send({ user });
    }).catch((e) => {
        res.status(400).send();
    });
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(user);
});

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        user.generateAuthToken().then((token) => {
            res.send({ user, 'token': token });
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

*/


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

app.listen(3000, () => {
    console.log('Started on port 3000');
});