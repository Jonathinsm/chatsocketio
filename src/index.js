const express = require('express');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const path = require('path');

const mongoose = require('mongoose');

app.set('trust proxy', true);

//db connection
mongoose.connect('mongodb+srv://jonathin:jonathin@cluster0.ujuax.mongodb.net/chat-db?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(db => console.log('db ok')).catch(err => console.log('db err'))

//Settings
app.set('port', process.env.PORT || 3000);

require('./sockets')(io);

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Starting the server
server.listen(app.get('port'), () =>{
  console.log('server on port',app.get('port'));
})
