'use strict';

const bcrypt = require('bcryptjs');
const Boom = require('boom');
const Joi = require('joi');
const User = require('../users.model');
const createToken = require('./token');

const hashPassword = function (password, cb) {
    // Generate a salt at level 10 strength
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      return cb(err, hash);
    });
  });
};

const verifyCredentials = function (req, res) {

  console.log(req.payload);

  const password = req.payload.password;

    // Find an entry from the database that
    // matches either the email or username
  User.findOne({
    $or: [
            {email: req.payload.email},
            {username: req.payload.username}
    ]
  }, (err, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, isValid) => {
        if (isValid) {
          res(user);
        }
        else {
          res(Boom.badRequest('Incorrect password!'));
        }
      });
    }
    else {
      res(Boom.badRequest('Incorrect username or email!'));
    }
  });
};

const verifyUniqueUser = function (req, res) {
    // Find an entry from the database that
    // matches either the email or username
  console.log('weryfikujeUnique');

  User.findOne({
    $or: [
            {email: req.payload.email},
            {username: req.payload.username}
    ]
  }, (err, user) => {
        // Check whether the username or email
        // is already taken and error out if so
    if (user) {
      if (user.username === req.payload.username) {
        res(Boom.badRequest('Username taken'));
      }
      else if (user.email === req.payload.email) {
        res(Boom.badRequest('Email taken'));
      }
    }
    else {
      res(req.payload);
    }
        // If everything checks out, send the payload through
        // to the route handler
  });
};


module.exports = {
  verifyCredentials,
  verifyUniqueUser,
  hashPassword
};
