/**
 * Created by Administrator on 3/25/2015.
 */

// config/passport.js

// load all the things we need
var FacebookStrategy = require('passport-facebook').Strategy;


// load the auth variables
var configAuth = require('./auth');

module.exports = function (passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

            // pull in our app id and secret from our auth.js file
            clientID        : '772028739505122',
            clientSecret    : "683176ca1e0ab021423b64d24546159f",
            callbackURL     : '/auth/facebook/callback'

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