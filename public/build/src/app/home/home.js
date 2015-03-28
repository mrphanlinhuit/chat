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
  'plusOne'
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
.controller( 'HomeCtrl', [ '$scope', 'socketConnector', '$http', function( $scope , socketConnector, $http) {
        $scope.socketIds = [];//list all socketId
        $scope.usersInfo = {};//
        $scope.selectedClient ='';//the receiver
        $scope.userInput = '';
        $scope.mainConversation = [];
        $scope.warning = '';
        $scope.myProfile= '';
        $scope.mySocketId = '';
        $scope.loadMessages = false;


        //get own user profile
        $http.get('/me')
            .success(function (data) {
                console.log('me: ', data);
                $scope.myProfile = data;

                socketConnector.sendMessage('greeting', data);
                socketConnector.sendMessage('getListClients');
                $scope.mySocketId = socketConnector.socket.id;
            })
            .error();


        socketConnector.connect('http://localhost:3000/');

        socketConnector.listen('greeting', function (data) {
            console.log('receive message from server: ', data);
        });

        socketConnector.listen('userProfile', function (data) {
            console.log('user profile: ', data);
        });

        //send a message to a special client
        socketConnector.listen('privateMessage', function (data) {

            if(!$scope.usersInfo[data.senderId].conversation){
                $scope.usersInfo[data.senderId].conversation = [];
            }

            $scope.usersInfo[data.senderId].conversation.push(data);

            console.log('$scope.selectedClient:  ', $scope.selectedClient);
            console.log('data.socketId:  ', data.socketId);

            if( $scope.selectedClient === data.senderId){//if the message was sent from selected client then show the the conversation
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

        socketConnector.listen('retrieveMessages', function (data) {
            console.log('retrieveMessages: ', data);
            var myFbId = data[0].sender;
            var receiverFbId = data[0].receiver;
            for(var i=0; i<$scope.socketIds.length; i++){
                if($scope.usersInfo[$scope.socketIds[i]].facebook.id === receiverFbId){
                    if(!$scope.usersInfo[$scope.socketIds[i]].conversation){
                        $scope.usersInfo[$scope.socketIds[i]].conversation = [];
                    }

                    for(var j=0; j<data.length; j++){
                        if(data[j].sender === $scope.myProfile.facebook.id){
                            data[j].me = true;
                        }
                    }

                    $scope.usersInfo[$scope.socketIds[i]].conversation = data;
                    $scope.mainConversation = data;
                    console.log('retrieve message: ', data);
                    $scope.$apply();
                }
            }
        });

        //get list client from server
        socketConnector.listen('listClients', function (data) {
            $scope.socketIds = [];
            $scope.socketIds = data.socketIds;
            $scope.usersInfo = data.usersInfo;
            $scope.$apply();
            console.log('list socketIds has changed: ', $scope.socketIds);
            console.log('list client has changed: ', $scope.usersInfo);
        });

        //get the old message from server
        //socketConnector.listen('oldMessage', function (data) {
        //    if($scope.usersInfo[$scope.selectedClient].facebook.id === data.receiver){//if the selected client is the receiver then show the message
        //        for(var i=0; i<data.length; i++){
        //            var tamp = {};
        //            tamp.facebook = {};
        //            tamp.facebook.id = data[i].facebookSenderId;
        //            tamp.senderId = $scope.mySocketId;
        //            tamp.sender = $scope.myProfile;
        //            tamp.message = data[i].message;
        //            data[i] = tamp;
        //        }
        //
        //        $scope.mainConversation = data;
        //        console.log('the old messages: ', data);
        //    }
        //});


        //change selected client to send message
        $scope.changeSelectedClient = function (socketId) {
            //$scope.loadMessages = true;
            if(socketId === $scope.mySocketId){
                return;
            }
            $scope.warning = '';
            $scope.selectedClient = socketId;

            if(!$scope.usersInfo[socketId].conversation){
                $scope.usersInfo[socketId].conversation = [];
            }

            $scope.mainConversation = $scope.usersInfo[socketId].conversation;
            $scope.usersInfo[socketId].newMess = 0;
            console.log('change destination: ', $scope.selectedClient);

            var myFbId = $scope.myProfile.facebook.id;
            var receiverFbId = $scope.usersInfo[socketId].facebook.id;
            requestOldMessage(myFbId, receiverFbId);

        };


        //send message
        $scope.sendMessage = function () {
            $scope.warning = '';
            if($scope.selectedClient !== ''){
                var socketId =  $scope.selectedClient;
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
                        $scope.usersInfo[socketId].conversation.push({receiverId: socketId, message: mess, sender: $scope.myProfile});

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

        var requestOldMessage = function(myFbId, receiverFbId){
                socketConnector.sendMessage('requestOldMessages', {
                    myFbId: myFbId,
                    receiverFbId: receiverFbId
                });
        };
}]);
