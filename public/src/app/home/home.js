/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'chat.home', [
  'ui.router',
  'plusOne',
    'ngAnimate',
    'toastr'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
})


/**
 * And of course we define a controller for our route.
 */
.controller( 'HomeCtrl', [ '$scope','$compile', 'socketConnector', '$http', 'toastr', function( $scope , $compile, socketConnector, $http, toastr) {
        $scope.socketIds = [];//list all socketId
        $scope.usersInfo = {};//
        $scope.usersInfoArr = [];
        $scope.selectedSocketId ='';//the receiver
        $scope.userInput = '';
        $scope.mainConversation = [];
        $scope.warning = '';
        $scope.myProfile= '';
        $scope.selectedClientProfile = {};
        $scope.mySocketId = '';
        $scope.loadMessages = false;
        $scope.disabledButtonSend = true;
        $scope.participants = [];
        $scope.searchParticipant = [];
        $scope.groupName = '';

        var maxOldMessages = 15;


        //get own user profile
        $http.get('/me')
            .success(function (data) {
                console.log('me: ', data);
                $scope.myProfile = data;

                socketConnector.sendMessage('greeting', data);
                //socketConnector.sendMessage('getListClients');
                $scope.mySocketId = socketConnector.socket.id;
            })
            .error();


        socketConnector.connect('http://localhost:3000/');

        socketConnector.listen('greeting', function (data) {
            console.log('receive message from server: ', data);
        });

        //socketConnector.listen('userProfile', function (data) {
        //    console.log('user profile: ', data);
        //});

        //send a message to a special client
        socketConnector.listen('privateMessage', function (data) {

            if(!$scope.usersInfo[data.senderId].conversation){
                $scope.usersInfo[data.senderId].conversation = [];
            }

            $scope.usersInfo[data.senderId].conversation.push(data);

            console.log('$scope.selectedSocketId:  ', $scope.selectedSocketId);
            console.log('data.socketId:  ', data.socketId);

            if( $scope.selectedSocketId === data.senderId){//if the message was sent from selected client then show the the conversation
                $scope.mainConversation = $scope.usersInfo[data.senderId].conversation;
            }else{
                if(!$scope.usersInfo[data.senderId].newMess){//show message bubble if sender was selected
                    $scope.usersInfo[data.senderId].newMess = 1;
                }else{
                    $scope.usersInfo[data.senderId].newMess ++;
                }
            }
            //
            //console.log('private message: ', data);
            //console.log('$scope.clients[data.socketId].conversation: ', $scope.usersInfo[data.senderId].conversation);
            //console.log('$scope.mainConversation: ', $scope.mainConversation);

            $scope.$apply();
        });

        socketConnector.listen('oldMessages', function (data) {

            var receiverFbId =  (data[0].receiver !== $scope.myProfile.facebook.id) ? data[0].receiver : data[0].sender;
            for(var i=0; i<$scope.socketIds.length; i++){
                if($scope.usersInfo[$scope.socketIds[i]].facebook.id === receiverFbId){
                    if(!$scope.usersInfo[$scope.socketIds[i]].conversation){
                        $scope.usersInfo[$scope.socketIds[i]].conversation = [];
                    }

                    for(var j=0; j<data.length; j++){
                        if(data[j].sender === $scope.myProfile.facebook.id){
                            data[j].me = true;
                        }else{
                            data[j].me = false;
                        }
                    }

                    $scope.usersInfo[$scope.socketIds[i]].conversation = data;
                    $scope.mainConversation = data;
                    console.log('$scope.socketIds[i]]: ', $scope.socketIds[i]);
                    console.log('retrieve message: ',  $scope.usersInfo[$scope.socketIds[i]].conversation);
                    $scope.$apply();
                }
            }
        });

        //get list client from server
        socketConnector.listen('listClients', function (data) {
            $scope.socketIds = [];
            $scope.socketIds = data.socketIds;
            $scope.usersInfo = data.usersInfo;

            for(var i=0; i<$scope.socketIds.length; i++){
                $scope.usersInfoArr[i] = $scope.usersInfo[$scope.socketIds[i]];
            }

            var mess = '';
            if(data.newClient.userInfo.facebook.id === $scope.myProfile.facebook.id){
                mess = 'You logged in!';
            }else{
                mess = data.newClient.userInfo.facebook.name + ' logged out!';
            }

            //var avatar = '<img alt="your avatar" src="http://graph.facebook.com/'+data.newClient.userInfo.facebook.id+'/picture?type=square">';
            var avatar = '';
            toastr.success(avatar, mess);

            console.log('list socketIds has changed: ', $scope.socketIds);
            console.log('list client has changed: ', $scope.usersInfo);
            $scope.$apply();
        });

        socketConnector.listen('updateListClients', function (data) {
            $scope.socketIds = data.socketIds;
            $scope.usersInfo = data.usersInfo;
            for(var i=0; i<$scope.socketIds.length; i++){
                $scope.usersInfoArr[i] = $scope.usersInfo[$scope.socketIds[i]];
            }

            var mess = data.clientDis.userInfo.facebook.name + ' logged out!';
            //var avatar = '<img alt="your avatar" src="http://graph.facebook.com/'+data.clientDis.userInfo.facebook.id+'/picture?type=square">';
            var avatar = '';
            toastr.info(avatar, mess);

            if(data.clientDis.socketId === $scope.selectedSocketId){
                $scope.warning = 'your friend has logged out!';
                $scope.disabledButtonSend = true;
            }
            console.log('user disconnected: ', data.clientDis);
            console.log('list socketIds has updated: ', $scope.socketIds);
            console.log('list client has updated: ', $scope.usersInfo);
            $scope.$apply();
        });


        socketConnector.listen('subcrible', function (data) {
            if(data.status === 'success'){
                console.log('the room ', data.room);
            }
        });

        socketConnector.listen('inviteToRoom', function (data) {
            console.log('receive an invite to join the room ', data.room);
            socketConnector.sendMessage('subscribe', {room: data.room});
        });


        //change selected client to send message
        $scope.changeSelectedSocketid = function (socketId) {
            //$scope.loadMessages = true;
            if(socketId === $scope.mySocketId){
                return;
            }
            $scope.warning = '';
            $scope.selectedSocketId = socketId;
            $scope.selectedClientProfile = $scope.usersInfo[socketId];
            $scope.disabledButtonSend = false;

            if(!$scope.usersInfo[socketId].conversation){
                $scope.usersInfo[socketId].conversation = [];
            }
            if($scope.usersInfo[socketId].conversation.length < maxOldMessages){ //===require the old messages
                var myFbId = $scope.myProfile.facebook.id;
                var receiverFbId = $scope.usersInfo[socketId].facebook.id;
                requestOldMessage(myFbId, receiverFbId);
                console.log('require the old messages');
            }

            $scope.mainConversation = $scope.usersInfo[socketId].conversation;
            $scope.usersInfo[socketId].newMess = 0;
            console.log('change destination: ', $scope.selectedSocketId);



        };


        //send message
        $scope.sendMessage = function () {
            $scope.warning = '';
            if($scope.selectedSocketId !== ''){
                var socketId =  $scope.selectedSocketId;
                var mess = $scope.userInput;
                if(mess === ''){
                    $scope.warning = 'the message is empty!';
                    return false;
                }

                if($scope.mySocketId!== ''){
                    if( $scope.mySocketId !== socketId){
                        $scope.userInput = '';
                        socketConnector.sendMessage('privateMessage', {
                            receiverId: socketId,
                            message: mess
                        });

                        if(!$scope.usersInfo[socketId].conversation){
                            $scope.usersInfo[socketId].conversation = [];
                        }
                        $scope.usersInfo[socketId].conversation.push({receiverId: socketId, message: mess, sender: $scope.myProfile, me: true});

                        $scope.mainConversation =  $scope.usersInfo[socketId].conversation;

                    }else // you has sent the message to yourself
                    {
                        $scope.warning = 'you can\'t send the message to yourself';
                    }
                }else{
                    $scope.warning = 'your socketId is empty!';
                }

            }
            else{
                $scope.warning = 'you don\'t specify a client to send the message';
            }
        };

        //
        $scope.onKeyDown = function ($event) {
            switch ($event.keyCode){
                case 13:
                    $scope.sendMessage();
                    break;

                default :
                    console.log('the key is undefined', $event.keyCode);
                    break;
            }
        };

        $scope.addConversationTab = function (id) {
            var id = id || '';
            var tabTemplate = '<li role="presentation">' +
                '<input type="hidden" name="tabId" value="'+ ''+'" />'+
                '<input type="hidden" name="tabId" value="'+ ''+'" />'+
                '<input type="hidden" name="tabId" value="'+ ''+'" />'+
                '<a href="#conversation">new tab</a>' +
                '</li>';

            $('#conversation-tabs ul.nav li:last').before($compile(tabTemplate)($scope));

        }

        $scope.inviteToGroup = function (room) {
            if($scope.groupName !== ''){
                //var roomRandom = Math.round(Math.random()*999999999999);
                socketConnector.sendMessage('invite', {
                    room: room,
                    participants: $scope.participants
                });
            }
            $('input[name="participants"]:checked').map(function () {
                participants.push($(this).val());
            });
            console.log(participants);
        };


        $scope.subcribleGroup = function () {
            if($scope.groupName !== ''){
                //var roomRandom = Math.round(Math.random()*999999999999);
                socketConnector.sendMessage('subcrible', {
                    room: $scope.groupName
                });
            }
        }


        var requestOldMessage = function(myFbId, receiverFbId){
                socketConnector.sendMessage('requestOldMessages', {
                    myFbId: myFbId,
                    receiverFbId: receiverFbId
                });
        };

        var notifycation = function (avatar, mess, type) {
            toastr[type](avatar, mess);
        }
}]);
