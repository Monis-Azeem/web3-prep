//1. using noble ed25519

import * as ed from '@noble/ed25519'
import { Keypair } from '@solana/web3.js'
import nacl from 'tweetnacl'

async function main(){
    const pvtKey = ed.utils.randomSecretKey() //32 bytes
    console.log('Pvt key: ', pvtKey)

    const publicKey = await ed.getPublicKeyAsync(pvtKey) //32 bytes
    console.log('Public Key: ', publicKey)

    const message = new TextEncoder().encode('hi, i want to send 1 SOL to monis')
    const signature = await ed.signAsync(message, pvtKey)
    console.log('Signature: ',signature)

    const isValid = await ed.verifyAsync(signature, message, publicKey)

    console.log('IsValid: ', isValid)
}

// main()

// 2. Using solana/web3.js
const pair = Keypair.generate()
const publicKey = pair.publicKey
const secretKey = pair.secretKey

console.log('Pair: ', pair)

const message = new TextEncoder().encode('Send 1 sol to Monis')

console.log('Message: ', message)

const signature = nacl.sign.detached(message, secretKey)

console.log('Signature: ', signature)

const verify = nacl.sign.detached.verify(message, signature, publicKey.toBytes())

console.log('Verify: ', verify)