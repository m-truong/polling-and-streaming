// initialize important 'streaming' variables
// this is for the client-2-server live connection!
const axios = require('axios');
const WebSocket = require('ws');

// this function returns new socket opened at 3001
function createMessagingSocket() {
    return new WebSocket('ws://localhost:3001/messages');
}

// this GET API endpoint used by axios for /messages
// GETs ALL messages plural
function getMessages() {
    return axios.get('http://localhost:3001/messages').then(res => res.data);
}

// POSTs single message
function sendMessage(message) {
    // message gets passed as argument into the .post() endpoint
    return axios.post('http://localhost:3001/messages', message);
}

module.exports.createMessagingSocket = createMessagingSocket;
module.exports.getMessages = getMessages;
module.exports.sendMessage = sendMessage;