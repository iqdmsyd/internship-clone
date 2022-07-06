const validate = require('validate.js')
class CommonError extends Error {
  constructor(message) {
    let messageData = (Array.isArray(message) || message.toString() === '[object Object]')
      ? JSON.stringify(message)
      : message
    super(messageData)
  }
}

module.exports = CommonError