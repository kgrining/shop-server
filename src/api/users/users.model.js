'use strict';

const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;

const UserSchema = new Schema({
  email: {type: String, required: true, index: {unique: true}},
  username: {type: String, required: true, index: {unique: true}},
  password: {type: String, required: true},
  admin: {type: Boolean, required: true},
  transactions: {type: [Schema.Types.ObjectId], ref: 'Transaction'},
  opinions: {type: [Schema.Types.ObjectId], ref: 'Opinion'},
  savedBasket: {type: [{item: {type: Schema.Types.ObjectId, ref: 'Item'}, quantity: Number}]}
});

module.exports = Mongoose.model('User', UserSchema);
