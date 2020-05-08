const app = require('express')()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const formatMessage = require('./utils/formatMessage')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

require("dotenv").config();

const PORT = process.env.PORT

// Connect to SocketIO
io.on('connection', (socket) => {
  console.log('a user connected');
  // Handles connection event
  socket.broadcast.emit('message', formatMessage('zen-bot', `A user has joined the chat`))
  // Handles join even
  socket.on('join', (name) => {
    io.emit('msg', formatMessage('zen-bot', `${name} has entered the room`))
  })
  // Handles disconnect event 
  socket.on('disconnect', () => {
    console.log('user disconnected');
    io.emit('message', formatMessage('zen-bot',`A user has left the chat`))
  });
  // Listens for message event
  socket.on('msg', (message, name, room) => {
    io.emit('msg', formatMessage(name, message, room))
  })
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({credentials: true}))

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the ZenChat server');
});
app.get('/messages', require('./controllers/getMessages'))
app.post('/message', require('./controllers/postMessage'));

// Server
server.listen(PORT, () => {
  console.log(`Ready on PORT ${PORT}`);
})

// Database 
let mongoUri = ''

if (PORT == 4002) {
  mongoUri = 'mongodb://localhost:27017/zenchat'
} else {
    mongoUri = `mongodb+srv://joshuajoness:${process.env.PASSWORD}@cluster0-4cwwp.mongodb.net/test?retryWrites=true&w=majority`
  }

mongoose.connect('mongodb://localhost:27017/zenchat', {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
  err ? console.log(err) : console.log('Connected to MongoDB')
})



