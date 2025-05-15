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

// app
app.use(express.json());

// invoke .listen() on express server app
// this opens the port on 3001
// takes callback
app.listen(3001, () => { 
  console.log('Listeing on port 3001!');
});

app.get('/messages', (req, res) => {
  res.json(messages);
})

app.post('/messages', (req, res) => {
  // grabs the message from request body
  const message = req.body;
  // then pushes the message object into messages object-array
  messages.push(message);
  
  for (const socket of sockets) {
    socket.send(JSON.stringify(message));
  }
});

app.ws('/messages', socket => {
  sockets.push(socket);

  socket.on('close', () => {
    sockets.splice(sockets.indexOf(socket), 1);
  });
});