/**
 * Created by Administrator on 3/26/2015.
 */
angular.module("chat").factory("socketConnector", [ "$rootScope", function($rootScope){
    var connector = {};

    connector.connect = function(baseUrl){
        baseUrl = baseUrl || '/';
        //connector.socket = io.connect(baseUrl);
        connector.socket = io();
    };

    connector.sendMessage = function(eventName, eventData){
        connector.socket.emit(eventName, eventData);
    };

    connector.listen = function(eventName, callback){
        connector.socket.on(eventName, callback);
    };

    return connector;
}]);