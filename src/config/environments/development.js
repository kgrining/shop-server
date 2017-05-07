'use strict';

module.exports = {
  application: {
    name: 'hapi-mongo-starter',
    port: 3000
  },
  environment: 'development',
  databases: {
    mongodb: {
      host: 'localhost',
      name: 'app-dev',
      port: 27017
    }
  },
  seed: true
};
