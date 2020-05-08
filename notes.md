## This is the function for placing POST message functionality inside of socket event

socket.on('msg', (message, name, room) => {
  io.emit('msg', formatMessage(name, message, room))
  const Message = require('./models/Message')
  const moment = require('moment')
  let time = moment().format('h:mm a')
  let newMessage = {
    username: name,
    text: message,
    room: room,
    time: time
  }
  Message.create(newMessage)
  .then(data => {
    console.log('!!!!!!!!!!!!!!!!!',data);
  }).catch(err => {
    console.log(err);
  })
})
});