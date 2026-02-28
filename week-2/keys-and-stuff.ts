// Bytes to ascii
import {ethers} from 'ethers'
import bs58 from 'bs58'

const bytes = new Uint8Array([0,1,2,3])

console.log('Bytes: ', bytes)

let ascii = new TextDecoder().decode(new Uint8Array([72,101,108,108, 111]))

console.log('Ascii: ', ascii)

// Ascii to bytes

const asciiStr = 'hello'

let bytesNew = new TextEncoder().encode(asciiStr)

console.log('Bytes New->', bytesNew)

let str = 'hello'

let bytes11 = new TextEncoder().encode(str)

let base58Encoded = bs58.encode(bytes11)

console.log("Base 58 encoded: ", bs58.encode(bytes11))

console.log('Base 58 decoded: ', bs58.decode(base58Encoded))

