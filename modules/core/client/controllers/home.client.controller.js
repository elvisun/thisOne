'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication','$http',
  function ($scope, Authentication, $http) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.val = "www.google.com"
    $scope.search = function () {
    	console.log('/api/reviews/search/' + $scope.val)
		$http({
		  method: 'GET',
		  url: '/api/reviews/search/' + $scope.val
		}).then(function successCallback(response) {
			//console.log(response.data)
		    $scope.result = response.data;
		  }, function errorCallback(response) {
		    console.log(errorCallback);
		  });
		// get the score
		$http({
		  method: 'GET',
		  url: '/api/reviews/score/' + $scope.val
		}).then(function successCallback(response) {
			//console.log(response.data)
		    $scope.upvotes = response.data.up;
		    $scope.downvotes = response.data.down;
		  }, function errorCallback(response) {
		    console.log(errorCallback);
		  });
    };
  }
]);
