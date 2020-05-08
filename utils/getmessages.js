const Message = require('../models/Message')

const getmessages = (room) => {
  Message.find({ room:room })
  .then(data => {
    console.log('******',data);
    
  }).catch(err => {
    console.log(err);
  })
}

module.exports = getmessages

