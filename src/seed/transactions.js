'use strict';

const Transaction = require('../api/transactions/transactions.model');

module.exports = () => {
  return Transaction.find({}).remove({}).then(() => {});
};
