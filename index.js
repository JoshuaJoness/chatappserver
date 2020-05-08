const app = require('express')()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const formatMessage = require('./utils/formatMessage')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/zenchat', {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
  err ? console.log(err) : console.log('Connected to MongoDB')
})

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

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors({credentials: true}))

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the ZenChat server');
});

app.get('/messages', require('./controllers/getMessages'))
app.post('/message', require('./controllers/postMessage'));

server.listen(4002 || process.env.PORT, () => {
  console.log('Ready on PORT 4002');
})




