'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication','$http',
  function ($scope, Authentication, $http) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    
    $scope.search = function () {
    	console.log('/api/reviews/search/' + $scope.val)
		$http({
		  method: 'GET',
		  url: '/api/reviews/search/' + $scope.val
		}).then(function successCallback(response) {
			console.log(response.data)
		    $scope.result = response.data;
		  }, function errorCallback(response) {
		    console.log(errorCallback);
		  });
    };
  }
]);
