/**
 * Created by Administrator on 3/27/2015.
 */

var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
    sender: String,
    receiver: String,
    message: String,
    meta: {
        time: Date
    }
});

module.exports = mongoose.model('message', messageSchema);