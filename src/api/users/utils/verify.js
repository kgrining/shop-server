'use strict';

const bcrypt = require('bcryptjs');
const Boom = require('boom');
const User = require('../users.model');

const hashPassword = function (password, cb) {
    // Generate a salt at level 10 strength
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      return cb(err, hash);
    });
  });
};

const verifyCredentials = function (req, res) {

  const password = req.payload.password;

    // Find an entry from the database that
    // matches either the email or username
  User.findOne({
    $or: [
            {email: req.payload.usernameOrEmail},
            {username: req.payload.usernameOrEmail}
    ]
  }, (err, user) => {
    if (err) {
      res(Boom.badRequest('Failed login attempt!'));
    }
    if (user) {
      bcrypt.compare(password, user.password, (err, isValid) => {
        if (err) {
          res(Boom.badRequest('Failed login attempt!'));
        }
        if (isValid) {
          res(user);
        }
        else {
          res(Boom.badRequest('Failed login attempt!'));
        }
      });
    }
    else {
      res(Boom.badRequest('Failed login attempt!'));
    }
  });
};

const verifyUniqueUser = function (req, res) {
    // Find an entry from the database that
    // matches either the email or username

  User.findOne({
    $or: [
            {email: req.payload.email},
            {username: req.payload.username}
    ]
  }, (err, user) => {
    if (err) {
      res(Boom.badRequest('Error'));
    }
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
  });
};


module.exports = {
  verifyCredentials,
  verifyUniqueUser,
  hashPassword
};
