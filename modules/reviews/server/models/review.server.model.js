'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Review Schema
 */
var ReviewSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Review name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  domain: {
    type: String,
    trim: true
  },
  generalRating: {
    type: Number,
    default: 0
  },
  contentRating: {
    type: Number,
    default: 0
  },
  uxRating: {
    type: Number,
    default: 0
  },
  linkBaitFlag:{
    type: Boolean,
    default: false
  },
  virusFlag:{
    type: Boolean,
    default: false
  },
  moneyFlag:{
    type: Boolean,
    default: false
  }
});

mongoose.model('Review', ReviewSchema);
