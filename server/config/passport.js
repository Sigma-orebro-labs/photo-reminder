
// load up the user model
var User = require('../models').User;

module.exports = function (passport) {
 
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function (user, done) {
        // User.findOne({
        //     where: {
        //         Id: userId
        //     }
        // }).then(function (foundUser) {
            done(null, user);
        // })


    });

    require('./passport-strategies/google.strategy')();
    
    require('./passport-strategies/local.strategy')();
};   
        