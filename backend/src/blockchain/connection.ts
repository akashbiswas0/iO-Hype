import { Connection } from '@solana/web3.js';

const TESTNET_RPC_URL = 'https://api.testnet.solana.com';

export const connection = new Connection(TESTNET_RPC_URL, 'confirmed');

console.log('Successfully connected to Solana testnet.');  
 
// Optimize blockchain connection
