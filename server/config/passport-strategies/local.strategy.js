
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models').User;

module.exports = function () {

  passport.use('local', new LocalStrategy(
    function (username, password, done) {
      User.findOne({
        where: { email: username }
      }).then(function (user, err) {
        if (err) {
          console.log(err);
          return done(err);
        }
        
        if (!user) {
          return done(null, false);
        }
        if (!user.verifyPassword(password)) {
          return done(null, false);
        }
        return done(null, user);
      });
    }));
} 