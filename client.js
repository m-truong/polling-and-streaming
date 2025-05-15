// all the imports and libraries always at top level
const helpers = require('./helpers');
const messagingAPI = require('./messaging_api');
const readline = require('readline');

// object of displayedMessages
const displayedMessages = {};

const terminal = readline.createInterface({
  input: process.stdin,
})