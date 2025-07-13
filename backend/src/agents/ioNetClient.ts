import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.IO_NET_API_KEY;
if (!apiKey) {
  throw new Error('IO_NET_API_KEY is not defined in the .env file');
}

export const ioNetClient = axios.create({
  baseURL: process.env.IO_NET_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
  },
}); 
 yes