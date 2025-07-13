"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.broadcast = exports.initWebSocketServer = void 0;
const ws_1 = require("ws");
let wss;
const initWebSocketServer = (server) => {
    wss = new ws_1.WebSocketServer({ server });
    wss.on('connection', (ws) => {
        console.log('Client connected to WebSocket');
        ws.on('close', () => console.log('Client disconnected'));
    });
};
exports.initWebSocketServer = initWebSocketServer;
const broadcast = (data) => {
    if (!wss) {
        console.error('WebSocket server not initialized.');
        return;
    }
    const jsonData = JSON.stringify(data);
    wss.clients.forEach((client) => {
        if (client.readyState === ws_1.WebSocket.OPEN) {
            client.send(jsonData);
        }
    });
};
exports.broadcast = broadcast;
// WebSocket service implementation
// Improved logging
// Cleanup unused imports in services
