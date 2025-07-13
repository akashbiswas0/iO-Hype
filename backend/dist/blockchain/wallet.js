"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallet = exports.loadTestnetWallet = void 0;
const web3_js_1 = require("@solana/web3.js");
const dotenv = __importStar(require("dotenv"));
const bs58_1 = __importDefault(require("bs58"));
dotenv.config();
const loadTestnetWallet = () => {
    const privateKey = process.env.TESTNET_PRIVATE_KEY;
    if (!privateKey) {
        throw new Error('TESTNET_PRIVATE_KEY is not defined in the .env file');
    }
    try {
        return web3_js_1.Keypair.fromSecretKey(bs58_1.default.decode(privateKey));
    }
    catch (error) {
        throw new Error('Failed to parse private key. Make sure it is a valid base58 encoded key.');
    }
};
exports.loadTestnetWallet = loadTestnetWallet;
exports.wallet = (0, exports.loadTestnetWallet)();
console.log(`Testnet wallet loaded successfully: ${exports.wallet.publicKey.toBase58()}`);
// Wallet connection logic
// Fix bug in wallet balance fetch
