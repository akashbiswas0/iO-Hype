"use client";
import { useState, useEffect, useRef } from 'react';
import { useWebSocket, Signal } from '../lib/hooks/useWebSocket';
import { SignalCard } from './signal-card';

export const SignalFeed = () => {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [timer, setTimer] = useState(30);
  const [shine, setShine] = useState(false);
  const lastMessage = useWebSocket();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (lastMessage && lastMessage.type === 'NEW_SIGNAL') {
      setSignals((prevSignals) => [lastMessage.payload, ...prevSignals].slice(0, 10));
      setTimer(30); // Reset timer on new signal
      if (intervalRef.current) clearInterval(intervalRef.current); // Restart timer interval
      intervalRef.current = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 30));
      }, 1000);
      if (lastMessage.payload.action === 'BUY' || lastMessage.payload.signal_type === 'Buy') {
        setShine(true);
        setTimeout(() => setShine(false), 1200); // Shine lasts 1.2s
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 30));
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className={`w-full max-w-2xl relative overflow-hidden ${shine ? 'shine-green' : ''}`}>
      <div className="flex items-center mb-4 gap-3">
        <h2 className="text-2xl font-bold">Live Signal Feed</h2>
        <span
          className={
            'ml-2 px-2 py-1 rounded-full font-mono text-base font-semibold bg-blue-600 text-white animate-pulse border-2 border-blue-400 shadow ' +
            (timer <= 5 ? 'bg-red-600 border-red-400' : '')
          }
          title="Time until next signal"
        >
          {timer}s
        </span>
      </div>
      <div className="space-y-4">
        {signals.length > 0 ? (
          signals.map((signal, index) => <SignalCard key={index} signal={signal} />)
        ) : (
          <p className="text-gray-500">Waiting for new signals...</p>
        )}
      </div>
    </div>
  );
};  
 
 
// Signal feed component
// Show latest signals in feed
// Add loading states to components
// Add test cases for signal-feed
// add signal-feed component 29712
// implement config-panel for user settings 14784
// fix bug in useWebSocket hook 25621
// improve execution-log UI 18234
// add favicon to app 2487
// refactor signal-card for better performance 26467
// update globals.css for new theme 7736
// add prop types to config-panel 23115
// update layout.tsx for responsive design 4625
// add loading state to signal-feed 9662
// improve signal-card display logic 11366
// update config-panel to support new options 5917
// fix bug in execution-log formatting 9803
// add tests for useWebSocket hook 1786
// refactor signal-feed for scalability 15801
// update signal-card styles 14965
// add error boundary to config-panel 31822
// improve accessibility in layout.tsx 32344
// update favicon 11720
// add hover effect to signal-feed 22517
// refactor execution-log for performance 16960
// update signal-feed to show timestamps 26555
// add dark mode to globals.css 6182
// improve config-panel validation 22939
// update README.md for frontend setup 27136
// add window.svg to public assets 32541
