import { WebSocket, WebSocketServer } from 'ws';

let wss: WebSocketServer;

export const initWebSocketServer = (server: any) => {
  wss = new WebSocketServer({ server });
  wss.on('connection', (ws) => {
    console.log('Client connected to WebSocket');
    ws.on('close', () => console.log('Client disconnected'));
  });
};

export const broadcast = (data: any) => {
  if (!wss) {
    console.error('WebSocket server not initialized.');
    return;
  }
  const jsonData = JSON.stringify(data);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(jsonData);
    }
  });
};  
 
// WebSocket service implementation
// Improved logging
// Cleanup unused imports in services
