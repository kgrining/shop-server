'use strict';

const Items = require('./items/items');
const Users = require('./users/users');
const Transactions = require('./transactions/transactions');
const Opinions = require('./opinions/opinions');

module.exports = [
  ...Items,
  ...Users,
  ...Transactions,
  ...Opinions
];
