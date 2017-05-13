'use strict';

const Transaction = require('./transactions.model');
const User = require('../users/users.model');
const Item = require('../items/items.model');
const Joi = require('joi');
const Boom = require('boom');
const jwt = require('jsonwebtoken');

const index = {
  method: 'GET',
  path: '/api/transactions',
  config: {
    handler: (request, reply) => {
      Transaction.find({}).populate({
        path: 'owner',
        model: 'User',
        select: 'username email'
      }).then((result) => {
        reply(result);
      });
    },
    auth: {
      strategy: 'jwt',
      access: [{
        scope: 'admin'
      }]
    }
  }
};

const myHistory = {
  method: 'GET',
  path: '/api/getHistory',
  handler: (request, reply) => {
    const {_id} = request.auth.credentials.user;
    Transaction
          .find({'owner': {_id}})
          .populate({
            path: 'basket.item',
            model: 'Item'
          })
          .exec((err, transactions) => {
            if (err) {
              return reply(Boom.notFound('Object doesn\'t exist'));
            }
            reply(transactions);
          });
  }
};

const show = {
  method: 'GET',
  path: '/api/transactions/{id}',
  handler: (request, reply) => {
    const {id} = request.params;
    Transaction.findById(id).then((result) => {
      if (!result) {
        return reply(Boom.notFound('Object doesn\'t exist'));
      }
      reply(result);
    });
  },
  config: {
    validate: {
      params: {
        id: Joi.string().required().hex().length(24)
      }
    }
  }
};

const create = {
  method: 'POST',
  path: '/api/transactions',
  handler: (request, reply) => {
    const payload = request.payload;
    const transaction = new Transaction();
    transaction.date = payload.date;
    transaction.status = payload.status;
    transaction.price = payload.price;
    payload.basket.map((current) => {
      return {item: current.item._id, quantity: current.quantity};
    });
    transaction.basket = payload.basket;
    transaction.owner = request.auth.credentials.user;
    const transactionCreatePromise = Transaction.create(transaction);
    const userFindPromise = User.findById(transaction.owner);

    Promise.all([transactionCreatePromise, userFindPromise]).then(([result, found]) => {
      found.transactions.push(result._id);
      return found.save();
    }).then(() => {
      reply(result).code(201);
    });
  }
};

const update = {
  method: 'PUT',
  path: '/api/transactions/{id}',
  handler: (request, reply) => {
    const {id} = request.params;
    const {payload} = request;
    Transaction.findById(id).then((result) => {
      if (!result) {
        return reply(Boom.notFound('Object doesn\'t exist'));
      }
      const newObject = Object.assign(result, payload);

      newObject.save().then((updatedObject) => {
        reply(updatedObject);
      });
    });
  },
  config: {
    validate: {
      params: {
        id: Joi.string().required().hex().length(24)
      }
    }
  }
};

const destroy = {
  method: 'DELETE',
  path: '/api/transactions/{id}',
  handler: (request, reply) => {
    const {id} = request.params;
    Transaction.findById(id).then((result) => {
      if (!result) {
        return reply(Boom.notFound('Object doesn\'t exist'));
      }

      result.remove().then(() => {
        reply().code(204);
      });
    });
  },
  config: {
    validate: {
      params: {
        id: Joi.string().required().hex().length(24)
      }
    }
  }
};

module.exports = [
  index,
  show,
  myHistory,
  create,
  update,
  destroy
];
