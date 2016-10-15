'use strict';

/**
 * Module dependencies
 */
var reviewsPolicy = require('../policies/reviews.server.policy'),
  reviews = require('../controllers/reviews.server.controller');

module.exports = function(app) {
  // Reviews Routes
  app.route('/api/reviews')
    .get(reviews.list)
    .post(reviews.create);

  app.route('/api/reviews/:reviewId')
    .get(reviews.read)
    .put(reviews.update)
    .delete(reviews.delete);

  // Finish by binding the Review middleware
  app.param('reviewId', reviews.reviewByID);
};
