angular.module( 'chat', [
    'luegg.directives',
      'templates-app',
      'templates-common',
      'chat.home',
      'chat.about',
      'ui.router',
    'ngAnimate',
    'toastr'

])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider, toastrConfig) {
    $urlRouterProvider.otherwise( '/home' );

    angular.extend(toastrConfig, {
        allowHtml: true,
        closeButton: false,
        closeHtml: '<button>&times;</button>',
        containerId: 'toast-container',
        extendedTimeOut: 5000,
        iconClasses: {
            error: 'toast-error',
            info: 'toast-info',
            success: 'toast-success',
            warning: 'toast-warning'
        },
        maxOpened: 0,
        messageClass: 'toast-message',
        newestOnTop: true,
        onHidden: null,
        onShown: null,
        positionClass: 'toast-top-right',
        preventDuplicates: false,
        tapToDismiss: true,
        target: 'body',
        timeOut: 5000,
        titleClass: 'toast-title',
        toastClass: 'toast'
    });
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

