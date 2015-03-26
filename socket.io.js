/**
 * Created by Administrator on 3/26/2015.
 */

var listSocketId = [];
var namespace = '/';
var roomName = 'chatRoom';
var clients = {};

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
                clients[socket.id] = data;
                console.log('greateing: ', clients);
            }
            console.log('data from client: ', socket.user);
        });

        socket.on('getListClients', function (data) {
            io.to(roomName).emit('listClients', {socketIds: listSocketId, clients: clients});
        });

        socket.on('privateMessage', function (data) {
            console.log('private message: ', data);
            //io.sockets.sockets[data.socketId].emit('privateMessage', data);

            io.to(data.socketId).emit("privateMessage", {
                socketId: data.socketId,
                mess: data.mess,
                sender: socket.user
            });
        });



        socket.on('disconnect', function(){
            listSocketId = getListSocketId(namespace, namespace);//refresh clients list

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

