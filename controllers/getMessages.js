const Message = require('../models/Message')

module.exports = (req,res) => {
  let room = req.headers.room
  Message.find({ room:room })
  .then(data => {
    res.send(data)
  }).catch(err => {
    console.log(err);
  })
}