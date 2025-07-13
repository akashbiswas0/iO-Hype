import { Keypair } from '@solana/web3.js';
import * as dotenv from 'dotenv';
import bs58 from 'bs58';

dotenv.config();

export const loadTestnetWallet = (): Keypair => {
  const privateKey = process.env.TESTNET_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error('TESTNET_PRIVATE_KEY is not defined in the .env file');
  }
  try {
    return Keypair.fromSecretKey(bs58.decode(privateKey));
  } catch (error) {
    throw new Error('Failed to parse private key. Make sure it is a valid base58 encoded key.');
  }
};

export const wallet = loadTestnetWallet();
console.log(`Testnet wallet loaded successfully: ${wallet.publicKey.toBase58()}`);  
 
// Wallet connection logic
// Fix bug in wallet balance fetch
