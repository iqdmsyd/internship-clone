const CommonError = require('./common_error')

class UnauthorizedError extends CommonError {
  constructor(message) {
    super(message || 'Unauthorized')
  }
}

module.exports = UnauthorizedError