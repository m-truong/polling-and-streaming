const axios = require('axios');
const WebSocket = require('ws');

function createMessagingSocket() {
    return new WebSocket('ws://localhost:3001/messages');
}