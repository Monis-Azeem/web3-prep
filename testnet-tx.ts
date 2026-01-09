import { ethers } from "ethers";

const PRIVATE_KEY = ''

const RPC_URL = 'https://0xrpc.io/sep'

async function testnet_tx(){
    const provider = new ethers.JsonRpcProvider(RPC_URL)
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider)
    const feeData = await provider.getFeeData()

    console.log('Wallet address: ', wallet.address)
    const balance = await provider.getBalance(wallet.address)

    console.log('Balance in wei: ', balance, 'wei') //in bigint
    console.log('Balance in ETH:', ethers.formatEther(balance), 'ETH') //formatEther converts wei to ETH

    //Create a transaction
    const tx = {
        to: '0x9b6B4C9cc4fF73e85D7a8e49F917BA376849c903',
        value: ethers.parseEther('0.0001'), //parseEther Converts ETH to wei
        gasLimit: 21000,
        chainId: 11155111,
        maxFeePerGas: ethers.parseUnits('20', 'gwei'),
        maxPriorityFeePerGas: ethers.parseUnits('2', 'gwei'),
        nonce: await provider.getTransactionCount(wallet.address)
    }

    const signedTx = await wallet.signTransaction(tx)
    console.log('Raw Signed transaction: ', signedTx)

    console.log('---BROADCASTING TO NETWORK', '-'.repeat(50))

    const response = await provider.broadcastTransaction(signedTx)
    console.log('Transaction hash: ', response.hash)

    const receipt = await response.wait()
    console.log('Receipt: ', receipt?.blockNumber)
}

testnet_tx()