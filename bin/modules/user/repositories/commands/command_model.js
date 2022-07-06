const joi = require('joi')
joi.objectId = require('joi-objectid')(joi) 

const authUser = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
})

const registerUser = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
  university_id: joi.objectId().required(),
  university_name: joi.string().required(),
  department_id: joi.objectId().required(),
  department_name: joi.string().required(),
  nim: joi.string().required(),
  phoneNumber: joi.string().required(),
})

module.exports = {
  authUser,
  registerUser,
}