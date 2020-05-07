const Message = require('../models/Message')
const moment = require('moment')

module.exports = (req,res) => {
  let time = moment().format('h:mm a')
    console.log(req.body);
  let message = {
    username: req.body.name,
    text: req.body.message,
    room: req.body.room,
    time: time
  }
  Message.create(message)
  .then(data => {
    console.log(data);
  }).catch(err => {
    console.log(err);
  })
}