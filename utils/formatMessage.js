const moment = require('moment')

const formatMessage = (username, text, room) => {
  return {
    username: username,
    text: text,
    room: room,
    time: moment().format('h:mm a')
  }
}

module.exports = formatMessage