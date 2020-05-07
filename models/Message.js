const mongoose = require('mongoose')

const Message = mongoose.model('message', {
  username: String,
  text: String,
  room: String,
  time: String
})

module.exports = Message