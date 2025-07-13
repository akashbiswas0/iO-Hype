"use client";
import { useState } from 'react';

export const ConfigPanel = () => {
  const [isAutoTrading, setIsAutoTrading] = useState(false);

  const handleSave = () => {
    console.log({ isAutoTrading });
    alert('Settings saved! (This is a placeholder)');
  };

  return (
    <div className="w-full p-4 bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Agent Configuration</h2>
      <div className="flex items-center justify-between">
        <label htmlFor="auto-trade" className="font-semibold">Enable Auto-Trading</label>
        <button
          onClick={() => setIsAutoTrading(!isAutoTrading)}
          className={`px-4 py-2 rounded-md font-bold ${isAutoTrading ? 'bg-green-600' : 'bg-red-600'}`}
        >
          {isAutoTrading ? 'ON' : 'OFF'}
        </button>
      </div>
      <button onClick={handleSave} className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Save Settings
      </button>
    </div>
  );
};  
 
 
// Config panel for user settings
// Refactor config-panel for better UX
// Improve accessibility in UI components
