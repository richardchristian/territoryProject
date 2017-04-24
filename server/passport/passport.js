var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app, User) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(User.createStrategy());
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
};

