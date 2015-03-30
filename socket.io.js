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
            console.log('data from client: ', socket.user);
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

