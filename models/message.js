/**
 * Created by Administrator on 3/27/2015.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = Schema({
    sender: {type: String, required: true},
    receiver: String,
    message: {type: String, required: true, trim: true},
    meta: {
        time: {type: Date, default: Date.now}
    },
    type: {type: String, required: true},
    roomId: {type: Schema.Types.ObjectId, ref: 'room'}
});

module.exports = mongoose.model('message', messageSchema);