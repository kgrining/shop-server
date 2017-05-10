'use strict';

const hapiJwt = require('hapi-auth-jwt2');
const secret = require('./key');
const User = require('./api/users/users.model');

const register = function register(server, options, next) {
  server.register(hapiJwt);
  server.auth.strategy('jwt', 'jwt',
    {key: secret,
      validateFunc: (decoded, request, callback) => {
        User.findById(decoded.id, '-password -__v -transactions -savedBasket').then((user) => {
          if (user) {
            return callback(null, true, {user, 'scope': decoded.scope});
          }
          return callback(null, false);
        }).catch((err) => {
          throw err;
        });
      },
      verifyOptions: {algorithms: ['HS256']}
    });

  server.auth.default('jwt');
  next();
};

register.attributes = {
  name: 'auth-wrapper',
  version: '0.0.1'
};

module.exports = register;
