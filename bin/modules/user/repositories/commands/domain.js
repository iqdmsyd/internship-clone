const Command = require('./command')
const Query = require('../queries/query')
const wrapper = require('../../../../helper/utils/wrapper')
const { InternalServerError, UnauthorizedError } = require('../../../../helper/error')
const { ObjectId } = require('mongodb')
const commonUtil = require('../../../../helper/utils/common')
const algorithm = 'aes-256-ctr'
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3'

class User {
  constructor(db) {
    this.command = new Command(db)
    this.query = new Query(db)
  }

  async authUser(payload) {
    const { email, password } = payload

    const userEmail = await this.query.findOneUser({ email })
    if (userEmail.err) {
      const message = {
        type: 'email',
        text: 'email not reigstered',
      }
      console.log(message)
      return wrapper.error(new UnauthorizedError(message))
    }

    if (password !== userEmail.data.password) {
      const message = {
        type: 'password',
        text: 'password not match',
      }
      console.log(message)
      return wrapper.error(new UnauthorizedError(message))
    }

    const iv = commonUtil.randomBytes(16)
    const encryptedPassword = await commonUtil.encrypt(password, algorithm, secretKey, iv)
    const decryptedPassword = await commonUtil.decrypt(encryptedPassword, algorithm, secretKey, iv)
    console.log('password: ', password)
    console.log('encrypted: ', encryptedPassword)
    console.log('decrypted: ', decryptedPassword)


    return wrapper.data(payload)
  }

  async registerUser(payload) {
    let {
      name,
      email,
      password,
      university_name,
      university_id,
      department_name,
      department_id,
      nim,
      phoneNumber,
    } = payload

    // payload adjustments
    university_id = ObjectId(university_id)
    department_id = ObjectId(department_id)

    const document = {
      name,
      email,
      password,
      phoneNumber,
      university: {
        nim,
        university: {
          _id: university_id,
          name: university_name,
        },
        department: {
          _id: department_id,
          name: department_name
        }
      }
    }

    const result = await this.command.insertOne(document) 
    return result.err
      ? wrapper.error(new InternalServerError(result.err))
      : wrapper.data(document)
  }
}

module.exports = User