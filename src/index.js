const http = require('http');
const path = require('path');
const express = require('express');
const socketio = require('socket.io');

const mongoose = require('mongoose');

const app = express();
app.set('trust proxy', true);
const server = http.createServer(app);
const io = socketio.listen(server);

//db connection

mongoose.connect('mongodb+srv://jonathin:jonathin@cluster0.ujuax.mongodb.net/chat-db?retryWrites=true&w=majority')
  .then(db => console.log('db ok'))
  .catch(err => console.log('db err'))

//Settings
app.set('port', process.env.PORT || 3000);

require('./sockets')(io);

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Starting the server
server.listen(app.get('port'), () =>{
  console.log('server on port',app.get('port'));
})
