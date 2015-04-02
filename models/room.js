/**
 * Created by Administrator on 4/2/2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var room = Schema({
    name: {type: String, required: true},
    participants: [{type: String, default: ''}]
});

module.exports = mongoose.model('room', room);