const { BadRequestError, NotFoundError, InternalServerError, UnauthorizedError } = require('../error')
const common = require('./common')
const { ERROR: httpStatus } = require('../../helper/http-status/status_code')

const data = (data) => ({ err: null, data })

const error = (err) => ({ err, data: null })

const response = (res, type, result, message, code = 200) => {
  let status = true
  let data = result.data
  if (type === 'fail') {
    status = false
    data = data ? data : ''
    message = result.err.message || message
    if (common.isJSON(message)) {
      message = JSON.parse(message)
    }
    code = checkErrorCode(result.err)
  }
  res.send(
    code,
    {
      success: status,
      data,
      message,
      code,
    }
  )
}

const checkErrorCode = (error) => {
  switch (error.constructor) {
    case BadRequestError:
      return httpStatus.BAD_REQUEST
    case NotFoundError:
      return httpStatus.NOT_FOUND
    case InternalServerError:
      return httpStatus.INTERNAL_ERROR
    case UnauthorizedError:
      return httpStatus.UNAUTHORIZED
    default:
      return httpStatus.BAD_REQUEST
  }
}

module.exports = {
  data,
  error,
  response,
}