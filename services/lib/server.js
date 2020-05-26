const Hapi = require('@hapi/hapi');
// Load Hapi-Firebase Auth Strategy
const HapiFirebaseAuth = require('hapi-firebase-auth');

// Initialize the default app
const admin = require('firebase-admin');

const userRoute = require('../routes/user');

let setup = false;

const server = Hapi.server({
  port: 3000,
  host: 'localhost',
});

exports.init = async () => {
  await server.initialize();
  return server;
};

exports.setup = async () => {
  if (!setup) { // Load plugin and set view only once

// Register the plugin
    await server.register({
      plugin: HapiFirebaseAuth
    });

// Initialize the Admin SDK with your credentials
    admin.initializeApp({
      credential: admin.credential.cert("./ServiceAccount.json")
    });

// Include auth strategy using existing Firebase Admin instance
    server.auth.strategy('firebase', 'firebase', {
      instance: admin
    })
    setup = true;
    server.route({
      method: 'GET',
      path: '/user/show',
      config: {
        auth: 'firebase'
      },
      handler: userRoute.handleShow,
    });
  }
};

exports.start = async () => {
  await this.setup();
  await server.start();
  return server;
};
