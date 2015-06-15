// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js 
angular.module('pr', ['ionic', 'ngCordova'])

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
        })


    // Each tab has its own nav history stack:


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/reminders');

});
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
(function () {
    'use strict'
    angular.module('pr')
        .controller('reminderControllers', ReminderController);

    ReminderController.$inject = ['$scope'];
  
    function ReminderController($scope) {
        $scope.greeting = "Hello"; 
    }

}());  
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
}());
