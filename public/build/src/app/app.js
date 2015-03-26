angular.module( 'chat', [
  'templates-app',
  'templates-common',
  'chat.home',
  'chat.about',
  'ui.router'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.run( function run () {
})
    /**
 * Created by Administrator on 3/26/2015.
 */
.factory("socketConnector", [ "$rootScope", function($rootScope){

    var connector = {};

    connector.connect = function(baseUrl){
        baseUrl = baseUrl || '/';
        connector.socket = io.connect(baseUrl);
    };

    connector.sendMessage = function(eventName, eventData){
        connector.socket.emit(eventName, eventData);
    };

    connector.listen = function(eventName, callback){
        connector.socket.on(eventName, callback);
    };

    return connector;
}])

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){ //replace the page title when template was changed
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | chat' ;
    }
  });
})

;

