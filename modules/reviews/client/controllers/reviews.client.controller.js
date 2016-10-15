(function () {
  'use strict';

  // Reviews controller
  angular
    .module('reviews')
    .controller('ReviewsController', ReviewsController);

  ReviewsController.$inject = ['$scope', '$state', 'Authentication', 'reviewResolve'];

  function ReviewsController ($scope, $state, Authentication, review) {
    var vm = this;

    vm.authentication = Authentication;
    vm.review = review;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Review
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.review.$remove($state.go('reviews.list'));
      }
    }

    // Save Review
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.reviewForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.review._id) {
        vm.review.$update(successCallback, errorCallback);
      } else {
        vm.review.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('reviews.view', {
          reviewId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
