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
};

// in JS, if we're doing a network request then we need to add async/await
async function getAndDisplayMessages() {
  // gets all the messages inside the messagingAPI
  const messages = await messagingAPI.getMessages();

  for (const message of messages) {
    // gets the boolean value
    // this is checking if the message.id is inside the displayedMessages Object
    // and the return value is true or false
    const messageAlreadyDisplayed = message.id in displayedMessages;

    // if it's not displayed, display it
    // practice single-line if statements
    if (!messageAlreadyDisplayed) displayMessage(message);
  };
}

function pollMessages() {
  // hey, every 3000 milliseconds, or 3 seconds, do this and get the messages
  setInterval(getAndDisplayMessages, 3000);
};

function streamMessages() {
  // this is the socket connection
  const messagingSocket = messagingAPI.createMessagingSocket();

  // this is the event listener for the socket connection
  // this creates a long-lived connection
  messagingSocket.on('message', message => {
    // this is the JSON.parse method, which converts the message into an object
    const parsedMessage = JSON.parse(message);

    const messageAlreadyDisplayed = parsedMessage.id in displayedMessages;

    // this is the displayMessage function
    if (!messageAlreadyDisplayed) displayMessage(parsedMessage);
  });
};

if (process.env.MODE === 'poll') {
  getAndDisplayMessages();
  pollMessages();
} else if (process.env.MODE === 'stream') {
  getAndDisplayMessages();
  streamMessages();
}