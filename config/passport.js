/**
 * Created by Administrator on 3/25/2015.
 */

// config/passport.js

// load all the things we need
var FacebookStrategy = require('passport-facebook').Strategy;


// load the auth variables
var configAuth = require('./auth')();

module.exports = function (passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    console.log('configAuth.facebookAuth.clientID,', configAuth.facebookAuth.clientID);


    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

            // pull in our app id and secret from our auth.js file
            clientID        : configAuth.facebookAuth.clientID,
            clientSecret    : configAuth.facebookAuth.clientSecret,
            callbackURL     : configAuth.facebookAuth.callbackURL

        },

        // facebook will send back the token and profile
        function(token, refreshToken, profile, done) {
            console.log('profile: ', profile);
            var avatar = 'http://graph.facebook.com/" + facebookId + "/picture?type=square';
            var user = {
                facebook:{
                    id : profile.id, // set the users facebook id
                    token : token, // we will save the token that facebook provides to the user
                    name  : profile.name.givenName + ' ' + profile.name.familyName, // look at the passport user profile to see how names are returned
                    email : profile.emails[0].value // facebook can return multiple emails so we'll take the first
                }
            }
            return done(null, user);
        }));
};