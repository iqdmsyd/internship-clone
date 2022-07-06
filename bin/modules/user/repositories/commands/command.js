class Command {
  constructor(db) {
    this.db = db
  }

  async insertOne(document) {
    this.db.setCollection('users')
    const result = await this.db.insertOne(document)
    return result
  }
}

module.exports = Command