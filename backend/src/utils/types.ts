import { Keypair } from '@solana/web3.js';

export interface Tweet {
  id: string;
  text: string;
}

export interface AnalysisOutput {
  tweetId: string;
  token: string | null;
  sentiment: number; // e.g., -1 to 1
  category: string; // e.g., 'Genuine Project Update'
}

export interface TradeSignal {
  action: 'BUY' | 'SELL' | 'HOLD';
  token: string;
  confidence: 'High' | 'Medium' | 'Low';
  reason: string;
  tradeSize: number; // e.g., in percentage of portfolio
}

export interface AgentSettings {
  isAutoTradingEnabled: boolean;
  tradeSizePercentage: number;
  sentimentThreshold: number;
} 
 
// Update types
