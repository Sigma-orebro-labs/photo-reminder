(function () {
    'use strict'
    angular.module('pr')
        .controller('loginController', LoginController);

    LoginController.$inject = ['$scope', 'authService'];

    function LoginController($scope, authService) {
        console.log('loginCtrl');
        $scope.login = function () {
            console.log('login');
           

        }
    }

} ());