'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Review = mongoose.model('Review'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, review;

/**
 * Review routes tests
 */
describe('Review CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Review
    user.save(function () {
      review = {
        name: 'Review name'
      };

      done();
    });
  });

  it('should be able to save a Review if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Review
        agent.post('/api/reviews')
          .send(review)
          .expect(200)
          .end(function (reviewSaveErr, reviewSaveRes) {
            // Handle Review save error
            if (reviewSaveErr) {
              return done(reviewSaveErr);
            }

            // Get a list of Reviews
            agent.get('/api/reviews')
              .end(function (reviewsGetErr, reviewsGetRes) {
                // Handle Review save error
                if (reviewsGetErr) {
                  return done(reviewsGetErr);
                }

                // Get Reviews list
                var reviews = reviewsGetRes.body;

                // Set assertions
                (reviews[0].user._id).should.equal(userId);
                (reviews[0].name).should.match('Review name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Review if not logged in', function (done) {
    agent.post('/api/reviews')
      .send(review)
      .expect(403)
      .end(function (reviewSaveErr, reviewSaveRes) {
        // Call the assertion callback
        done(reviewSaveErr);
      });
  });

  it('should not be able to save an Review if no name is provided', function (done) {
    // Invalidate name field
    review.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Review
        agent.post('/api/reviews')
          .send(review)
          .expect(400)
          .end(function (reviewSaveErr, reviewSaveRes) {
            // Set message assertion
            (reviewSaveRes.body.message).should.match('Please fill Review name');

            // Handle Review save error
            done(reviewSaveErr);
          });
      });
  });

  it('should be able to update an Review if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Review
        agent.post('/api/reviews')
          .send(review)
          .expect(200)
          .end(function (reviewSaveErr, reviewSaveRes) {
            // Handle Review save error
            if (reviewSaveErr) {
              return done(reviewSaveErr);
            }

            // Update Review name
            review.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Review
            agent.put('/api/reviews/' + reviewSaveRes.body._id)
              .send(review)
              .expect(200)
              .end(function (reviewUpdateErr, reviewUpdateRes) {
                // Handle Review update error
                if (reviewUpdateErr) {
                  return done(reviewUpdateErr);
                }

                // Set assertions
                (reviewUpdateRes.body._id).should.equal(reviewSaveRes.body._id);
                (reviewUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Reviews if not signed in', function (done) {
    // Create new Review model instance
    var reviewObj = new Review(review);

    // Save the review
    reviewObj.save(function () {
      // Request Reviews
      request(app).get('/api/reviews')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Review if not signed in', function (done) {
    // Create new Review model instance
    var reviewObj = new Review(review);

    // Save the Review
    reviewObj.save(function () {
      request(app).get('/api/reviews/' + reviewObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', review.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Review with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/reviews/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Review is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Review which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Review
    request(app).get('/api/reviews/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Review with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Review if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Review
        agent.post('/api/reviews')
          .send(review)
          .expect(200)
          .end(function (reviewSaveErr, reviewSaveRes) {
            // Handle Review save error
            if (reviewSaveErr) {
              return done(reviewSaveErr);
            }

            // Delete an existing Review
            agent.delete('/api/reviews/' + reviewSaveRes.body._id)
              .send(review)
              .expect(200)
              .end(function (reviewDeleteErr, reviewDeleteRes) {
                // Handle review error error
                if (reviewDeleteErr) {
                  return done(reviewDeleteErr);
                }

                // Set assertions
                (reviewDeleteRes.body._id).should.equal(reviewSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Review if not signed in', function (done) {
    // Set Review user
    review.user = user;

    // Create new Review model instance
    var reviewObj = new Review(review);

    // Save the Review
    reviewObj.save(function () {
      // Try deleting Review
      request(app).delete('/api/reviews/' + reviewObj._id)
        .expect(403)
        .end(function (reviewDeleteErr, reviewDeleteRes) {
          // Set message assertion
          (reviewDeleteRes.body.message).should.match('User is not authorized');

          // Handle Review error error
          done(reviewDeleteErr);
        });

    });
  });

  it('should be able to get a single Review that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Review
          agent.post('/api/reviews')
            .send(review)
            .expect(200)
            .end(function (reviewSaveErr, reviewSaveRes) {
              // Handle Review save error
              if (reviewSaveErr) {
                return done(reviewSaveErr);
              }

              // Set assertions on new Review
              (reviewSaveRes.body.name).should.equal(review.name);
              should.exist(reviewSaveRes.body.user);
              should.equal(reviewSaveRes.body.user._id, orphanId);

              // force the Review to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Review
                    agent.get('/api/reviews/' + reviewSaveRes.body._id)
                      .expect(200)
                      .end(function (reviewInfoErr, reviewInfoRes) {
                        // Handle Review error
                        if (reviewInfoErr) {
                          return done(reviewInfoErr);
                        }

                        // Set assertions
                        (reviewInfoRes.body._id).should.equal(reviewSaveRes.body._id);
                        (reviewInfoRes.body.name).should.equal(review.name);
                        should.equal(reviewInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Review.remove().exec(done);
    });
  });
});
