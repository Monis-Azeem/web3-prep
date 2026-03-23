import {Connection, Keypair , LAMPORTS_PER_SOL, clusterApiUrl, PublicKey} from '@solana/web3.js'
import { createMint, getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token'

console.log('Cluster APi Url : ', clusterApiUrl('devnet'))
console.log('Lamports per sol: ', LAMPORTS_PER_SOL)

const connection = new Connection(clusterApiUrl('devnet'))

const TOKEN_22_METADATA_PROGRAM_ID = 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb'

const payer = Keypair.fromSecretKey(new Uint8Array(JSON.parse(process.env.PRIVATE_KEY_MONIS_LOCAL!)))

const mintAuthority = payer

async function airdrop (){
    try{
        const airdropSignature = await connection.requestAirdrop(new PublicKey('7TjDyVQY1FDiLigf8Cf8TMpKKUN1j8s6bV43AFfAPfwA'), LAMPORTS_PER_SOL)
    console.log('Aidrop Signature: ', airdropSignature)
    const confirmation = await connection.confirmTransaction(airdropSignature)
    console.log('Conformation: ', confirmation);
    }catch(error){
        console.log(error)
        // console.log(JSON.stringify(error, null, 2))
    }
}


async function mint(){
    try{
        const mint = await createMint(connection, payer, mintAuthority.publicKey, null, 6, undefined, {commitment: 'finalized'}, new PublicKey(TOKEN_22_METADATA_PROGRAM_ID))
        console.log('Mint created at: ', mint.toBase58())
        return mint;
    }catch(error){
        console.error('Error from mint:' , error)
    }
}

async function mintNewTokens(){
    try{
        // const mintAssociated = await mint()
        const mintAssociated = new PublicKey('96DJUbC8Sh9zLFdCwfsKGHgqzXSQMLXkk2BPqHEKUrJY')
        console.log('Mint associted:' , mintAssociated)

        const tokenAccount = await getOrCreateAssociatedTokenAccount(connection, payer, mintAssociated ?? new PublicKey('') , mintAuthority.publicKey, false, undefined, undefined, new PublicKey(TOKEN_22_METADATA_PROGRAM_ID))
        console.log('TOken Account: ', tokenAccount.address.toBase58())
        
        await mintTo(connection, payer, mintAssociated ?? new PublicKey(''), tokenAccount.address, payer, 1234 * LAMPORTS_PER_SOL, [], undefined, new PublicKey(TOKEN_22_METADATA_PROGRAM_ID))
        
        console.log('Minted 1234 tokens to ', tokenAccount.address.toBase58())
    }catch(error){
        console.error('Error from minting new tokens: ', error)
    }
}

// airdrop()
// mint()
mintNewTokens()
