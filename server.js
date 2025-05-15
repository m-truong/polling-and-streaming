const express = require('express');
const expressWS = require('express-ws');

const app = express();
expressWS(app);

const messages = [
  {
    id: 0,
    text: 'Welcome!',
    username: 'Chat Room!'
  }
];

const sockets = [];