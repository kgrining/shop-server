'use strict';

const Item = require('./items.model');
const Joi = require('joi');
const Boom = require('boom');

const index = {
  method: 'GET',
  path: '/api/items',
  handler: (request, reply) => {
    Item.find({}).then(reply);
  }
};

const show = {
  method: 'GET',
  path: '/api/items/{id}',
  handler: (request, reply) => {
    const {id} = request.params;
    Item.findById(id)
        .populate({
          path: 'opinions.user',
          model: 'User',
          select: 'username'
        })
        .then((result) => {
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
  path: '/api/items',
  handler: (request, reply) => {
    const item = request.payload;
    Item.create(item).then((result) => {
      reply(result).code(201);
    });
  }
};

const addOpinion = {
  method: 'POST',
  path: '/api/items/{id}/opinions',
  handler: (request, reply) => {
    const {id} = request.params;
    const opinion = {
      user: request.auth.credentials.user.id,
      date: new Date(),
      content: request.payload.content
    };
    Item.findById(id).then((item) => {
      item.opinions.push(opinion);
      item.save((err) => {
        if (err) {
          return reply(Boom.notFound('Bad request!'));
        }
        reply(opinion).code(201);
      });

    });
  }
};

const update = {
  method: 'PUT',
  path: '/api/items/{id}',
  handler: (request, reply) => {
    const {id} = request.params;
    const {payload} = request;
    Item.findById(id).then((result) => {
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
  path: '/api/items/{id}',
  handler: (request, reply) => {
    const {id} = request.params;
    Item.findById(id).then((result) => {
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
  addOpinion,
  update,
  destroy
];
