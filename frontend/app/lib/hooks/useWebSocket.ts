"use client";
import { useState, useEffect } from 'react';

const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'ws://localhost:3001/ws';

// Types for WebSocket messages
export type WebSocketMessage =
  | { type: 'NEW_SIGNAL'; payload: Signal }
  | { type: 'SUGGESTION_LOGGED'; payload: Signal }
  | { type: 'EXECUTION_SUCCESS'; payload: Signal & { signature?: string } }
  | { type: 'EXECUTION_FAILURE'; payload: Signal };

// Signal type (copied from SignalCardProps and backend TradeSignal, but optional fields for flexibility)
export interface Signal {
  action?: 'BUY' | 'SELL' | 'HOLD';
  token?: string;
  confidence?: string;
  reason?: string;
  category?: string;
  sentiment?: number;
  signal_type?: string;
  tradeSize?: number;
  signature?: string;
}

export const useWebSocket = () => {
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);

  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_URL);

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('WebSocket message received:', data);
        setLastMessage(data);
      } catch (err) {
        console.error('WebSocket message parse error:', err, event.data);
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    return () => {
      ws.close();
    };
  }, []);

  return lastMessage;
};  
 
// useWebSocket hook for real-time data
// WebSocket state management hook
