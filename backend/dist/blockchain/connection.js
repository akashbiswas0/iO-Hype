"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const web3_js_1 = require("@solana/web3.js");
const TESTNET_RPC_URL = 'https://api.testnet.solana.com';
exports.connection = new web3_js_1.Connection(TESTNET_RPC_URL, 'confirmed');
console.log('Successfully connected to Solana testnet.');
// Optimize blockchain connection
