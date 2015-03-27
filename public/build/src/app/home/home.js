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
        $scope.clients = {};//
        $scope.selectedClient ='';//the receiver
        $scope.userInput = '';
        $scope.mainConversation = [];
        $scope.warning = '';
        $scope.profile= '';
        $scope.mySocketId = '';


        //get own user profile
        $http.get('/me')
            .success(function (data) {
                console.log('me: ', data);
                $scope.profile = data;

                socketConnector.sendMessage('greeting', data);
                socketConnector.sendMessage('getListClients');
                $scope.mySocketId = socketConnector.socket.id;
            })
            .error();


        socketConnector.connect('http://localhost:8000/');

        socketConnector.listen('greeting', function (data) {
            console.log('receive message from server: ', data);
        });

        socketConnector.listen('userProfile', function (data) {
            console.log('user profile: ', data);
        });

        //send a message to a special client
        socketConnector.listen('privateMessage', function (data) {

            if(!$scope.clients[data.senderId].conversation){
                $scope.clients[data.senderId].conversation = [];
            }

            $scope.clients[data.senderId].conversation.push(data);

            console.log('$scope.selectedClient:  ', $scope.selectedClient);
            console.log('data.socketId:  ', data.socketId);

            if( $scope.selectedClient === data.senderId){//if the message was sent from selected client then show the the conversation
                $scope.mainConversation = $scope.clients[data.senderId].conversation;
            }else{
                if(!$scope.clients[data.senderId].newMess){//show message bubble if sender was selected
                    $scope.clients[data.senderId].newMess = 1;
                }else{
                    $scope.clients[data.senderId].newMess ++;
                }
            }

            console.log('private message: ', data);
            console.log('$scope.clients[data.socketId].conversation: ', $scope.clients[data.senderId].conversation);
            console.log('$scope.mainConversation: ', $scope.mainConversation);

            $scope.$apply();
        });

        //get list client from server
        socketConnector.listen('listClients', function (data) {
            $scope.socketIds = [];
            $scope.socketIds = data.socketIds;
            $scope.clients = data.clients;
            $scope.$apply();
            console.log('list socketIds has changed: ', $scope.socketIds);
            console.log('list client has changed: ', $scope.clients);
        });

        //get the old message from server
        //socketConnector.listen('oldMessage', function (data) {
        //    if($scope.clients[$scope.selectedClient].facebook.id === data.receiver){//if the selected client is the receiver then show the message
        //        for(var i=0; i<data.length; i++){
        //            var tamp = {};
        //            tamp.facebook = {};
        //            tamp.facebook.id = data[i].facebookSenderId;
        //            tamp.senderId = $scope.mySocketId;
        //            tamp.sender = $scope.profile;
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
            if(socketId === $scope.mySocketId){
                return;
            }
            $scope.warning = '';
            $scope.selectedClient = socketId;

            if(!$scope.clients[socketId].conversation){
                $scope.clients[socketId].conversation = [];
            }

            $scope.mainConversation = $scope.clients[socketId].conversation;
            $scope.clients[socketId].newMess = 0;
            console.log('change destination: ', $scope.selectedClient);

            socketConnector.sendMessage('getOldMessage', {
                sender: $scope.profile.facebook.id,
                receiver: $scope.clients[socketId].facebook.id
            });
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

                        if(!$scope.clients[socketId].conversation){
                            $scope.clients[socketId].conversation = [];
                        }
                        $scope.clients[socketId].conversation.push({receiverId: socketId, message: mess, sender: $scope.profile});

                        $scope.mainConversation =  $scope.clients[socketId].conversation;

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
}]);
