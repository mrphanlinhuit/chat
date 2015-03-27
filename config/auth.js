/**
 * Created by Administrator on 3/25/2015.
 */
// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID' 		: '772028739505122', // your App ID
        'clientSecret' 	: '683176ca1e0ab021423b64d24546159f', // your App Secret
        'callbackURL' 	: '/auth/facebook/callback'
    }

};