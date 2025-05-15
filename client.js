// all the imports and libraries always at top level
const helpers = require('./helpers');
const messagingAPI = require('./messaging_api');
const readline = require('readline');

// object of displayedMessages
const displayedMessages = {};

const terminal = readline.createInterface({
  input: process.stdin,
});

terminal.on('line', text => {
  const username = process.env.NAME;
  const id = helpers.getRandomInt(100000);

  // set this object's value to boolean true
  // this is to immitate that the messages are being displayed on the chat room
  displayedMessages[id] = true;

  const message = { id, text, username };

  // at bottom of function, sendMessage()
  messagingAPI.sendMessage(message);
});

function displayMessage(message) {
  // logs to console to display the message
  console.log(`> ${message.username}: ${message.text}`);
  // sets value to boolean true
  displayedMessages[message.id] = true;
}

async function getAndDisplayMessages() {
  // gets all the messages inside the messagingAPI
  const messages = await messagingAPI.getMessages();

  for (const message of messages) {
    // gets the boolean value 
    const messageAlreadyDisplayed = message.id in displayedMessages;

    // if it's not displayed, display it
    // practice single-line if statements
    if (!messageAlreadyDisplayed) displayMessage(message);
  }
}