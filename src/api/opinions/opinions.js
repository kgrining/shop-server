'use strict';

const User = require('../users/users.model');
const Item = require('../items/items.model');
const Opinion = require('./opinions.model');
const Joi = require('joi');
const Boom = require('boom');

const notFound = {
  statusCode: 404,
  error: 'Not Found'
};

const index = {
  method: 'GET',
  path: '/api/opinions',
  handler: (request, reply) => {
    Opinion.find({}).then((result) => {
      reply(result);
    });
  }
};

const show = {
  method: 'GET',
  path: '/api/opinions/{id}',
  handler: (request, reply) => {
    const {id} = request.params;
    Opinion.findById(id).then((result) => {
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
  path: '/api/opinions',
  handler: (request, reply) => {
    const payload = request.payload;
    const opinion = new Opinion();
    opinion.date = new Date();
    opinion.item = payload.item;
    opinion.description = payload.desc;
    opinion.owner = request.auth.credentials.id;
    Opinion.create(opinion).then((newOpinion) => {
      User.findById(newOpinion.owner).then((user) => {
        user.opinions.push(newOpinion._id);
        user.save((err) => {
          console.log(err);
        });
        Item.findById(newOpinion.item).then((item) => {
          item.opinions.push(newOpinion._id);
          item.save((err) => {
            console.log(err);
          });
          reply(newOpinion).code(201);
        });
      });
    });
  }
};

const update = {
  method: 'PUT',
  path: '/api/opinions/{id}',
  handler: (request, reply) => {
    const {id} = request.params;
    const {payload} = request;
    Opinion.findById(id).then((result) => {
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
  path: '/api/opinions/{id}',
  handler: (request, reply) => {
    const {id} = request.params;
    Opinion.findById(id).then((result) => {
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
  create,
  update,
  destroy
];
