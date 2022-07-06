const crypto = require('crypto');

const randomBytes = (num) => crypto.randomBytes(num)

const encrypt = async (text, algorithm, secretKey, iv) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = cipher.update(text, 'utf-8', 'hex') + cipher.final('hex')
  return encrypted
}

const decrypt = async (text, algorithm, secretKey, iv) => {
  const dechiper = crypto.createDecipheriv(algorithm, secretKey, iv)
  const decrypted = dechiper.update(text, 'hex', 'utf-8') + dechiper.final('utf-8')
  return decrypted
}

const isJSON = (str) => {
  if (!str) return false;
  str = str.replace(new RegExp('\\\\(?:["\\\\\\/bfnrt]|u[0-9a-fA-F]{4})', 'g'), '@');
  const regex = new RegExp('"[^"\\\\\\n\\r]*"|true|false|null|-?\\d+'+
    '(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?', 'g');
  str = str.replace(regex, ']');
  str = str.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
  return (/^[\],:{}\s]*$/).test(str);
}

module.exports = {
  isJSON,
  randomBytes,
  encrypt,
  decrypt,
}