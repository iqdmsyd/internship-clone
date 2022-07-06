const { MongoClient: Mongo } = require('mongodb')
const wrapper = require('../../utils/wrapper')
const validate = require('validate.js')

class DB {
  constructor(mongodbUri, dbName) {
    this.mongodbUri = mongodbUri
    this.dbName = dbName
  }

  setCollection(collectionName) {
    this.collectionName = collectionName
  }

  async findOne(parameter) {
    const client = new Mongo(this.mongodbUri)
    try {
      await client.connect()
      const db = client.db(this.dbName)
      const collection = db.collection(this.collectionName)
      const recordset = await collection.findOne(parameter)
      if (validate.isEmpty(recordset)) {
        return wrapper.error('Data not found')
      }
      return wrapper.data(recordset)
    } catch(err) {
      return wrapper.error(err)
    } finally {
      await client.close()
    }
  }

  async insertOne(document) {
    const client = new Mongo(this.mongodbUri)
    try {
      await client.connect()
      const db = client.db(this.dbName)
      const collection = db.collection(this.collectionName)
      const recordset = await collection.insertOne(document)
      return wrapper.data(recordset)
    } catch(err) {
      return wrapper.error(err)
    } finally {
      await client.close()
    }
  }
}

module.exports = DB