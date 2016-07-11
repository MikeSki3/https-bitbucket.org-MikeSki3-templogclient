'use strict';

// Declare app level module which depends on views, and components
angular.module('tempLog', []).

	config(['$httpProvider', function($httpProvider){
		$httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
	}]).
	

	controller('tempLogController', ["$http", function($http){
		this.thing = "Magical turds";
		$http({
			method: 'GET',
			url: 'http://127.0.0.1:8081/templog/json'
		}).then(function successCallback(response) {
			console.log('we did it!');
			console.log(response);
		}, function errorCallback(response) {
			console.log('we fucked up!');
		});
	}]);


