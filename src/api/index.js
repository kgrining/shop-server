'use strict';

const Items = require('./items/items');
const Users = require('./users/users');
const Transactions = require('./transactions/transactions');

module.exports = [
  ...Items,
  ...Users,
  ...Transactions
];
