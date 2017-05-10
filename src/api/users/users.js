'use strict';


const Boom = require('boom');
const User = require('./users.model');
const createToken = require('./utils/token');
const hashPassword = require('./utils/verify').hashPassword;
const verifyUniqueUser = require('./utils/verify').verifyUniqueUser;
const verifyCredentials = require('./utils/verify').verifyCredentials;
const createUserSchema = require('./utils/schema');
const authenticateUserSchema = require('./utils/schema');
const jwt = require('jsonwebtoken');

const authenticate = {
  method: 'POST',
  path: '/api/users/authenticate',
  config: {
        // Check the user's password against the DB
    pre: [
            {method: verifyCredentials, assign: 'user'}
    ],
    handler: (request, reply) => {
      console.log(request.payload);
      reply({id_token: createToken(request.pre.user)}).code(201);
    },
        // Validate the payload against the Joi schema
    validate: {
      payload: authenticateUserSchema
    },
    auth: false
  }
};

const create = {
  method: 'POST',
  path: '/api/users',
  config: {
        // Before the route handler runs, verify that the user is unique
    pre: [
            {method: verifyUniqueUser}
    ],
    handler: (request, reply) => {
      const user = new User();
      user.email = request.payload.email;
      user.username = request.payload.username;
      user.admin = false;
      hashPassword(request.payload.password, (err, hash) => {
        if (err) {
          throw Boom.badRequest(err);
        }
        user.password = hash;
        user.save((err, user) => {
          if (err) {
            throw Boom.badRequest(err);
          }
                    // If the user is saved successfully, issue a JWT
          reply({id_token: createToken(user)}).code(201);
        });
      });
    },
        // Validate the payload against the Joi schema
    validate: {
      payload: createUserSchema
    },
    auth: false
  }
};

const getMyUser = {
  method: 'GET',
  path: '/api/users/me',
  config: {
    handler: (request, reply) => {
      const {user} = request.auth.credentials;
      reply(user);
    }
  }
};

const saveBasket = {
  method: 'PUT',
  path: '/api/users/saveBasket',
  config: {
    handler: (request, reply) => {
      const {user} = request.auth.credentials;
      user.savedBasket = request.payload;
      user.save((err) => {
        if (err) {
          throw Boom.badRequest(err);
        }
        reply(user.savedBasket).code(201);
      });

    }
  }
};

const getBasket = {
  method: 'GET',
  path: '/api/users/getBasket',
  config: {
    handler: (request, reply) => {
      const {user} = request.auth.credentials;
      User.findById(user.id)
                .populate({path: 'savedBasket.item', model: 'Item'})
                .exec((err, user) => {
                  if (err) {
                    throw Boom.badRequest(err);
                  }
                  reply(user.savedBasket).code(201);
                });
    }
  }
};

const getAll = {
  method: 'GET',
  path: '/api/users',
  config: {
    handler: (request, reply) => {
      User
                .find({})
                .select('-password -__v')
                .then((result) => {
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

module.exports = [
  create,
  authenticate,
  getMyUser,
  saveBasket,
  getBasket,
  getAll
];
