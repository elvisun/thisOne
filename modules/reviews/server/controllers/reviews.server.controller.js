'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Review = mongoose.model('Review'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Review
 */
exports.create = function(req, res) {
  console.log(req.body);
  var review = new Review(req.body);
  review.user = req.user;
  review.domain = urlParser(review.domain);
  console.log(review);
  review.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(review);
    }
  });
};

/**
 * Show the current Review
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var review = req.review ? req.review.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  review.isCurrentUserOwner = req.user && review.user && review.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(review);
};

/**
 * Update a Review
 */
exports.update = function(req, res) {
  var review = req.review ;

  review = _.extend(review , req.body);

  review.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(review);
    }
  });
};

/**
 * Delete an Review
 */
exports.delete = function(req, res) {
  var review = req.review ;

  review.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(review);
    }
  });
};

/**
 * List of Reviews
 */
exports.list = function(req, res) { 
  Review.find().sort('-created').populate('user', 'displayName').exec(function(err, reviews) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(reviews);
    }
  });
};

/**
 * Review middleware
 */
exports.reviewByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Review is invalid'
    });
  }

  Review.findById(id).populate('user', 'displayName').exec(function (err, review) {
    if (err) {
      return next(err);
    } else if (!review) {
      return res.status(404).send({
        message: 'No Review with that identifier has been found'
      });
    }
    req.review = review;
    next();
  });
};

// search given domain name

exports.search = function(req, res) { 
  var url = req.params.domain;
  url = urlParser(url);
  console.log(url);
  Review.find({domain: url}).sort('-created').populate('user', 'displayName').exec(function(err, reviews) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(reviews);
    }
  });
};

exports.getScore = function(req, res) { 
  var url = req.params.domain;
  url = urlParser(url);
  //console.log(url);
  Review.find({domain: url}).sort('-created').populate('user', 'displayName').exec(function(err, reviews) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      var up = 0;   //general
      var down = 0;
      var contentUp = 0;
      var contentDown = 0;
      var uxUp = 0;
      var uxDown = 0;
      var linkBaitFlag = 0;
      var virusFlag = 0;
      var moneyFlag = 0;
      for (var i = 0; i<reviews.length; i++) {
        console.log(reviews[i]);
        if (reviews[i].generalRating === 1) {
          up = up + 1;
        }
        if (reviews[i].generalRating === 2){
          down = down + 1;
        }
        if (reviews[i].contentRating === 1){
          contentUp = contentUp + 1;
        }
        if (reviews[i].contentRating === 2){
          contentDown = contentDown + 1;
        }
        if (reviews[i].uxRating === 1){
          uxUp = uxUp + 1;
        }
        if (reviews[i].uxRating === 2){
          uxDown = uxDown + 1;
        }
        if (reviews[i].linkBaitFlag === true){
          linkBaitFlag = linkBaitFlag + 1;
        }
        if (reviews[i].virusFlag === true){
          virusFlag = virusFlag + 1;
        }
        if (reviews[i].moneyFlag === true){
          moneyFlag = moneyFlag + 1;
        }
      }
      var r = {
        up: up,
        down: down,
        contentUp: contentUp,
        contentDown: contentDown,
        uxUp: uxUp,
        uxDown: uxDown,
        linkBaitFlag:linkBaitFlag/reviews.length,
        virusFlag:virusFlag/reviews.length,
        moneyFlag:moneyFlag /reviews.length
      };
      console.log(r);
      res.jsonp(r);
    }
  });
};


var urlParser = function(url) {
  var a = url.split(".");
  if (a[0] === "www" || a[0] === "en") {
    var n = a.splice(1,a.length -1);
    url = n.join(".");
  }
  return url;
};
