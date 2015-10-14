(function () {
    'use strict'
    angular.module('pr')
        .controller('photoController', PhotoController);

    PhotoController.$inject = ['$scope', 'Camera', '$state', '$cordovaDatePicker', '$window', 'reminderService', '$ionicLoading', 'Upload'];

    function PhotoController($scope, Camera, $state, $cordovaDatePicker, $window, reminderService, $ionicLoading, upload) {


        $scope.activate = function () {
            $scope.formData = {
                title: 'Photo',
                date: undefined
            };
            $scope.picFile = undefined;

            $scope.photoUri = undefined;
        }

        $scope.getPhoto = function () {

            if ($window.cordova) {
                Camera.getPicture().then(function (imageURI) {
                    $scope.photoUri = imageURI
                    $scope.getDatePicker();
                }, function (err) {
                    console.err(err);
                    $state.go('app.reminders');
                });
            }
            else {
                alert('no cordova, please use upload button instead');
            }
        };

        $scope.fileUpdated = function ($files, $event) {
            if ($files) {
                $scope.picFile = $files[0];
            }
        };

        $scope.getDatePicker = function () {
            //messy  
            console.log('getDatePicker called');

            if ($window.cordova) {
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
                
                // never triggered in web. 
                document.addEventListener("deviceready", function () {
                    $cordovaDatePicker.show().then(function (date) {
                        $scope.reminderDate = date;
                        $scope.formData.date = date;
                    });
                }, false);
            }

            else {
                $scope.noCordovaDate = true;
                $scope.formData.date = new Date();
            }
        };

        $scope.createReminder = function () {
            $ionicLoading.show();
            reminderService.createReminder($scope.formData.title, $scope.formData.date)
                .then(function (response) {
                    if (response.success) {
                        /* Created!, Lets upload the file */
                        reminderService.uploadImage(response.reminder.id, $scope.picFile).then(function (response) {
                            $ionicLoading.hide();
                            $state.go('app.reminders');

                            // reinit. 
                            $scope.activate();
                        });

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

        $scope.activate();

    }
} ());