"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTradingSignal = void 0;
const getTradingSignal = (analysisData) => {
    const tokenData = {};
    // Aggregate data by token
    for (const data of analysisData) {
        if (data.token) {
            const tokenSymbol = data.token.toUpperCase();
            if (!tokenData[tokenSymbol]) {
                tokenData[tokenSymbol] = { scores: [], count: 0, categories: [] };
            }
            tokenData[tokenSymbol].scores.push(data.sentiment);
            tokenData[tokenSymbol].count++;
            tokenData[tokenSymbol].categories.push(data.category);
        }
    }
    // Enhanced trading strategy
    for (const token in tokenData) {
        const { scores, count } = tokenData[token];
        const averageSentiment = scores.reduce((a, b) => a + b, 0) / scores.length;
        const positiveCount = scores.filter(s => s > 0.3).length;
        const negativeCount = scores.filter(s => s < -0.3).length;
        const percentPositive = positiveCount / scores.length;
        const percentNegative = negativeCount / scores.length;
        // BUY: strong positive sentiment
        if (averageSentiment > 0.7 && count >= 3 && percentPositive > 0.6) {
            return {
                action: 'BUY',
                token: token,
                confidence: 'High',
                reason: `High average sentiment (${averageSentiment.toFixed(2)}) and ${Math.round(percentPositive * 100)}% positive tweets across ${count} recent tweets.`,
                tradeSize: 5,
            };
        }
        // SELL: strong negative sentiment
        if (averageSentiment < -0.5 && count >= 3 && percentNegative > 0.5) {
            return {
                action: 'SELL',
                token: token,
                confidence: 'High',
                reason: `High negative sentiment (${averageSentiment.toFixed(2)}) and ${Math.round(percentNegative * 100)}% negative tweets across ${count} recent tweets.`,
                tradeSize: 5,
            };
        }
        // HOLD: neutral or mixed sentiment
        if (count >= 3 && percentPositive > 0.3 && percentNegative > 0.3) {
            return {
                action: 'HOLD',
                token: token,
                confidence: 'Medium',
                reason: `Mixed sentiment: ${Math.round(percentPositive * 100)}% positive, ${Math.round(percentNegative * 100)}% negative across ${count} tweets.`,
                tradeSize: 0,
            };
        }
    }
    return null;
};
exports.getTradingSignal = getTradingSignal;
// Advanced reasoning agent
// Add support for multiple agents
