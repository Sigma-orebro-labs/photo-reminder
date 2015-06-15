(function () {
    'use strict'
    angular.module('pr')
        .controller('reminderControllers', ReminderController);

    ReminderController.$inject = ['$scope'];
  
    function ReminderController($scope) {
        $scope.greeting = "Hello"; 
    }

}());  