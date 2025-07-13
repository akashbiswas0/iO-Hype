"use client";
import { useState, useEffect } from 'react';
import { useWebSocket } from '../lib/hooks/useWebSocket';

type LogEntry = {
  timestamp: string;
  message: string;
};

function getLogColor(message: string) {
  if (/buy/i.test(message)) return 'text-green-600 font-bold';
  if (/sell/i.test(message)) return 'text-red-600 font-bold';
  if (/hold/i.test(message)) return 'text-yellow-500 font-bold';
  return '';
}

export const ExecutionLog = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const lastMessage = useWebSocket();

  useEffect(() => {
    setLogs([{ timestamp: new Date().toLocaleTimeString(), message: 'Agent Initialized.' }]);
  }, []);

  useEffect(() => {
    if (lastMessage) {
      const newLogEntry = (message: string) => ({
        timestamp: new Date().toLocaleTimeString(),
        message,
      });

      let logMessage = '';
      if (lastMessage.type === 'SUGGESTION_LOGGED') {
        logMessage = `Signal Suggestion: ${lastMessage.payload.action} ${lastMessage.payload.token} - ${lastMessage.payload.reason}`;
      } else if (lastMessage.type === 'EXECUTION_SUCCESS') {
        logMessage = `✅ Trade Executed: ${lastMessage.payload.action} ${lastMessage.payload.token}`;
      } else if (lastMessage.type === 'EXECUTION_FAILURE') {
        logMessage = `❌ Trade Failed: ${lastMessage.payload.action} ${lastMessage.payload.token}`;
      }

      if (logMessage) {
        setLogs((prevLogs) => [newLogEntry(logMessage), ...prevLogs]);
      }
    }
  }, [lastMessage]);

  return (
    <div className="w-full max-w-2xl mt-8">
      <h2 className="text-2xl font-bold mb-4">Execution Log</h2>
      <div className="bg-gray-800 p-4 rounded-lg max-h-60 overflow-y-auto">
        {logs.length > 0 ? (
          logs.map((log, index) => (
            <p key={index} className={`font-mono text-sm ${getLogColor(log.message)}`}>
              <span className="text-gray-500 mr-2">{log.timestamp}</span> 
              <span>{log.message}</span>
            </p>
          ))
        ) : (
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-5 bg-gray-600 rounded w-full animate-pulse"
                style={{ opacity: 0.7 }}
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};  
 
 
// Execution log component
// Fix bug in execution-log display
