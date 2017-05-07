'use strict';

module.exports = {
  application: {
    name: 'hapi-mongo-starter',
    port: 3000
  },
  environment: 'production',
  databases: {
    mongodb: {
      host: 'localhost',
      name: 'app-prod',
      port: 27017
    }
  },
  seed: false
};
