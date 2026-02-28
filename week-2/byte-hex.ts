let str = 'hello'

const byteArray = new TextEncoder().encode(str)

const hexString = Buffer.from(byteArray).toString('hex')

console.log('Hex String: ', hexString)