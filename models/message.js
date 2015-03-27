/**
 * Created by Administrator on 3/27/2015.
 */

var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
    sender:{
        facebook:{
            id: String,
            name: String,
            email: String
        }
    },
    receiver:{
        facebook:{
            id: String,
            name: String,
            email: String
        }
    },
    message: String,
    meta: {
        time: Date
    }
});

module.exports = mongoose.model('message', messageSchema);