'use strict';

const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;

const ItemSchema = new Mongoose.Schema({
  name: String,
  desc: String,
  imgPath: String,
  price: Number,
  opinions: {type: [Schema.Types.ObjectId], ref: 'Opinion'}
});

module.exports = Mongoose.model('Item', ItemSchema);
