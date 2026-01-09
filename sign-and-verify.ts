import {ethers} from 'ethers'

async function main(){
    //this generates a random wallet(pvt key) - random 256-bit number
    const wallet = ethers.Wallet.createRandom()
    console.log('Private Key: ', wallet.privateKey)
    console.log('Public Key:', wallet.publicKey)
    console.log('Address: ', wallet.address)

    //signing key is just private key internally used to sign the transactions and we are creating new instance to access the values.
    const signingKey = new ethers.SigningKey(wallet.privateKey)
    console.log('Compressed Public Key: ', signingKey.compressedPublicKey)
    console.log('Uncompressed Public Key:', signingKey.publicKey)

    const message = 'Hello, Send 1 ETH to 0x0'
    //hashedMessage -> Prefix + message length + message
    const hashedMessage = ethers.hashMessage(message)
    console.log('Hashed Message:', hashedMessage)

    //Sign the message
    const signature = await wallet.signMessage(message)
    console.log('Signature: ',signature)

    //Signature breakdown into (r,s,v)
    const sign = ethers.Signature.from(signature)
    console.log('r: ',sign.r)
    console.log('s:',sign.s)
    console.log('v:', sign.v)

    //Verifier : Check validity of signature
    const recoverAddress = ethers.verifyMessage(message, signature)
    console.log('Recovered Address:', recoverAddress)
    console.log('Signature: ', recoverAddress === wallet.address)

}

main()