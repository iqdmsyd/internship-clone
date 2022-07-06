const User = require('./domain')
const Mongo = require('../../../../helper/databases/mongodb/db')
const config = require('../../../../infra/configs/global_config')
const db = new Mongo(config.get('/mongodb/uri'), config.get('/mongodb/dbName'))

const authUser = async function(payload) {
  const user = new User(db)
  const postCommand = async payload => user.authUser(payload)
  return postCommand(payload)
}

const registerUser = async function(payload) {
  const user = new User(db)
  const postCommand = async payload => user.registerUser(payload)
  return postCommand(payload)
}

module.exports = {
  authUser,
  registerUser,
}