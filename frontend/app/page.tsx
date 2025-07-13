import { ExecutionLog } from './components/execution-log';
import { SignalFeed } from './components/signal-feed';

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8 lg:p-12">
      <header className="w-full max-w-7xl mb-8 md:mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">IO Hype-Trader Dashboard</h1>
        <p className="text-lg text-gray-400 mt-2">Monitoring Solana Ecosystem</p>
      </header>
      
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">
        {/* Left Side (2/3) - Live Feed */}
        <div className="w-full lg:w-2/3 mt-8">
          <SignalFeed />
        </div>

        {/* Right Side (1/3) - Execution Log */}
        <div className="w-full lg:w-1/3">
          <ExecutionLog />
        </div>
      </div>
    </main>
  );
}
 
 
// Next.js app structure
