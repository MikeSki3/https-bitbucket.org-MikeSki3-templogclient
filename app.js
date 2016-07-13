'use strict';

// Declare app level module which depends on views, and components
angular.module('tempLog', ["highcharts-ng"]).

	config(['$httpProvider', function($httpProvider){
		$httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
	}]).
	

	controller('tempLogController', ["$http", "$scope", function($http, $scope){
		this.thing = "Magical turds";
		var context = this;
		$http({
			method: 'GET',
			url: 'http://127.0.0.1:8081/templog/json'
		}).then(function successCallback(response) {
			console.log('we did it!');
//			console.log(response);
			context.responseData = response.data;
			var chartData = [];
			for(var i = 0; i < response.data.length; i++){
				chartData.push([new Date(response.data[i].fields.entry_date).getTime(), Number(response.data[i].fields.temp.replace(/[^0-9\.]+/g,""))]);
			}
			 $scope.chartConfig = {
				        options: {
				            chart: {
				                type: 'line'
				            }
				        },
				        series: [],
				        title: {
				            text: 'Temps'
				        },

				        loading: false,
				        xAxis: {
				        	type: 'datetime',
				        	dateTimeLabelFormats: {
				        		day: '%b %e'
				        	},
				        	minTickInterval: 24 * 3600 * 1000
				        }
				    }
			 $scope.chartConfig.series.push({
				 id: 1,
				 data: chartData,
				 pointInterval: 24 * 3600 * 1000
			 })
		}, function errorCallback(response) {
			console.log('we fucked up!');
		});
		
	}]);


