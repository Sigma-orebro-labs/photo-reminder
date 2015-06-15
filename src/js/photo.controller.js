(function () {
    'use strict'
    angular.module('pr')
        .controller('photoController', PhotoController);

    PhotoController.$inject = ['$scope', 'Camera', '$state', '$cordovaDatePicker'];

    function PhotoController($scope, Camera, $state, $cordovaDatePicker) {

        
        
        $scope.getPhoto = function () {
            Camera.getPicture().then(function (imageURI) {
                $scope.photoUri = imageURI
                $scope.getDatePicker();
            }, function (err) {
                console.err(err);
                $state.go('app.reminders');
            });
        };


        $scope.getDatePicker = function () {
              //messy 
               var options = {  
                 date: new Date(),
                 mode: 'time', // or 'time' 
                 minDate: new Date() - 10000,
                 allowOldDates: true,
                 allowFutureDates: false,
                 doneButtonLabel: 'DONE',
                 doneButtonColor: '#F2F3F4',
                 cancelButtonLabel: 'CANCEL',
                 cancelButtonColor: '#000000'
             };
                 
            document.addEventListener("deviceready", function () {
                $cordovaDatePicker.show().then(function (date) {
                    $scope.reminderDate = date;
                });
            }, false);
        };
         

        document.addEventListener("deviceready", function () {
            $scope.getPhoto();
        }, false);
    }

}());