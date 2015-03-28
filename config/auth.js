/**
 * Created by Administrator on 3/25/2015.
 */
// config/auth.js

// expose our config directly to our application using module.exports
module.exports = function(){
    if(process.env.NODE_ENV === "production"){
        return {
            'facebookAuth' : {
                'clientID' 		: '932829893415484', // your App ID
                'clientSecret' 	: '1b73b6628241be6b0ef8ea640eddd444', // your App Secret
                'callbackURL' 	: '/auth/facebook/callback'
            }
        }
    }
    else {
        return {
            'facebookAuth' : {
                'clientID' 		: '449462465202216', // your App ID
                'clientSecret' 	: '614528863794f67acae921d2c57ee4f0', // your App Secret
                'callbackURL' 	: '/auth/facebook/callback'
            }
        }
    }

};