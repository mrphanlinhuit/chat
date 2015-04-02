/**
 * Created by Administrator on 3/26/2015.
 */

//load the things we need
var messModel = require('./models/message');
var roomModel = require('./models/room');
var ObjectId = require('mongoose').Types.ObjectId;

var socketIds = [];
var namespace = '/';
var roomName = 'chatRoom';
var usersInfo = {};//user's facebook profile
var limitMessPerOneLoad = 20;
var rooms = {};//each room has the room owner, the participants' facebook id,

module.exports = function (io, passport) {


    io.on('connection', function(socket){
        console.log('a user connected: ', socket.id);
        socket.join(roomName);
        socketIds = getListSocketId(namespace, roomName);//update clients list

        socket.emit('greeting', 'welcome to web chat');

        socket.on('greeting', function (data) {
            if(!socket.user){
                data.socketId = socket.id;
                socket.user = data;
                usersInfo[socket.id] = data; //store user's facebook profile
                //console.log('greateing: ', clients);
            }
            var userInfo = usersInfo[socket.id];
            io.to(roomName).emit('listClients', {socketIds: socketIds, usersInfo: usersInfo, newClient: {socketId: socket.id, userInfo: userInfo}});// send clients list to all clients in room
            getGroupsList(socket.user.facebook.id, function (err, docs) {
                if(err){
                    console.log('error when trying get group list: ', err);
                    return ;
                }
                socket.emit('listRooms',  docs);
                console.log('list room: ', docs);
            });
            console.log('data from client: ', usersInfo);
        });
        //
        //socket.on('getListClients', function (data) {
        //
        //});

        socket.on('privateMessage', function (data) {
            console.log('private message: ', data);
            io.to(data.receiverId).emit("privateMessage", {
                receiver: data.receiverId,
                senderId: socket.id,
                message: data.message,
                sender: socket.user
            });
            var fbSender = socket.user.facebook.id;
            var fbReceiver = usersInfo[data.receiverId].facebook.id;
            var type = 'pm'
            storeMessage(fbSender, fbReceiver, type, data.message);
        });

        socket.on('sendToRoom', function (data) {

          socket.broadcast.to(data.room).emit('sendFromRoom', {
                room: data.room,
                senderId: socket.id,
                message: data.message,
                sender: socket.user
            });
            var fbSender = socket.user.facebook.id;
            var room = data.room;
            var type = 'group';
            storeMessage(fbSender, room, type, data.message);
        });

        socket.on('requestOldMessages', function (data) {
            retrieveMessage(data.myFbId, data.receiverFbId, function (err, data) {
                if(err){
                    console.log('there was an err when the server was trying to fetch data from DB server');
                    return ;
                }
                console.log('old messages: ', data);
                socket.emit('oldMessages', data);
            });
        });

        socket.on('requestOldMessagesRoom', function (data) {
            roomModel.find()
                .limit(1)
                .where({name: data.room})
                .exec(function (err, doc) {
                    if(err) {
                        console.log('err: ', err);
                        return;
                    }
                    if(doc.length > 0){
                        messModel.find()
                            .where({roomId: doc[0]._id})
                            .exec(function (err, docs) {
                                if(err){
                                    console.log('err: ', err);
                                    return;
                                }
                                socket.emit('oldMessagesRoom', {room: data.room, docs: docs});
                            });
                    }
                })
        });



        socket.on('disconnect', function(){
            socketIds = getListSocketId(namespace, roomName);//refresh clients list
            var userInfo = usersInfo[socket.id];
            delete usersInfo[socket.id];
            io.to(roomName).emit('updateListClients', {socketIds: socketIds, usersInfo: usersInfo, clientDis: {socketId: socket.id, userInfo: userInfo}});//update clients list
            console.log('user disconnected: ', socket.user);
            console.log('users info: ', usersInfo);
        });

        socket.on('subscribe', function(data) {
            roomModel.find({})
                .where({name: data.room})
                .limit(1)
                .exec(function (err, doc) {
                    if(err){
                        console.log('error connection: ', err);
                        return;
                    }
                    if(doc.length !== 0){
                        socket.emit('subscribe', {
                            status: 'fail',
                            mess: 'the room exists'
                        });
                        console.log('the room exists: ', doc);
                        return;
                    }else{

                        var newRoom = new roomModel();
                        newRoom.name = data.room;
                        newRoom.participants = [socket.user.facebook.id];
                        newRoom.save(function (err, doc) {
                            if(err){
                                console.log('there was an error when was trying to connect the DB server');
                                return
                            }
                            socket.join(data.room, function (err) {
                                if(err) {
                                    console.log('there was an error when trying to join the room', data.name);
                                    socket.emit('subscribe', {
                                        status: 'error',
                                        room: data.room,
                                        error: err
                                    });
                                }
                                socket.emit('subscribe', {
                                    status: 'success',
                                    room: data.room,
                                    participants: getListSocketId(namespace, data.room)
                                });
                                rooms[data.room] = {};
                                rooms[data.room].owner = socket.id;

                                console.log('joining room', data.room);
                                console.log('client in room: ', getListSocketId(namespace, data.room));
                                console.log('rooms: ', socket.rooms);
                                console.log('room: ', getListSocketId(namespace, 'chatRoom'));
                            });
                        });
                    }
                });
        });

        socket.on('inviteToRoom', function (data) {
            for(var i=0; i<data.participants.length; i++){
                io.to(data.participants[i]).emit('inviteToRoom', {
                    room: data.room
                });
            }
            console.log('inviteToRoom: ', data);
        });

        socket.on('joinRoom', function (data) {
            if(typeof data === 'undefined' || typeof data.room === 'undefined' ||data.room === ''){
                return;
            }

            roomModel.findOne()
                .where({name: data.room})
                .limit(1)
                .exec(function (err, doc) {
                    if (err) {
                        console.log('error connection: ', err);
                        return;
                    }
                    if (doc.length !== 0) {
                        console.log('the room exists: ', doc);

                        doc.participants.push(socket.user.facebook.id);
                        doc.save(function (err) {
                            if(err){
                                console.log('there was an error when was trying to connect the DB server');
                            }
                            socket.join(data.room, function (err) {
                                if(err) {
                                    console.log('there was an error when trying to join the room', data.name);
                                }else{
                                    var sockedIdsList = getListSocketId(namespace, data.room);
                                    socket.emit('joinRoom', {
                                        status: 'success',
                                        room: data.room,
                                        participants: sockedIdsList
                                    });


                                    updateRoom(io, data.room, sockedIdsList);
                                    console.log('update room: ', sockedIdsList);


                                    if(typeof rooms[data.room].participants === 'undefined'){
                                        rooms[data.room].participants = [];
                                    }
                                    rooms[data.room].participants.push(socket.id);//add participant's socket id to the room
                                }
                            });
                        });

                    } else {
                        console.log('the room not exist');
                    }
                });
        });

        socket.on('test', function (data) {
            var sockedIdsList = getListSocketId(namespace, data.room);
            console.log('test: ', sockedIdsList);
        })


        //socket.on('error', function (err) {
        //    console.error('socket error: ',err.stack);
        //});



        });



    //get all clients in the room
    function getListSocketId(namespace, roomName) {
        var socketIds = [];
        for (var socketId in io.nsps[namespace].adapter.rooms[roomName]) {
            socketIds.push(socketId);
        }
        return socketIds;
    }
};

var updateRoom = function (io, room, socketIds) {
    io.to(room).emit('updateRoom', {
        room: room,
        participants: socketIds
        //facebookIds: facebookIds
    });
}

//==
var storeMessage = function (sender, receiver, type, mess) {
    var newMess = messModel();
    newMess.sender = sender;
    newMess.type = type;


    if(type === 'group'){
        var room = receiver;
        roomModel.findOne()
            .limit(1)
            .where({name: room})
            .exec(function (err, doc) {
                    if(err){
                        console.log('there is an error: ', err);
                        return;
                    }
                if(doc){
                    newMess.roomId = doc._id;
                    newMess.save(function (err, doc) {
                        if(err){
                            console.log('there is an error: ', err);
                            return;
                        }
                        console.log('the message saved!', doc);
                    });
                }else{
                    console.log('the room doesn\'t exist');
                }

            });


    }else{
        newMess.receiver = receiver;
        newMess.save(function (err, doc) {
            if(err){
                console.log('there is an error: ', err);
                return;
            }
            console.log('the message saved: ', doc);
        });

    }





    newMess.message = mess;
    //newMess.meta.time = new Date();

    newMess.save(function (err, data) {
        if(err) {
            console.log('there was an err when the server was trying to save data');
            return ;
        }

        console.log('the message has store on the BD server');
    });
};

var retrieveMessage = function (sender, receiver, cb) {

    messModel.find()
        .where({
            $or: [{sender: sender, receiver: receiver},
                {sender: receiver, receiver: sender}]
        })
        .limit(limitMessPerOneLoad)
        .sort({'meta.time': 'asc'})
        .exec(function (err, data) {
            cb(err, data);
        });
};

var getGroupsList = function (fbId, cb) {
    var room = [];
    console.log('facebook id: ', fbId);

    roomModel.find()
        .select('_id name participants')
        .where({participants: fbId})
        .exec(function (err, docs) {
            cb(err, docs);
        });


    return {
        room: room
    }
}