
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../../models').User;

module.exports = function () {


    passport.use(new GoogleStrategy({
        clientID: '282083537773-vkrkplj5lp6m473smvth4idngd6p3udc.apps.googleusercontent.com',
        clientSecret: 'fe0UTmhpE2eWtE71JfrjAQ9d',
        callbackURL: 'http://localhost:3000/auth/google/callback'
    },
        function (accessToken, refreshToken, profile, done) {
            console.log(profile);
            User.findOne({

                where: {
                    googleId: profile.id
                }
            }).then(function (user) {

                if (user)
                    done(null, user);

                else {
                    User.create({
                        displayName: profile.displayName,
                        googleId: profile.id

                    }).then(function (createdUser) {

                        done(null, createdUser);

                    });

                }
            });


        }));
}