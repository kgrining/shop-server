'use strict';

const ItemSeed = require('./items');
const UserSeed = require('./users');
const TransactionSeed = require('./transactions');
const Config = require('../config/config');

module.exports = () => {
  if (!Config.seed) {
    return Promise.resolve();
  }
  const seeds = [
    ItemSeed(),
    UserSeed(),
    TransactionSeed()
  ];

  return Promise.all(seeds).then(() => {
    console.info('Finished populating data!');
  });
};
