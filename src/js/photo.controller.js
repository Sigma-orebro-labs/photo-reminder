(function () {
    'use strict'
    angular.module('pr')
        .controller('photoController', PhotoController);

    PhotoController.$inject = ['$scope', 'Camera', '$state', '$cordovaDatePicker', '$window', 'reminderService', '$ionicLoading', 'Upload'];

    function PhotoController($scope, Camera, $state, $cordovaDatePicker, $window, reminderService, $ionicLoading, upload) {

        $scope.getPhoto = function () {
            Camera.getPicture().then(function (imageURI) {
                $scope.photoUri = imageURI
                $scope.getDatePicker();
            }, function (err) {
                console.err(err);
                $state.go('app.reminders');
            });
        };

        $scope.fileUpdated = function ($files, $event) {
            if ($files) {
                $scope.picFile = $files[0];
            }
        };

        $scope.getDatePicker = function () {
            //messy  
            var options = {
                date: new Date(),
                mode: 'time', // or 'time' 
                minDate: new Date() - 10000,
                allowOldDates: false,
                allowFutureDates: true,
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

        $scope.createReminder = function () {
            $ionicLoading.show();
            reminderService.createReminder($scope.title, new Date())
                .then(function (response) {
                    if (response.success) {
                        /* Created!, Lets upload the file */
                        reminderService.uploadImage(response.reminder.id, $scope.picFile).then(function (response) {
                            $state.go('app.reminders');
                        }); 
                        $ionicLoading.hide(); 
                    }
                },
                    function (err) {
                        console.log(err);
                        $ionicLoading.hide();
                    });
        };

        document.addEventListener("deviceready", function () {
            $scope.getPhoto();
        }, false);

    }
} ());