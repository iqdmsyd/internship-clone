const commandModel = require('../repositories/commands/command_model')
const commandHandler = require('../repositories/commands/command_handler')
const wrapper = require('../../../helper/utils/wrapper')
const validator = require('../../../helper/utils/validator')
const { SUCCESS: httpStatus } = require('../../../helper/http-status/status_code')

const authUser = async function(req, res) {
  const message = 'Auth User'
  const payload = req.body
  const validatedPayload = validator.isPayloadValid(payload, commandModel.authUser)

  const postRequest = async (result) => {
    return result.err
      ? result
      : await commandHandler.authUser(result.data)
  }

  const sendResponse = async (result) => {
    result.err
      ? wrapper.response(res, 'fail', result, message)
      : wrapper.response(res, 'success', result, message)
  }

  sendResponse(await postRequest(validatedPayload))
}

const registerUser = async function(req, res) {
  const message = 'Register User'
  const payload = req.body
  const validatedPayload = validator.isPayloadValid(payload, commandModel.registerUser)

  const postRequest = async (result) => {
    return result.err
      ? result
      : await commandHandler.registerUser(result.data)
  }

  const sendResponse = async (result) => {
    result.err
      ? wrapper.response(res, 'fail', result, message)
      : wrapper.response(res, 'success', result, message, httpStatus.CREATED )
  }

  sendResponse(await postRequest(validatedPayload))
}

module.exports = {
  authUser,
  registerUser,
}