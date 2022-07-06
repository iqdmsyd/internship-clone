const joi = require('joi')
const validate = require('validate.js')
const wrapper = require('./wrapper')
const { BadRequestError } = require('../error')

const isPayloadValid = (payload, constraint) => {  
  try {
    const value = joi.attempt(payload ? payload : {}, constraint)
    return wrapper.data(value)
  } catch(error) {
    const { details } = error
    const errors = []
    for (let val of details) {
      errors.push({
        type: val.context.label,
        text: val.message,
      })
    }
    return wrapper.error(new BadRequestError(errors))
  }
}

module.exports = {
  isPayloadValid,
}