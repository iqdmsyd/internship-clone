require('dotenv').config()
const confidence = require('confidence')

const config = {
  mongodb: {
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DB,
  }
}

const store = new confidence.Store(config)

exports.get = key => store.get(key)