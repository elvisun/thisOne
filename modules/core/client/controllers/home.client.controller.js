'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$http',
  function($scope, Authentication, $http) {
    $scope.authentication = Authentication;
    $scope.search = function() {
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
    var init = function() {
      $scope.val = 'www.google.com';
      $scope.search();
    };
    init();
  }
]);