(function () {
  'use strict';

  angular
    .module('reviews')
    .controller('ReviewsListController', ReviewsListController);

  ReviewsListController.$inject = ['ReviewsService'];

  function ReviewsListController(ReviewsService) {
    var vm = this;

    vm.reviews = ReviewsService.query();
  }
})();
