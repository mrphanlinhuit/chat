/**
 * Created by Administrator on 3/26/2015.
 */
angular.module( 'chat.chat', [
    'ui.router',
    'placeholders',
    'ui.bootstrap'
])

    .config(function config( $stateProvider ) {
        $stateProvider.state( 'chat', {
            url: '/chat',
            views: {
                "main": {
                    controller: 'chatCtrl',
                    templateUrl: 'chat/chat.tpl.html'
                }
            },
            data:{ pageTitle: 'chat' }
        });
    })

    .controller( 'chatCtrl', function AboutCtrl( $scope ) {
        // This is simple a demo for UI Boostrap.
        $scope.dropdownDemoItems = [
            "The first choice!",
            "And another choice for you.",
            "but wait! A third!"
        ];
    })

;
