//Reviews service used to communicate Reviews REST endpoints
(function () {
  'use strict';

  angular
    .module('reviews')
    .factory('ReviewsService', ReviewsService);

  ReviewsService.$inject = ['$resource'];

  function ReviewsService($resource) {
    return $resource('api/reviews/:reviewId', {
      reviewId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
