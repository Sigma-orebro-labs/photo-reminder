// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js 
angular.module('pr', ['ionic', 'ngCordova', 'ngFileUpload'])
    .constant("serverUrls", { api: 'http://localhost:3000' })
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required 
                StatusBar.styleLightContent();
            }
        });
    })
    .config(function ($stateProvider, $urlRouterProvider) {
        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider
        // setup an abstract state for the tabs directive
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })
            .state('app.photo', {
                url: "/photo",
                views: {
                    'tab-photo': {
                        templateUrl: 'templates/photo.html',
                        controller: 'photoController'
                    }
                }
            })
            .state('app.reminders', {
                url: "/reminders",
                views: {
                    'tab-reminders': {
                        templateUrl: 'templates/reminders.html',
                        controller: 'reminderControllers'
                    }
                }
            });

        // Each tab has its own nav history stack:


        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/reminders');

    })
    .config(function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    });;
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
        
        $scope.archive = function(){
            
            
        }

        $scope.activate = function () {

            $scope.$on('$ionicView.enter', function () {
                $scope.getReminders();

            });
        }

        $scope.activate();
    }

} ());  
(function(){
    'use strict'; 
    angular.module('pr')
        .controller('reminderListController', ReminderListController); 
    
    ReminderListController.$inject = ['$scope'];
    
    function ReminderListController ($scope) {
        
    }

}()); 
(function () {
    'use strict'

    angular.module('pr').factory('authService', ['$q', '$http', 'serverUrls', function ($q, $http, serverUrls) {
		var service = {};
        service.user = null;

		service.checkAuth = function () {

		};

		service.login = function () {
			return $http.post(serverUrls.api + '/auth/local', {
				username: 'anders.rydman@gmail.com',
				password: 'Sigma2015'
			});
		}

		return service;
	}]);
} ());
(function () {
    'use strict'

    angular.module('pr').factory('Camera', ['$q', function ($q) {

        return {
            getPicture: function (options) {
                var q = $q.defer();

                navigator.camera.getPicture(function (result) {
                    // Do any magic you need
                    q.resolve(result);
                }, function (err) {
                    q.reject(err);
                }, options);

                return q.promise;
            }
        }
    }]);
} ());

(function () {
    'use strict'

    angular.module('pr')
        .factory('reminderService', ReminderService);

    ReminderService.$inject = ['$q', '$http', 'serverUrls', 'Upload'];


    function ReminderService($q, $http, serverUrls, upload) {
        var service = {};
        service.getReminders = function () {
            return $http.get(serverUrls.api + "/reminder/get");
        }

        service.createReminder = function (title, date) {
            var dfd = $q.defer();

            $http.post(serverUrls.api + "/reminder/create", {
                title: title,
                date: date

            }).success(function (result) {
                if (result) {
                    dfd.resolve(result);
                }
            }).error(function (err) {
                dfd.reject(err);
            });
            return dfd.promise;
        }

        service.uploadImage = function (reminderId, file) {
            var dfd = $q.defer();

            //WORK IN PROGRESS
            upload.upload({
                url: serverUrls.api + "/reminder/uploadImage",
                data: {
                    reminderId: reminderId,
                    reminderImage: file
                }
            }).then(function (result) {
                dfd.resolve(result);
            });

            return dfd.promise;
        }

        return service;
    };
} ());