import express from 'express';
import http from 'http';
import * as dotenv from 'dotenv';
import apiRoutes from './api/routes';
import { initWebSocketServer } from './services/webSocketService';
import { startMainLoop } from './core/mainLoop';

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/api', apiRoutes);

// Initialize WebSocket Server
initWebSocketServer(server);

server.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
  // Start the main application logic
  startMainLoop();
});  
 
// Express server setup
