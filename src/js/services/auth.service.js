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