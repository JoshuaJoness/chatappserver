const app = require('express')()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const formatMessage = require('./utils/formatMessage')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config();

const getmessages = require('./utils/getmessages')


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
  err ? console.log(err) : console.log('Connected to MongoDB')
})

// Connect to SocketIO
io.on('connection', (socket) => {
  console.log('a user connected');
  // Handles connection event
  socket.broadcast.emit('message', formatMessage('zen-bot', `A user has joined the chat`))
  // Handles join even
  socket.on('join', (name,room) => { 
    const Message = require('./models/Message')
    Message.find({ room:room }).then(data => {
      io.emit('history', data)
      io.emit('msg', formatMessage('zen-bot', `${name} has entered the room`))
    })
  })
  // Handles disconnect event 
  socket.on('disconnect', () => {
    console.log('user disconnected');
    io.emit('msg', formatMessage('zen-bot',`A user has left the chat`))
  });
  // Listens for message event
  socket.on('msg', (message, name, room) => {
    io.emit('msg', formatMessage(name, message, room))
  })
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors({credentials: true}))

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the ZenChat server');
});

// app.get('/messages', require('./controllers/getMessages'))
app.post('/message', require('./controllers/postMessage'));

server.listen(process.env.PORT, () => {
  console.log(`Ready on ${process.env.PORT}`);
})




