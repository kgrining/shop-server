'use strict';

const ItemSeed = require('./items');
const Config = require('../config/config');

module.exports = () => {
  if (!Config.seed) {
    return Promise.resolve();
  }
  const seeds = [
    ItemSeed()
  ];

  return Promise.all(seeds).then(() => {
    console.info('Finished populating data!');
  });
};
