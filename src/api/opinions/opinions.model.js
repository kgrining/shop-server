'use strict';

const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;

const OpinionSchema = new Schema({
  date: {type: Date, required: true},
  owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  item: {type: Schema.Types.ObjectId, ref: 'Item', required: true},
  description: {type: String, required: true}
});

module.exports = Mongoose.model('Opinion', OpinionSchema);
