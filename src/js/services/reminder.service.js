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