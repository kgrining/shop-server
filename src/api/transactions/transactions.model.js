'use strict';

const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;


const TransactionSchema = new Schema({
  date: {type: Date, required: true},
  basket: {type: [{item: {type: Schema.Types.ObjectId, ref: 'Item'}, quantity: Number}], required: true},
  status: {type: String, required: true},
  price: {type: Number, required: true},
  owner: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = Mongoose.model('Transaction', TransactionSchema);
