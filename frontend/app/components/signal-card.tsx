interface SignalCardProps {
  signal: {
    action?: 'BUY' | 'SELL' | 'HOLD';
    token?: string;
    confidence?: string;
    reason?: string;
    category?: string;
    sentiment?: number;
    signal_type?: string;
  };
}

const badgeBaseStyle = "px-3 py-1 text-xs font-bold rounded-full border-2 border-black";

export const SignalCard = ({ signal }: SignalCardProps) => {
  const isBuy = signal.action === 'BUY' || signal.signal_type === 'Buy';
  const isSell = signal.action === 'SELL' || signal.signal_type === 'Sell';
  const isHold = (signal.action?.toUpperCase() === 'HOLD') || signal.signal_type === 'Hold';

  const cardBgColor = isBuy
    ? 'bg-green-300'
    : isSell
    ? 'bg-red-300'
    : isHold
    ? 'bg-yellow-300'
    : 'bg-gray-200';

  // Show 'Buy', 'Sell', or 'Hold' as the signal type if applicable
  let signalType = 'Info';
  if (isBuy) signalType = 'Buy';
  else if (isSell) signalType = 'Sell';
  else if (isHold) signalType = 'Hold';
  else if (signal.signal_type) signalType = signal.signal_type;

  const category = signal.category || 'General';

  return (
    <div className={`w-full ${cardBgColor} p-4 sm:p-5 border-2 border-black rounded-lg text-black`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        {/* Left Side: Token + Category */}
        <div className="flex items-center gap-3">
          {signal.token && (
            <h3 className="text-xl sm:text-2xl font-extrabold">{signal.token}</h3>
          )}
          <span className={`${badgeBaseStyle} bg-black text-white`}>{category}</span>
        </div>

        {/* Right Side: Signal Type + Confidence */}
        <div className="flex items-center gap-3">
          <span className={`${badgeBaseStyle} bg-white/70`}>{signalType}</span>
          {signal.confidence && (
            <span className={`${badgeBaseStyle} bg-white/70`}>{signal.confidence}</span>
          )}
        </div>
      </div>
      
      {/* Bottom Row: Reason */}
      {(signal.reason || typeof signal.sentiment === 'number') && (
        <div className="mt-4 pt-3 border-t-2 border-black/20">
          <p className="text-sm sm:text-base font-medium text-black/80">
            {signal.reason || `Sentiment Score: ${signal.sentiment?.toFixed(2)}`}
          </p>
        </div>
      )}
    </div>
  );
};  
 
 
// Signal card for displaying signals
// Optimize signal-card rendering
// Add prop types to components
