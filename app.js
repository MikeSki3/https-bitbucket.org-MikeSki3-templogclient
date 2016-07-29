'use strict';

// Declare app level module which depends on views, and components
angular.module('tempLog', ["highcharts-ng"]).

//	config(['$httpProvider', function($httpProvider){
//		$httpProvider.defaults.useXDomain = true;
//        delete $httpProvider.defaults.headers.common['X-Requested-With'];
//	}]).
	

	controller('tempLogController', ["$http", "$scope", function($http, $scope){
//		this.thing = "Magical turds";
		var context = this;
		var chartDataAll = new Array(),
			chartData30 = new Array(),
			chartData60 = new Array();
	    $("#menu-toggle").click(function(e) {
	        e.preventDefault();
	        $("#wrapper").toggleClass("toggled");
	        if($(".fa.fa-arrow-left").hasClass("fa-refresh")){
	        	$(".fa.fa-arrow-left").removeClass("fa-refresh")
	        } else {
	        	$(".fa.fa-arrow-left").addClass("fa-refresh")
	        }
	    });
		$http({
			method: 'GET',
			url: 'http://192.168.1.189:8000/templog/json'
		}).then(function successCallback(response) {
			console.log('we did it!');
//			console.log(response);
			context.responseData = response.data;
//			context.chartData = new Array();
			for(var i = 0; i < response.data.length; i++){
				var date = new Date(response.data[i].fields.entry_date);
				chartDataAll.push([date.getTime(), Number(response.data[i].fields.temp.replace(/[^0-9\.]+/g,""))]);
				if(date.getMinutes() == 30 || date.getMinutes() == 31 || date.getMinutes() == 0){
					chartData30.push([date.getTime(), Number(response.data[i].fields.temp.replace(/[^0-9\.]+/g,""))]);
				}
				if (date.getMinutes() == 0){
					chartData60.push([date.getTime(), Number(response.data[i].fields.temp.replace(/[^0-9\.]+/g,""))]);
				}
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
				        },
				        legend: {
				        	enabled: false
				        }
				    }
			 $scope.chartConfig.series.push({
				 id: 1,
				 data: chartDataAll,
				 pointInterval: 24 * 3600 * 1000,
				 showInLegend: false,
				 visible: true
			 })
			 $scope.chartConfig.series.push({
				 id: 2,
				 data: chartData30,
				 pointInterval: 24 * 3600 * 1000,
				 showInLegend: false
			 })
			 $scope.chartConfig.series.push({
				 id: 3,
				 data: chartData60,
				 pointInterval: 24 * 3600 * 1000,
				 showInLegend: false
			 })
		}, function errorCallback(response) {
			console.log('we fucked up!');
		});
		$("#15").click(function(){
			if($scope.chartConfig.getHighcharts().series[0].visible)
				$scope.chartConfig.getHighcharts().series[0].hide();
			else
				$scope.chartConfig.getHighcharts().series[0].show();
			
		});
		$("#30").click(function(){
			if($scope.chartConfig.getHighcharts().series[1].visible)
				$scope.chartConfig.getHighcharts().series[1].hide();
			else
				$scope.chartConfig.getHighcharts().series[1].show();
			
		});
		$("#60").click(function(){
			if($scope.chartConfig.getHighcharts().series[2].visible)
				$scope.chartConfig.getHighcharts().series[2].hide();
			else
				$scope.chartConfig.getHighcharts().series[2].show();
			
		});
	}]);


