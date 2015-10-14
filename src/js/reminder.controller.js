(function () {
    'use strict'
    angular.module('pr')
        .controller('reminderControllers', ReminderController);

    ReminderController.$inject = ['$scope', 'authService', 'reminderService', '$ionicLoading'];

    function ReminderController($scope, authService, reminderService, $ionicLoading) {


        $scope.getReminders = function () {
            $ionicLoading.show();
            authService.login().then(function (loginResult) {
                reminderService.getReminders().success(function (reminders) {
                    $scope.reminders = reminders;
                    $ionicLoading.hide();
                })
            });
        }

        $scope.activate = function () {

            $scope.$on('$ionicView.enter', function () {
                $scope.getReminders();

            });
        }

        $scope.activate();
    }

} ());  