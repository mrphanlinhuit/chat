/**
 * Created by Administrator on 3/26/2015.
 */

//load the things we need
var messModel = require('./models/message');

var listSocketId = [];
var namespace = '/';
var roomName = 'chatRoom';
var clients = {};//user's facebook profile
var limitMessPerOneLoad = 20;

module.exports = function (io, passport) {


    io.on('connection', function(socket){
        console.log('a user connected: ', socket.id);
        socket.join(roomName);
        listSocketId = getListSocketId(namespace, roomName);//update clients list

        socket.emit('greeting', 'welcome to web chat');

        socket.on('greeting', function (data) {
            if(!socket.user){
                data.socketId = socket.id;
                socket.user = data;
                clients[socket.id] = data; //store user's facebook profile
                //console.log('greateing: ', clients);
            }
            console.log('data from client: ', socket.user);
        });

        socket.on('getListClients', function (data) {
            io.to(roomName).emit('listClients', {socketIds: listSocketId, clients: clients});
        });

        socket.on('privateMessage', function (data) {
            console.log('private message: ', data);
            io.to(data.receiverId).emit("privateMessage", {
                receiver: data.receiverId,
                senderId: socket.id,
                message: data.message,
                sender: socket.user
            });
            var sender = socket;
            storeMessage(sender, data);
        });

        socket.on('getOldMessage', function (data) {
            retrieveMessage(data.sender, data.receiver, function (err, data) {
                if(err){
                    console.log('there was an err when the server was trying to fetch data from DB server');
                    return ;
                }
                console.log('old messages: ', data);
                socket.emit('oldMessage', data);
            });
        });



        socket.on('disconnect', function(){
            listSocketId = getListSocketId(namespace, namespace);//refresh clients list
            io.to(roomName).emit('listClients', {socketIds: listSocketId, clients: clients});
            console.log('user disconnected: ', socket);
        });
    });

    //get all clients in the room
    function getListSocketId(namespace, roomName) {
        var listSocketId = [];
        for (var socketId in io.nsps[namespace].adapter.rooms[roomName]) {
            listSocketId.push(socketId);
        }
        return listSocketId;
    }
}

//==
var storeMessage = function (sender, data) {
    //var newMess = messModel();
    //newMess.sender.facebook.id = 'linh';
    //newMess.sender.facebook.name = 'linh';
    //newMess.sender.facebook.email = 'linh';
    //
    //newMess.receiver.facebook.id =  clients[data.receiverId].user.facebook.id;
    //newMess.receiver.facebook.name = clients[data.receiverId].user.facebook.name;
    //newMess.receiver.facebook.email = clients[data.receiverId].user.facebook.email;


    newMess.message = data.message;
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

    messModel.find({sender: sender, receiver: receiver})
        .limit(limitMessPerOneLoad)
        .exec(function (err, data) {
            cb(err, data);
        });
}

