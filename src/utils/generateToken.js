import crypto from 'crypto-browserify'
import { Buffer } from 'buffer/'

const generateToken = () => {
  const iv = crypto.randomBytes(16)
  const key = crypto.pbkdf2Sync('foobar', 'salt', 1000, 32, 'sha512')
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
  const text = crypto.randomBytes(200)
  const ourCipherText = Buffer.concat([cipher.update(text), cipher.final()])
  return ourCipherText.toString('hex')
}

export default generateToken
