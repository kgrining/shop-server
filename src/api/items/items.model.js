'use strict';

const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;

const ItemSchema = new Mongoose.Schema({
  name: String,
  desc: String,
  imgPath: String,
  price: Number,
  opinions: {
    type: [{
      user: {type: Schema.Types.ObjectId, ref: 'User'},
      date: Date,
      content: String
    }]
  }
});

module.exports = Mongoose.model('Item', ItemSchema);
