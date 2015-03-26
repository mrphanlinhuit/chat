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
        $scope.socketIds = [];
        $scope.clients = {};
        $scope.receiver ='';//the receiver
        $scope.userInput = '';
        $scope.conversation = [];
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


        socketConnector.connect('http://localhost:3000/');

        socketConnector.listen('greeting', function (data) {
            console.log('receive message from server: ', data);
        });

        socketConnector.listen('userProfile', function (data) {
            console.log('user profile: ', data);
        });

        //send a message to a special client
        socketConnector.listen('privateMessage', function (data) {
            $scope.conversation.push(data);
            console.log('private message: ', data);
            $scope.$apply();
        });

        //get list client from server
        socketConnector.listen('listClients', function (data) {
            $scope.socketIds = [];
            $scope.socketIds = data.socketIds;
            $scope.clients = data.clients;
            $scope.$apply();
            console.log('list client has changed: ', $scope.socketIds);
            console.log('list client has changed: ', $scope.clients);
        });


        //change selected client to send message
        $scope.changeReceiver = function (socketId) {
            $scope.warning = '';
            $scope.receiver = socketId;
            console.log('change destination: ', socketId);
        };


        //send message
        $scope.sendMessage = function () {
            $scope.warning = '';
            if($scope.receiver !== ''){
                var socketId =  $scope.receiver;
                var mess = $scope.userInput;
                if($scope.mySocketId!== ''){
                    if( $scope.mySocketId !== socketId){
                        $scope.userInput = '';
                        socketConnector.sendMessage('privateMessage', {
                            socketId: socketId,
                            mess: mess
                        });
                        $scope.conversation.push({
                            socketId: socketId,
                            mess: mess,
                            sender: $scope.profile
                        });
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

}]);
