"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startMainLoop = void 0;
const twitterService_1 = require("../services/twitterService");
const analyzeTweet_1 = require("../agents/analyzeTweet");
const reasoningAgent_1 = require("../agents/reasoningAgent");
const webSocketService_1 = require("../services/webSocketService");
const tradeExecutor_1 = require("../blockchain/tradeExecutor");
const KEYWORDS_TO_MONITOR = [
    '$SOL', 'Solana', '$WIF', '$JUP', '$BONK',
    'dump hard', 'rug', 'scam', 'pump', 'sell', 'buy', 'hold',
    'airdrop', 'whale', 'memecoin', 'news', 'fud',
    'technical analysis', 'community hype', 'influencer shill', 'other',
    'going to the moon', 'bullish', 'buying the dip', 'accumulating',
    'strong fundamentals', 'undervalued', 'breaking out', 'load up',
    'loading bags', 'entry point', 'chart looks good', 'high conviction',
    'next 100x', 'diamond hands', 'buy zone', 'volume spike',
    'dump incoming', 'exit liquidity', 'overvalued', 'taking profits',
    'distribution phase', 'bearish', 'exit now', 'RSI overbought',
    'sell before it crashes', 'bag holders', 'dead project',
    'reversal incoming', 'shorting this', 'getting out', 'scam warning',
    'consolidating', 'sideways movement', 'watching closely',
    'holding long-term', 'steady growth', 'no strong signal yet',
    'neutral zone', 'waiting for confirmation', 'long-term hold',
    'not selling yet', 'staking'
];
let isAutoTradingEnabled = false; // Default to off for safety
const startMainLoop = () => {
    console.log('Starting main trading loop...');
    const runCycle = () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`\n--- ${new Date().toLocaleTimeString()}: New Cycle ---`);
        // 1. Fetch
        const tweets = yield (0, twitterService_1.fetchRecentTweets)(KEYWORDS_TO_MONITOR);
        // --- START: Temporary Test Code ---
        const testTweets = [
            { id: '1795924736854130835', text: "Warning: $JUP is about to dump hard. Sell now!" },
            { id: '1795924736854130836', text: "$BONK is a rug. Get out while you can!" },
            { id: '1795924736854130837', text: "Time to sell $PEPE, it's overvalued." },
            { id: '1795924736854130838', text: "$DOGE holders are panicking. I'm selling all my $DOGE." },
        ];
        tweets.unshift(...testTweets); // Add the test tweets to the front of the list
        console.log(`--- Injected ${testTweets.length} test tweets for debugging sell signals ---`);
        // --- END: Temporary Test Code ---
        if (tweets.length === 0) {
            console.log('No new tweets found.');
            return;
        }
        // 2. Analyze
        const analysisPromises = tweets.map(tweet => (0, analyzeTweet_1.analyzeTweet)(tweet));
        const resolvedAnalyses = yield Promise.all(analysisPromises);
        const validAnalyses = resolvedAnalyses.filter(a => a !== null);
        if (validAnalyses.length === 0) {
            console.log('No valid analysis results from IO.NET.');
            return;
        }
        // 3. Decide
        const signal = (0, reasoningAgent_1.getTradingSignal)(validAnalyses);
        if (signal) {
            // 4. Suggest
            console.log('✅ Generated Signal:', signal);
            (0, webSocketService_1.broadcast)({ type: 'NEW_SIGNAL', payload: signal });
            // 5. Execute
            if (isAutoTradingEnabled) {
                console.log('Auto-trading is ON. Executing in 30 seconds...');
                setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                    try {
                        const signature = yield (0, tradeExecutor_1.executeTrade)(signal);
                        (0, webSocketService_1.broadcast)({ type: 'EXECUTION_SUCCESS', payload: Object.assign(Object.assign({}, signal), { signature }) });
                    }
                    catch (error) {
                        (0, webSocketService_1.broadcast)({ type: 'EXECUTION_FAILURE', payload: signal });
                    }
                }), 30000); // 30-second delay
            }
            else {
                console.log('Auto-trading is OFF. Signal logged as suggestion.');
                (0, webSocketService_1.broadcast)({ type: 'SUGGESTION_LOGGED', payload: signal });
            }
        }
        else {
            console.log('No trading signal generated in this cycle.');
        }
    });
    // Run the first cycle immediately, then set the interval
    runCycle();
    setInterval(runCycle, 30000); // Run every 60 seconds
};
exports.startMainLoop = startMainLoop;
// Core agent main loop
// Improve performance of mainLoop
