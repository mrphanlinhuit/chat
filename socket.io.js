/**
 * Created by Administrator on 3/26/2015.
 */

//load the things we need
var messModel = require('./models/message');

var socketIds = [];
var namespace = '/';
var roomName = 'chatRoom';
var usersInfo = {};//user's facebook profile
var limitMessPerOneLoad = 20;
var rooms = {};

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
            storeMessage(fbSender, fbReceiver, data.message);
        });

        socket.on('sendToRoom', function (data) {
            //io.to(data.room).emit('sendFromRoom', {
            //    room: data.room,
            //    senderId: socket.id,
            //    message: data.message,
            //    sender: socket.user
            //});

          socket.broadcast.to(data.room).emit('sendFromRoom', {
                room: data.room,
                senderId: socket.id,
                message: data.message,
                sender: socket.user
            });
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



        socket.on('disconnect', function(){
            socketIds = getListSocketId(namespace, roomName);//refresh clients list
            var userInfo = usersInfo[socket.id];
            delete usersInfo[socket.id];
            io.to(roomName).emit('updateListClients', {socketIds: socketIds, usersInfo: usersInfo, clientDis: {socketId: socket.id, userInfo: userInfo}});//update clients list
            console.log('user disconnected: ', socket.user);
            console.log('users info: ', usersInfo);
        });

        socket.on('subscribe', function(data) {
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

        socket.on('inviteToRoom', function (data) {
            for(var i=0; i<data.participants.length; i++){
                io.to(data.participants[i]).emit('inviteToRoom', {
                    room: data.room
                });
            }
            console.log('inviteToRoom: ', data);
        });

        socket.on('joinRoom', function (data) {
            var sockedIdsList = getListSocketId(namespace, data.room)
            socket.join(data.room, function (err) {
                if(err) {
                    console.log('there was an error when trying to join the room', data.name);
                }
            });
            socket.emit('joinRoom', {
                status: 'success',
                room: data.room,
                participants: sockedIdsList
            });

            io.to(data.room).emit('updateRoom', {
                room: data.room,
                participants: sockedIdsList
            });
        });






    });



    //get all clients in the room
    function getListSocketId(namespace, roomName) {
        var socketIds = [];
        for (var socketId in io.nsps[namespace].adapter.rooms[roomName]) {
            socketIds.push(socketId);
        }
        return socketIds;
    }
}

//==
var storeMessage = function (fbSender, fbReceiver, mess) {
    var newMess = messModel();
    newMess.sender = fbSender;
    newMess.receiver = fbReceiver;


    newMess.message = mess;
    newMess.meta.time = new Date();

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

